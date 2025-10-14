import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle } from "lucide-react";

interface PackageCardProps {
  id: string;
  name: string;
  dataAmount: string;
  price: number;
  validity: string;
  selected?: boolean;
  onClick: () => void;
}

export default function PackageCard({
  id,
  name,
  dataAmount,
  price,
  validity,
  selected = false,
  onClick
}: PackageCardProps) {
  return (
    <Card
      className={`cursor-pointer hover-elevate active-elevate-2 transition-all ${
        selected ? 'border-2 border-primary ring-4 ring-primary/20' : ''
      }`}
      onClick={onClick}
      data-testid={`card-package-${id}`}
    >
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {selected ? (
            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
          ) : (
            <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          )}
          <div>
            <h4 className="font-semibold text-base">{dataAmount}</h4>
            <p className="text-sm text-muted-foreground">{validity}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary">GH₵{price.toFixed(2)}</p>
        </div>
      </div>
    </Card>
  );
}
