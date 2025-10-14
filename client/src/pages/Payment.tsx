import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Lock } from "lucide-react";
import Header from "@/components/Header";
import PhoneInput from "@/components/PhoneInput";
import OrderSummary from "@/components/OrderSummary";
import ProgressIndicator from "@/components/ProgressIndicator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Package } from "@shared/schema";

// todo: remove mock functionality - replace with real data from API
const MOCK_PACKAGES: Record<string, Package> = {
  "pkg-1": { id: "pkg-1", serviceId: "mtn", name: "500MB Daily", dataAmount: "500MB", price: 3.00, validity: "Valid for 24 hours" },
  "pkg-2": { id: "pkg-2", serviceId: "mtn", name: "1GB Daily", dataAmount: "1GB", price: 5.00, validity: "Valid for 24 hours" },
  "pkg-3": { id: "pkg-3", serviceId: "mtn", name: "2GB Weekly", dataAmount: "2GB", price: 12.00, validity: "Valid for 7 days" },
  "pkg-4": { id: "pkg-4", serviceId: "mtn", name: "5GB Weekly", dataAmount: "5GB", price: 20.00, validity: "Valid for 7 days" },
  "pkg-5": { id: "pkg-5", serviceId: "mtn", name: "10GB Monthly", dataAmount: "10GB", price: 45.00, validity: "Valid for 30 days" },
  "pkg-6": { id: "pkg-6", serviceId: "mtn", name: "20GB Monthly", dataAmount: "20GB", price: 80.00, validity: "Valid for 30 days" },
  "pkg-7": { id: "pkg-7", serviceId: "mtn", name: "50GB Monthly", dataAmount: "50GB", price: 180.00, validity: "Valid for 30 days" },
  "pkg-8": { id: "pkg-8", serviceId: "airteltigo", name: "500MB Daily", dataAmount: "500MB", price: 2.50, validity: "Valid for 24 hours" },
  "pkg-9": { id: "pkg-9", serviceId: "airteltigo", name: "1GB Daily", dataAmount: "1GB", price: 4.50, validity: "Valid for 24 hours" },
  "pkg-10": { id: "pkg-10", serviceId: "airteltigo", name: "3GB Weekly", dataAmount: "3GB", price: 15.00, validity: "Valid for 7 days" },
  "pkg-11": { id: "pkg-11", serviceId: "airteltigo", name: "6GB Weekly", dataAmount: "6GB", price: 25.00, validity: "Valid for 7 days" },
  "pkg-12": { id: "pkg-12", serviceId: "airteltigo", name: "12GB Monthly", dataAmount: "12GB", price: 50.00, validity: "Valid for 30 days" },
  "pkg-13": { id: "pkg-13", serviceId: "airteltigo", name: "25GB Monthly", dataAmount: "25GB", price: 95.00, validity: "Valid for 30 days" },
  "pkg-14": { id: "pkg-14", serviceId: "telecel", name: "500MB Daily", dataAmount: "500MB", price: 2.80, validity: "Valid for 24 hours" },
  "pkg-15": { id: "pkg-15", serviceId: "telecel", name: "1GB Daily", dataAmount: "1GB", price: 5.00, validity: "Valid for 24 hours" },
  "pkg-16": { id: "pkg-16", serviceId: "telecel", name: "2.5GB Weekly", dataAmount: "2.5GB", price: 13.00, validity: "Valid for 7 days" },
  "pkg-17": { id: "pkg-17", serviceId: "telecel", name: "5GB Weekly", dataAmount: "5GB", price: 22.00, validity: "Valid for 7 days" },
  "pkg-18": { id: "pkg-18", serviceId: "telecel", name: "8GB Monthly", dataAmount: "8GB", price: 35.00, validity: "Valid for 30 days" },
  "pkg-19": { id: "pkg-19", serviceId: "telecel", name: "15GB Monthly", dataAmount: "15GB", price: 65.00, validity: "Valid for 30 days" },
  "pkg-20": { id: "pkg-20", serviceId: "telecel", name: "30GB Monthly", dataAmount: "30GB", price: 120.00, validity: "Valid for 30 days" },
  "pkg-21": { id: "pkg-21", serviceId: "wassce", name: "Single Result Check", dataAmount: "1 Check", price: 8.00, validity: "Instant access" },
  "pkg-22": { id: "pkg-22", serviceId: "wassce", name: "3 Results Check", dataAmount: "3 Checks", price: 20.00, validity: "Valid for 7 days" },
  "pkg-23": { id: "pkg-23", serviceId: "bece", name: "Single Result Check", dataAmount: "1 Check", price: 6.00, validity: "Instant access" },
  "pkg-24": { id: "pkg-24", serviceId: "bece", name: "3 Results Check", dataAmount: "3 Checks", price: 15.00, validity: "Valid for 7 days" },
};

const SERVICE_NAMES: Record<string, string> = {
  mtn: "MTN",
  airteltigo: "AirtelTigo",
  telecel: "Telecel",
};

// Load Paystack inline script
declare global {
  interface Window {
    PaystackPop: {
      setup: (config: {
        key: string;
        email: string;
        amount: number;
        ref: string;
        onClose: () => void;
        callback: (response: { reference: string }) => void;
      }) => {
        openIframe: () => void;
      };
    };
  }
}

export default function Payment() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const params = new URLSearchParams(window.location.search);
  
  const serviceId = params.get('service') || '';
  const packageId = params.get('package') || '';
  const recipientNumber = params.get('recipient') || '';
  
  const [paymentNetwork, setPaymentNetwork] = useState("");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);

  const serviceName = SERVICE_NAMES[serviceId] || serviceId;
  const selectedPackage = MOCK_PACKAGES[packageId];

  const steps = [
    { id: 1, label: 'Select Service' },
    { id: 2, label: 'Recipient' },
    { id: 3, label: 'Payment' }
  ];

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setPaystackLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!paymentNetwork) {
      toast({
        title: "Error",
        description: "Please select a payment network",
        variant: "destructive"
      });
      return;
    }
    if (!paymentNumber || paymentNumber.length < 10) {
      toast({
        title: "Error",
        description: "Please enter a valid payment number",
        variant: "destructive"
      });
      return;
    }

    if (!paystackLoaded) {
      toast({
        title: "Error",
        description: "Payment system is loading, please try again",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Initialize payment on backend
      const res = await apiRequest('POST', '/api/payment/initialize', {
        serviceId,
        packageId,
        recipientNumber,
        paymentNumber,
        paymentNetwork
      });

      const response = await res.json();

      // Open Paystack popup
      const handler = window.PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: `customer${response.orderId}@triversa.com`,
        amount: Math.round((selectedPackage?.price || 0) * 100), // Convert to pesewas
        currency: 'GHS',
        ref: response.reference,
        onClose: () => {
          setIsProcessing(false);
          toast({
            title: "Payment Cancelled",
            description: "You closed the payment window",
            variant: "destructive"
          });
        },
        callback: (paystackResponse) => {
          // Verify payment - handle async operation separately
          apiRequest('GET', `/api/payment/verify/${paystackResponse.reference}`)
            .then(verifyRes => verifyRes.json())
            .then(verifyResponse => {
              if (verifyResponse.status === 'success') {
                navigate(`/success?reference=${paystackResponse.reference}`);
              } else {
                toast({
                  title: "Payment Failed",
                  description: "Your payment was not successful",
                  variant: "destructive"
                });
              }
            })
            .catch(error => {
              toast({
                title: "Verification Error",
                description: "Could not verify payment, please contact support",
                variant: "destructive"
              });
            })
            .finally(() => {
              setIsProcessing(false);
            });
        }
      });

      handler.openIframe();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Could not initialize payment, please try again",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <ProgressIndicator currentStep={3} steps={steps} />
        
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(`/recipient?service=${serviceId}`)}
            data-testid="button-back"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Complete Your Payment</h1>
          <p className="text-muted-foreground">
            Pay for the Data Bundle
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select The Network</CardTitle>
                <CardDescription>
                  Choose the mobile money network for payment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="network-select">Payment Network</Label>
                  <Select 
                    value={paymentNetwork} 
                    onValueChange={setPaymentNetwork}
                  >
                    <SelectTrigger 
                      id="network-select" 
                      className="h-12"
                      data-testid="select-network"
                    >
                      <SelectValue placeholder="Select Network" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mtn" data-testid="option-mtn">MTN</SelectItem>
                      <SelectItem value="telecel" data-testid="option-telecel">TELECEL</SelectItem>
                      <SelectItem value="airteltigo" data-testid="option-airteltigo">AIRTELTIGO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enter the number for paying</CardTitle>
                <CardDescription>
                  Mobile money number to be charged
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PhoneInput
                  label="Payment Number"
                  value={paymentNumber}
                  onChange={setPaymentNumber}
                  testId="input-payment"
                />
                
                <div className="mt-6 p-4 bg-muted/50 rounded-md">
                  <p className="text-sm font-medium mb-2">You will get:</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-chart-3"></div>
                    <p className="text-sm">{serviceName} - {selectedPackage?.dataAmount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Secure checkout powered by Paystack</span>
            </div>

            <Button
              className="w-full h-14 text-lg"
              size="lg"
              onClick={handlePayment}
              disabled={isProcessing || !paystackLoaded}
              data-testid="button-buy"
            >
              {isProcessing ? "Processing..." : !paystackLoaded ? "Loading..." : "Buy Data Bundle"}
            </Button>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <OrderSummary
                serviceName={serviceName}
                recipientNumber={recipientNumber}
                packageName={selectedPackage?.name}
                dataAmount={selectedPackage?.dataAmount}
                validity={selectedPackage?.validity}
                price={selectedPackage?.price}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
