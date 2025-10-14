import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface ServiceCardProps {
  id: string;
  name: string;
  logo: string;
  category: string;
  selected?: boolean;
  onClick: () => void;
}

export default function ServiceCard({ 
  name, 
  logo, 
  selected = false, 
  onClick 
}: ServiceCardProps) {
  return (
    <Card
      className={`relative cursor-pointer hover-elevate active-elevate-2 overflow-hidden transition-all ${
        selected ? 'border-2 border-primary ring-4 ring-primary/20' : ''
      }`}
      onClick={onClick}
      data-testid={`card-service-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="aspect-[4/3] flex flex-col items-center justify-center p-6 gap-4">
        <div className="w-full h-32 flex items-center justify-center">
          <img 
            src={logo} 
            alt={`${name} logo`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground mt-1">Click to select</p>
        </div>
      </div>
      
      {selected && (
        <div className="absolute top-3 right-3">
          <CheckCircle2 className="h-6 w-6 text-primary" />
        </div>
      )}
    </Card>
  );
}
