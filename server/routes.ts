import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { orderSchema } from "@shared/schema";
import { z } from "zod";

const PACKAGES: Record<string, { id: string; price: number; dataAmount: string }> = {
  "pkg-1": { id: "pkg-1", price: 6, dataAmount: "1GB" },
  "pkg-2": { id: "pkg-2", price: 11, dataAmount: "2GB" },
  "pkg-3": { id: "pkg-3", price: 16, dataAmount: "3GB" },
  "pkg-4": { id: "pkg-4", price: 21, dataAmount: "4GB" },
  "pkg-5": { id: "pkg-5", price: 25, dataAmount: "5GB" },
  "pkg-6": { id: "pkg-6", price: 30, dataAmount: "6GB" },
  "pkg-7": { id: "pkg-7", price: 36, dataAmount: "8GB" },
  "pkg-8": { id: "pkg-8", price: 46, dataAmount: "10GB" },
  "pkg-9": { id: "pkg-9", price: 65.5, dataAmount: "15GB" },
  "pkg-10": { id: "pkg-10", price: 85, dataAmount: "20GB" },
  "pkg-11": { id: "pkg-11", price: 105, dataAmount: "25GB" },
  "pkg-12": { id: "pkg-12", price: 125, dataAmount: "30GB" },
  "pkg-13": { id: "pkg-13", price: 160, dataAmount: "40GB" },
  "pkg-14": { id: "pkg-14", price: 206, dataAmount: "50GB" },
  "pkg-15": { id: "pkg-15", price: 45, dataAmount: "10GB" },
  "pkg-16": { id: "pkg-16", price: 63, dataAmount: "15GB" },
  "pkg-17": { id: "pkg-17", price: 85, dataAmount: "20GB" },
  "pkg-18": { id: "pkg-18", price: 121, dataAmount: "30GB" },
  "pkg-19": { id: "pkg-19", price: 165, dataAmount: "40GB" },
  "pkg-20": { id: "pkg-20", price: 205, dataAmount: "50GB" },
  "pkg-21": { id: "pkg-21", price: 5, dataAmount: "1GB" },
  "pkg-22": { id: "pkg-22", price: 10, dataAmount: "2GB" },
  "pkg-23": { id: "pkg-23", price: 15, dataAmount: "3GB" },
  "pkg-24": { id: "pkg-24", price: 25, dataAmount: "5GB" },
  "pkg-25": { id: "pkg-25", price: 36, dataAmount: "8GB" },
  "pkg-26": { id: "pkg-26", price: 45, dataAmount: "10GB" },
  "pkg-27": { id: "pkg-27", price: 62, dataAmount: "15GB" },
  "pkg-28": { id: "pkg-28", price: 80, dataAmount: "20GB" },
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize Paystack payment
  app.post("/api/payment/initialize", async (req, res) => {
    try {
      const data = orderSchema.parse(req.body);
      
      // Get package details
      const packageDetails = PACKAGES[data.packageId];
      if (!packageDetails) {
        return res.status(400).json({ error: "Invalid package" });
      }

      // Create order in storage
      const order = await storage.createOrder({
        ...data,
        amount: packageDetails.price
      });

      // Initialize Paystack payment
      const domain = process.env.REPLIT_DEV_DOMAIN || 'localhost:5000';
      const callbackUrl = `https://${domain}/success`;
      
      const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `customer${order.id}@triversa.com`, // Using order ID as customer email
          amount: Math.round(packageDetails.price * 100), // Convert to pesewas/cents
          reference: order.id,
          callback_url: callbackUrl,
          metadata: {
            orderId: order.id,
            serviceId: data.serviceId,
            packageId: data.packageId,
            recipientNumber: data.recipientNumber,
            dataAmount: packageDetails.dataAmount
          }
        })
      });

      const paystackData = await paystackResponse.json();

      if (!paystackData.status) {
        return res.status(400).json({ error: paystackData.message || "Payment initialization failed" });
      }

      res.json({
        orderId: order.id,
        authorizationUrl: paystackData.data.authorization_url,
        accessCode: paystackData.data.access_code,
        reference: paystackData.data.reference
      });
    } catch (error) {
      console.error('Payment initialization error:', error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Verify Paystack payment
  app.get("/api/payment/verify/:reference", async (req, res) => {
    try {
      const { reference } = req.params;
      console.log("ive been called")
      const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        }
      });

      const paystackData = await paystackResponse.json();

      if (!paystackData.status) {
        return res.status(400).json({ error: "Payment verification failed" });
      }

      const { data } = paystackData;
      console.log('Paystack verification data:', JSON.stringify(data));
      
      // Update order status
      if (data.status === 'success') {
        await storage.updateOrderStatus(data.reference, 'completed');
        
        // Send purchase details to webhook
        const webhookPayload = {
          reference: data.reference,
          amount: data.amount / 100,
          currency: data.currency,
          status: data.status,
          serviceId: data.metadata?.serviceId,
          packageId: data.metadata?.packageId,
          recipientNumber: data.metadata?.recipientNumber,
          dataAmount: data.metadata?.dataAmount,
          transactionDate: data.transaction_date,
          channel: data.channel,
          customerEmail: data.customer?.email
        };
        
        console.log('Sending to webhook:', webhookPayload);
        
        try {
          const webhookRes = await fetch('https://06a2b233f397.ngrok-free.app/receive_success', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(webhookPayload)
          });
          console.log('Webhook response:', webhookRes.status, await webhookRes.text());
        } catch (webhookError) {
          console.error('Webhook notification error:', webhookError);
        }
      } else {
        await storage.updateOrderStatus(data.reference, 'failed');
      }

      res.json({
        status: data.status,
        amount: data.amount / 100, // Convert back from pesewas/cents
        reference: data.reference,
        metadata: data.metadata
      });
    } catch (error) {
      console.error('Payment verification error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
