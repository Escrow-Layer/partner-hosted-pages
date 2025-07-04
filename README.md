# EscrowLayer — Hosted Escrow Flow & Partner Admin

This repository contains the source code for EscrowLayer's white-label, hosted escrow pages and the partner admin dashboard.

## 🌐 Hosted Escrow Flow

- **URL Pattern:** `/escrow/{escrowId}`
- Allows buyers and sellers to securely complete escrow transactions in a fully branded, partner-specific UI.
- Features:
  - Deal summary, custom form fields, chain/network selector
  - QR code and address for deposits (EVM, Solana, Tron)
  - Milestones, countdown timers, dispute/help module
  - Mobile-first, WCAG 2.1 accessible, fully responsive
  - Branding (logo, colors, fonts) and custom domains (CNAME support)

## 🛠️ Partner Admin Dashboard

- **URL:** `/admin`
- Allows integration partners to manage:
  - Brand settings (logo, colors, domain)
  - Subdomain/CNAME mapping (e.g., `crypto.partner.com`)
  - Payout wallet address and commission settings
  - Business information and platform intro
  - Product/asset types and default networks/currencies
  - Workflow options (milestones, disputes, webhooks, API keys)
  - Live preview of branding and appearance

## 🚀 Getting Started

1. **Clone this repository**
2. **Install dependencies:**  
   `npm install`
3. **Run the development server:**  
   `npm run dev`
4. Access hosted flow pages at `http://localhost:3000/escrow/{escrowId}`  
   Access admin panel at `http://localhost:3000/admin`

## 📄 Documentation

- See `/docs` folder or [EscrowLayer Partner Docs](https://escrowlayer.io/docs) for API and integration details.

## 💡 Notes

- Built with a modern, monochrome UI (black/white/gray), customizable per partner.
- Inspired by Stripe Checkout and Escrow.com best practices for hosted escrow.
- Supports full white-label experience via CNAME and dynamic branding.



