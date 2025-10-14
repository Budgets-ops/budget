import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone } from "lucide-react";

interface PhoneInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  testId?: string;
}

export default function PhoneInput({
  label,
  placeholder = "0XX XXX XXXX",
  value,
  onChange,
  error,
  testId = "input-phone"
}: PhoneInputProps) {
  const formatPhoneNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, '');
    return cleaned;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  const displayValue = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');

  return (
    <div className="space-y-2">
      <Label htmlFor={testId} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          id={testId}
          data-testid={testId}
          type="tel"
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          className={`pl-11 h-12 text-base ${error ? 'border-destructive' : ''}`}
          maxLength={12}
        />
      </div>
      {error && (
        <p className="text-sm text-destructive" data-testid="text-error">
          {error}
        </p>
      )}
    </div>
  );
}
