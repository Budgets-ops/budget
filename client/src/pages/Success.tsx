import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";

export default function Success() {
  const [, navigate] = useLocation();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get('reference');

    if (!reference) {
      setError("No payment reference found");
      setVerifying(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await apiRequest('GET', `/api/payment/verify/${reference}`);
        const data = await res.json();

        if (data.status === 'success') {
          setSuccess(true);
          setOrderDetails(data.metadata);
        } else {
          setError("Payment verification failed");
        }
      } catch (err) {
        setError("Could not verify payment. Please contact support.");
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, []);

  if (verifying) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 max-w-2xl">
          <Card>
            <CardContent className="pt-16 pb-16 text-center">
              <Loader2 className="h-16 w-16 animate-spin mx-auto text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-2">Verifying Payment</h2>
              <p className="text-muted-foreground">Please wait while we confirm your transaction...</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (error || !success) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 max-w-2xl">
          <Card className="border-destructive">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <XCircle className="h-16 w-16 text-destructive" />
              </div>
              <CardTitle className="text-3xl">Payment Failed</CardTitle>
              <CardDescription className="text-base">
                {error || "Your payment could not be completed"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  If you were charged, please contact our support team with your transaction reference.
                </p>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => navigate('/')} 
                  className="flex-1"
                  variant="outline"
                >
                  Go Home
                </Button>
                <Button 
                  onClick={() => window.location.href = `https://wa.me/233276885358`}
                  className="flex-1"
                >
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-2xl">
        <Card className="border-chart-3">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <CheckCircle className="h-16 w-16 text-chart-3" />
            </div>
            <CardTitle className="text-3xl">Payment Successful!</CardTitle>
            <CardDescription className="text-base">
              Your purchase has been completed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {orderDetails && (
              <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                <h3 className="font-semibold text-lg mb-4">Order Details</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Service</p>
                    <p className="font-medium">{orderDetails.serviceId?.toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data Amount</p>
                    <p className="font-medium">{orderDetails.dataAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recipient</p>
                    <p className="font-medium">{orderDetails.recipientNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-medium text-xs">{orderDetails.orderId}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-chart-3/10 border border-chart-3/20 p-4 rounded-lg">
              <p className="text-sm font-medium mb-1">📱 Bundle Delivery</p>
              <p className="text-sm text-muted-foreground">
                Your data bundle will be delivered to the recipient number within 5-10 minutes.
              </p>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={() => navigate('/')} 
                className="flex-1"
              >
                Make Another Purchase
              </Button>
              <Button 
                onClick={() => window.location.href = `https://wa.me/233276885358`}
                variant="outline"
                className="flex-1"
              >
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
