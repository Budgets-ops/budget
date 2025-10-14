import { Check } from "lucide-react";

interface Step {
  id: number;
  label: string;
}

interface ProgressIndicatorProps {
  currentStep: number;
  steps: Step[];
}

export default function ProgressIndicator({ currentStep, steps }: ProgressIndicatorProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  currentStep > step.id
                    ? 'bg-primary border-primary text-primary-foreground'
                    : currentStep === step.id
                    ? 'border-primary text-primary bg-primary/10'
                    : 'border-muted text-muted-foreground'
                }`}
                data-testid={`step-${step.id}`}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>
              <p
                className={`text-xs mt-2 text-center hidden sm:block ${
                  currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </p>
            </div>
            
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 transition-all ${
                  currentStep > step.id ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
