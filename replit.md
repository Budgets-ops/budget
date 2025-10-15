# Budget Bundles

## Overview
Budget Bundles is a web application for purchasing affordable data bundles for various telecom providers in Ghana. The platform supports MTN, AirtelTigo, and Telecel. Payments are processed through Paystack integration.

## Project Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL (via Drizzle ORM)
- **Payment**: Paystack
- **UI Components**: Radix UI + Tailwind CSS
- **Form Handling**: React Hook Form + Zod validation

### Project Structure
```
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components (Home, Payment, Recipient)
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions
│   └── index.html
├── server/              # Express backend
│   ├── index.ts         # Main server entry point
│   ├── routes.ts        # API routes
│   ├── storage.ts       # Data storage layer (in-memory)
│   └── vite.ts          # Vite dev server setup
├── shared/              # Shared code between frontend and backend
│   └── schema.ts        # Database schema and types
└── package.json
```

## Recent Changes (October 15, 2025)
- ✅ **Package Data Updated**: Replaced mock packages with real pricing data
  - MTN: 14 packages (1GB - 50GB)
  - Telecel: 6 packages (10GB - 50GB)
  - AirtelTigo: 8 packages (1GB - 20GB)
- ✅ **Site Rebranding**: Changed site name from "Triversa Bundles" to "Budget Bundles"
- ✅ **Services Cleanup**: Removed WASSCE and BECE checker services
- ✅ **Payment Summary Fix**: Updated Payment page package data to match new pricing
- ✅ **Paystack Duplicate Reference Fix**: Enhanced order ID generation with timestamp + nanoid to prevent duplicate transaction errors

## Previous Changes (October 14, 2025)
- ✅ **GitHub Import Setup**: Configured project for Replit environment from fresh GitHub import
- ✅ **Node.js Installation**: Installed Node.js 20 runtime and all dependencies
- ✅ **Vite Configuration**: Updated vite.config.ts to allow all hosts for Replit proxy support
- ✅ **Git Configuration**: Created .gitignore file for Node.js project
- ✅ **Development Workflow**: Set up workflow to run development server on port 5000
- ✅ **Application Testing**: Verified frontend and backend are working correctly
- ✅ **Deployment Configuration**: Configured autoscale deployment with build and start commands
- ✅ **Database Connection**: Verified DATABASE_URL is configured for PostgreSQL
- ✅ **Paystack Integration Complete**: 
  - Added PAYSTACK_SECRET_KEY and VITE_PAYSTACK_PUBLIC_KEY to environment variables (.env file)
  - Created success page (/success) for payment confirmation
  - Configured Paystack callback URL using REPLIT_DEV_DOMAIN
  - Payment flow: Initialize → Paystack modal → Callback verification → Success page
  - Complete error handling with loading, success, and error states
- ✅ **Paystack Callback Fix**: Fixed "callback must be a valid function" error
  - Changed callback from async function to synchronous function
  - Converted async/await pattern to Promise chains (.then/.catch/.finally)
  - Paystack requires callback to return void, not Promise
- ✅ **Environment Setup**: 
  - Installed dotenv package for environment variable loading
  - Added dotenv/config import to server/index.ts
  - Created .gitignore to protect sensitive .env file

## Configuration

### Environment Variables
- `DATABASE_URL` - PostgreSQL database connection string (configured ✓)
- `PAYSTACK_SECRET_KEY` - Paystack API secret key for backend (configured ✓)
- `VITE_PAYSTACK_PUBLIC_KEY` - Paystack public key for frontend (configured ✓)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

### Development Server
The app runs on port 5000 with both frontend and backend served from the same Express server:
- Development: Uses Vite dev server with HMR
- Production: Serves static built files

### Database
- Uses Drizzle ORM with PostgreSQL
- Currently using in-memory storage (MemStorage class)
- Migration command: `npm run db:push`

### Payment Integration
- Paystack integration for payment processing
- Supports mobile money payments
- Payment flow: Initialize → Verify

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check
- `npm run db:push` - Push database schema changes

## Services Supported
1. **MTN** - Data bundles (1GB to 50GB)
2. **AirtelTigo** - Data bundles (1GB to 20GB)
3. **Telecel** - Data bundles (10GB to 50GB)

## Key Features
- Service selection interface
- Package browsing and selection
- Recipient phone number entry
- Payment processing via Paystack
- Order tracking
- WhatsApp contact integration

## User Preferences
None documented yet.
