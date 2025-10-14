import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import PhoneInput from "@/components/PhoneInput";
import PackageCard from "@/components/PackageCard";
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
import type { Package } from "@shared/schema";

// todo: remove mock functionality - replace with real data from API
const MOCK_PACKAGES: Record<string, Package[]> = {
  mtn: [
    { id: "pkg-1", serviceId: "mtn", name: "500MB Daily", dataAmount: "500MB", price: 3.00, validity: "Valid for 24 hours" },
    { id: "pkg-2", serviceId: "mtn", name: "1GB Daily", dataAmount: "1GB", price: 5.00, validity: "Valid for 24 hours" },
    { id: "pkg-3", serviceId: "mtn", name: "2GB Weekly", dataAmount: "2GB", price: 12.00, validity: "Valid for 7 days" },
    { id: "pkg-4", serviceId: "mtn", name: "5GB Weekly", dataAmount: "5GB", price: 20.00, validity: "Valid for 7 days" },
    { id: "pkg-5", serviceId: "mtn", name: "10GB Monthly", dataAmount: "10GB", price: 45.00, validity: "Valid for 30 days" },
    { id: "pkg-6", serviceId: "mtn", name: "20GB Monthly", dataAmount: "20GB", price: 80.00, validity: "Valid for 30 days" },
    { id: "pkg-7", serviceId: "mtn", name: "50GB Monthly", dataAmount: "50GB", price: 180.00, validity: "Valid for 30 days" },
  ],
  airteltigo: [
    { id: "pkg-8", serviceId: "airteltigo", name: "500MB Daily", dataAmount: "500MB", price: 2.50, validity: "Valid for 24 hours" },
    { id: "pkg-9", serviceId: "airteltigo", name: "1GB Daily", dataAmount: "1GB", price: 4.50, validity: "Valid for 24 hours" },
    { id: "pkg-10", serviceId: "airteltigo", name: "3GB Weekly", dataAmount: "3GB", price: 15.00, validity: "Valid for 7 days" },
    { id: "pkg-11", serviceId: "airteltigo", name: "6GB Weekly", dataAmount: "6GB", price: 25.00, validity: "Valid for 7 days" },
    { id: "pkg-12", serviceId: "airteltigo", name: "12GB Monthly", dataAmount: "12GB", price: 50.00, validity: "Valid for 30 days" },
    { id: "pkg-13", serviceId: "airteltigo", name: "25GB Monthly", dataAmount: "25GB", price: 95.00, validity: "Valid for 30 days" },
  ],
  telecel: [
    { id: "pkg-14", serviceId: "telecel", name: "500MB Daily", dataAmount: "500MB", price: 2.80, validity: "Valid for 24 hours" },
    { id: "pkg-15", serviceId: "telecel", name: "1GB Daily", dataAmount: "1GB", price: 5.00, validity: "Valid for 24 hours" },
    { id: "pkg-16", serviceId: "telecel", name: "2.5GB Weekly", dataAmount: "2.5GB", price: 13.00, validity: "Valid for 7 days" },
    { id: "pkg-17", serviceId: "telecel", name: "5GB Weekly", dataAmount: "5GB", price: 22.00, validity: "Valid for 7 days" },
    { id: "pkg-18", serviceId: "telecel", name: "8GB Monthly", dataAmount: "8GB", price: 35.00, validity: "Valid for 30 days" },
    { id: "pkg-19", serviceId: "telecel", name: "15GB Monthly", dataAmount: "15GB", price: 65.00, validity: "Valid for 30 days" },
    { id: "pkg-20", serviceId: "telecel", name: "30GB Monthly", dataAmount: "30GB", price: 120.00, validity: "Valid for 30 days" },
  ],
  wassce: [
    { id: "pkg-21", serviceId: "wassce", name: "Single Result Check", dataAmount: "1 Check", price: 8.00, validity: "Instant access" },
    { id: "pkg-22", serviceId: "wassce", name: "3 Results Check", dataAmount: "3 Checks", price: 20.00, validity: "Valid for 7 days" },
  ],
  bece: [
    { id: "pkg-23", serviceId: "bece", name: "Single Result Check", dataAmount: "1 Check", price: 6.00, validity: "Instant access" },
    { id: "pkg-24", serviceId: "bece", name: "3 Results Check", dataAmount: "3 Checks", price: 15.00, validity: "Valid for 7 days" },
  ],
};

const SERVICE_NAMES: Record<string, string> = {
  mtn: "MTN",
  airteltigo: "AirtelTigo",
  telecel: "Telecel",
  wassce: "WASSCE Checker",
  bece: "BECE Checker"
};

export default function Recipient() {
  const [location, navigate] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const serviceId = params.get('service') || '';
  
  const [recipientNumber, setRecipientNumber] = useState("");
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [error, setError] = useState("");

  const serviceName = SERVICE_NAMES[serviceId] || serviceId;
  const packages = MOCK_PACKAGES[serviceId] || [];

  const steps = [
    { id: 1, label: 'Select Service' },
    { id: 2, label: 'Recipient' },
    { id: 3, label: 'Payment' }
  ];

  const handleContinue = () => {
    if (!recipientNumber || recipientNumber.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    if (!selectedPackage) {
      setError("Please select a package");
      return;
    }
    
    console.log('Proceeding to payment:', { recipientNumber, selectedPackage });
    navigate(`/payment?service=${serviceId}&package=${selectedPackage.id}&recipient=${recipientNumber}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <ProgressIndicator currentStep={2} steps={steps} />
        
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            data-testid="button-back"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Complete Your Order</h1>
          <p className="text-muted-foreground">
            Selected: <span className="text-foreground font-medium">{serviceName}</span>
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Recipient Phone Number</CardTitle>
            <CardDescription>
              Enter the number that will receive the Data Bundle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PhoneInput
              label="Phone Number"
              value={recipientNumber}
              onChange={(value) => {
                setRecipientNumber(value);
                setError("");
              }}
              error={error && !recipientNumber ? error : ""}
              testId="input-recipient"
            />
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Select Package</CardTitle>
            <CardDescription>
              Choose your preferred Data Bundle package
            </CardDescription>
          </CardHeader>
          <CardContent>
            {packages.length > 0 ? (
              <div className="space-y-3">
                {packages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    {...pkg}
                    selected={selectedPackage?.id === pkg.id}
                    onClick={() => {
                      setSelectedPackage(pkg);
                      setError("");
                      console.log('Package selected:', pkg);
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No packages available for this service
              </p>
            )}
          </CardContent>
        </Card>

        {error && !recipientNumber && !selectedPackage && (
          <p className="text-destructive text-sm mb-4" data-testid="text-error">
            {error}
          </p>
        )}

        <Button
          className="w-full h-12"
          size="lg"
          onClick={handleContinue}
          data-testid="button-proceed"
        >
          Proceed to Payment
        </Button>
      </main>
    </div>
  );
}
