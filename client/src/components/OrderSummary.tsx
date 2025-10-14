import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  serviceName?: string;
  recipientNumber?: string;
  packageName?: string;
  dataAmount?: string;
  validity?: string;
  price?: number;
}

export default function OrderSummary({
  serviceName,
  recipientNumber,
  packageName,
  dataAmount,
  validity,
  price
}: OrderSummaryProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Service</p>
            <p className="text-sm font-medium mt-1" data-testid="text-service">
              {serviceName || 'Not selected'}
            </p>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Recipient Number</p>
            <p className="text-sm font-medium mt-1" data-testid="text-recipient">
              {recipientNumber || 'Not entered'}
            </p>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Package</p>
            {packageName ? (
              <>
                <p className="text-sm font-medium mt-1" data-testid="text-package">
                  {dataAmount}
                </p>
                <p className="text-xs text-muted-foreground">{validity}</p>
              </>
            ) : (
              <p className="text-sm font-medium mt-1">Not selected</p>
            )}
          </div>
        </div>
        
        {price && (
          <>
            <Separator />
            <div className="flex items-center justify-between pt-2">
              <p className="font-semibold">Total</p>
              <p className="text-2xl font-bold text-primary" data-testid="text-total">
                GH₵{price.toFixed(2)}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
