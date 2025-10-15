import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import WhatsAppBanner from "@/components/WhatsAppBanner";
import type { Service } from "@shared/schema";

const MOCK_SERVICES: Service[] = [
  {
    id: "mtn",
    name: "MTN",
    logo: "https://placehold.co/200x100/FFD700/000000?text=MTN",
    category: "telecom"
  },
  {
    id: "airteltigo",
    name: "AirtelTigo",
    logo: "https://placehold.co/200x100/E31E24/FFFFFF?text=AirtelTigo",
    category: "telecom"
  },
  {
    id: "telecel",
    name: "Telecel",
    logo: "https://placehold.co/200x100/D32F2F/FFFFFF?text=Telecel",
    category: "telecom"
  }
];

export default function Home() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [, navigate] = useLocation();

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    console.log('Service selected:', serviceId);
    // Navigate to recipient page with selected service
    setTimeout(() => {
      navigate(`/recipient?service=${serviceId}`);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Budget Bundles
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted platform for affordable data bundles and services
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <WhatsAppBanner />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-6">Select Your Service</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {MOCK_SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                selected={selectedService === service.id}
                onClick={() => handleServiceSelect(service.id)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold mb-2">Instant Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Get your data bundle activated immediately
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="font-semibold mb-2">Secure Payment</h3>
            <p className="text-sm text-muted-foreground">
              Your transactions are safe and encrypted
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-semibold mb-2">Best Prices</h3>
            <p className="text-sm text-muted-foreground">
              Affordable bundles with great value
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
