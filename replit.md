# Remax Safaris

A luxury safari travel web application for Remax Safaris, showcasing Kenya and international destinations, tour packages, and bespoke experiences.

## Stack
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS v4
- **Backend**: Express (server.ts) serving the Vite SPA in dev mode
- **Animation**: Motion (Framer Motion successor)
- **Database/Auth**: Firebase (Firestore + Auth)
- **AI**: Google Gemini API (`@google/genai`)

## Running the app
```
npm run dev
```
Starts the Express + Vite dev server on **port 5000**.

## Key environment variables
- `GEMINI_API_KEY` — required for AI features (set as a Replit secret)
- Firebase config is bundled in `firebase-applet-config.json` (no extra secret needed)

## Project structure
```
src/
  components/   React UI components
  data/         Static data (destinations, packages, services, UAE cities)
  context/      React contexts (language, currency, image lightbox)
  utils/        WhatsApp link helpers
  types.ts      Shared TypeScript types
public/
  images/       Local image assets
  videos/       Hero video clips (elephants_waterhole, zanzibar_beach_palms, singapore_marina_bay)
server.ts       Express server entry point
vite.config.ts  Vite configuration
```

## Hero videos
The hero cycles through all three clips in sequence with a crossfade:
1. `elephants_waterhole.mp4`
2. `zanzibar_beach_palms.mp4`
3. `singapore_marina_bay.mp4`

## User preferences
- Hero must cycle through all 3 videos (not pick one randomly)
- Image labels on destination cards must match the actual images shown
