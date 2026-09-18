# Shram Sathi Portal

"SHRAM SATHI" - an AI-Powered, Inclusive Compliance Intelligence Portal for the Ministry of Labour & Employment (MoLE), Government of India, created for the Digital Shram Sankalp Ideathon 2026 by team Vision Buddies.

### Key Objectives & Tone:
- Professional, hyper-polished Government of India portal aesthetic (inspired by Shram Suvidha 2.0, eShram, and Digital India with sleek modern GovTech styling, tricolour accents, clean typography, bilingual headers, and crisp card layouts).
- Addresses Primary Problem Statement **PS-05 (AI-Driven Smart Inspection System for Labour Code Compliance)** and integrated highlight **PS-06 (Accessibility & Inclusive Technology as a core design layer)**.
- High interactivity with zero dead clicks: interactive document upload & analysis, live compliance scorecard generator, voice interaction (using browser Web Speech API for real voice synthesis & speech recognition), multilingual language switcher, accessibility tools, Inspector portal, Employer portal, and SMS/IVR simulator.

### Core Modules & Features to Implement:

1. **Header & Gov Navigation:**
   - MoLE & Digital India branding, Shram Suvidha Portal 2.0 integration badge, National Emblem / Tiranga insignia.
   - Quick global switches: Language selector (English, हिन्दी, தமிழ், বাংলা, मराठी, తెలుగు, etc.), Accessibility Toolbar (Text size +/-/reset, High Contrast mode, Dyslexia font, Screen Reader focus mode, Voice Assistant quick toggle).
   - Navigation:
     - 🏛️ Executive Overview & Problem Statement (PS-05 & PS-06, DGFASLI statistics on inspection coverage drop from 47.56% to 19.12%).
     - 📄 AI Document Ingestion & Verification Engine (Interactive OCR + RAG + Rule Engine).
     - 📊 Risk-Based Compliance Scorecard (Interactive establishment analyzer by Shram Pehchan Sankhya / LIN).
     - 🎙️ PS-06 Inclusive Voice & Low-Tech Suite (Bolo Shram Sathi, Multilingual TTS/STT, SMS & IVR Simulator).
     - 👷 Employer Self-Serve Portal (Kirana / MSME / Factory simplified view with green/amber/red icons).
     - 🔍 Inspector-cum-Facilitator Dashboard (Risk heatmap, priority queue, on-site voice observation dictation).
     - 🛡️ DPDP Act 2023 & Data Security Hub (Consent manager, audit logs, anonymization demo).
     - 📑 Ideathon Pitch Deck / Vision Buddies Presentation Mode.

2. **AI Document Ingestion & Compliance Verification Engine (PS-05):**
   - Upload interactive dropzone accepting sample formats (Wage Register PDF, Factory OSH Safety Checklist, ESI/EPF Challan, Contract Labour muster roll).
   - Provide pre-loaded realistic sample documents (e.g. "Radha Krishna Garments - Wage Register 2026", "Bharat Infra Ltd - OSH Safety Audit", "Greenwood Logistics - ESI/EPF Filing") for instant 1-click testing.
   - Animated visual extraction pipeline:
     1. Ingestion & Pre-processing.
     2. OCR layout parsing & field normalization (Worker count, overtime rates, safety equipment certs, minimum wage compliance).
     3. RAG LLM Compliance Interpretation against the 4 Labour Codes (Code on Wages 2019, OSH & WC Code 2020, Social Security Code 2020, Industrial Relations Code 2020).
     4. Deterministic Statutory Rule Engine Safety Net: validates flags against exact legal sections (e.g., *Section 6(1) of Code on Wages - Wage rate ₹380/day falls below notified state minimum of ₹440/day for Zone B skilled labour*).
     5. Sector anomaly detection benchmark: graph showing establishment values diverging from regional sector norms.

3. **Dynamic Risk-Based Compliance Scorecard:**
   - Establishment lookup by LIN / Shram Pehchan Sankhya (e.g. LIN-1082-9923-4120).
   - Visual Risk Meter (Low - Green, Moderate - Amber, High - Red) with composite score (0-100).
   - Clause-by-clause breakdown with severity tags, statutory citations, penalty risks, and direct "How to Resolve" guidance in plain Hindi/English.
   - Export scorecard as downloadable summary and trigger instant notification.

4. **PS-06 Inclusive Accessibility & Low-Tech Layer (Built-in Core):**
   - **Voice-First "Bolo Shram Sathi"**: Working Speech Synthesis (TTS) that reads out scorecards and alerts aloud in Hindi or English, and Speech Recognition (STT) mic button to ask questions like "Mera compliance score kya hai?" or "What are my safety flags?".
   - **Low-Literacy Icon-Driven Mode**: Toggle switch that transforms legal jargon tables into big visual traffic-light cards with intuitive icons, audio playback buttons, and simple single-line explanations.
   - **SMS & IVR Interactive Demo**:
     - Visual mobile phone mockup simulating automated SMS alerts sent to basic feature phones.
     - Interactive IVR phone dialer simulation where users can "call" 1800-SHRAM-SATHI, hear voice prompts in regional languages, and press keypad numbers to check compliance status.

5. **Dual Role Dashboards:**
   - **Employer / MSME View**: Simple, encouraging guidance for small shop owners and contractors to rectify non-compliance before inspections occur.
   - **Inspector-cum-Facilitator Dashboard**:
     - Geospatial / district-level risk distribution (e.g., Peenya Industrial Area, Okhla Phase III).
     - Filterable computerized priority queue replacing blind random inspections with data-driven risk allocation.
     - On-site voice dictation tool for inspectors to record spot observations with auto-transcription and statutory tagging.

6. **DPDP Act 2023 & Security Architecture:**
   - Visual consent architecture flow (Data Principal vs Data Fiduciary vs Data Processor).
   - Live toggles for Data Erasure, Consent Revocation, and Audit Trail log viewer demonstrating AES-256 encryption at rest and TLS 1.3 in transit.

Ensure fluid navigation, delightful micro-animations, sample data presets so judges can test every feature instantly, responsive mobile-friendly layout, and zero placeholder text. Everything should feel production-grade, fast, and pitch-ready for the Ideathon 2026 jury.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b981203c-7b13-4b37-bc71-fb6185d37983).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
