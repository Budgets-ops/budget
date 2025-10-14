import { SiWhatsapp } from "react-icons/si";
import { Card } from "@/components/ui/card";

interface WhatsAppBannerProps {
  phoneNumber?: string;
}

export default function WhatsAppBanner({ phoneNumber = "+233 276 885 358" }: WhatsAppBannerProps) {
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;
  
  return (
    <Card className="bg-chart-3/10 border-chart-3/20">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 p-3 hover-elevate"
        data-testid="link-whatsapp"
      >
        <SiWhatsapp className="h-5 w-5 text-chart-3" />
        <span className="text-sm font-medium">
          Also available on WhatsApp: <span className="text-chart-3">{phoneNumber}</span>
        </span>
      </a>
    </Card>
  );
}
