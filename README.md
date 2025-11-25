# Mein Objekt – Museum Client (PWA)

**Live Demo:**  
👉 https://mein-objekt.netlify.app/  
_(Open on iOS/Android to install the app on your home screen.)_

Mein Objekt is a **Progressive Web App (PWA)** designed for museums.  
Visitors scan QR codes near exhibits to instantly access museum object information, including a curated “Object Chat” with predefined questions and answers.

The application supports **offline mode**, **museum branding**, and **PWA installation**.

---

## Features

### 🔍 QR-based museum object viewer

- Scan QR codes using device camera (html5-qrcode)
- Deep linking via `/o/{objectId}`

### 💬 Object Chat

- Predefined question and answer pairs
- Chat bubble UI
- No free-form user input

### 📡 Offline Support

- Cached recently viewed objects
- Cached images and app shell via Service Worker
- Offline fallback screen

### 🎨 Museum Branding

- Custom logo
- Museum name
- Theme colors
- Used across:
  - Welcome screen
  - Header
  - PWA manifest
  - App icons

### 📱 PWA Installation

Installable on **iOS** and **Android** directly from:  
👉 https://mein-objekt.netlify.app/

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Material UI (MUI)
- html5-qrcode
- PWA (manifest + service worker)

### Backend

_(Not implemented yet — static data only)_

---

## How It Works

### 1. User Flow

1. User opens the app
2. User scans a QR code
3. QR code contains `/o/{objectId}`
4. App loads:
   - Object name
   - Image
   - Description
   - Predefined Object Chat
5. User taps a question → answer displayed in chat UI

### 2. QR Scanner

- Camera access via `getUserMedia()`
- Powered by `html5-qrcode`
- Fallback info if camera is blocked

### 3. Offline Experience

- Automatic caching by Service Worker
- App shell + last viewed objects cached
- Images cached with CacheFirst strategy
- Offline fallback page when no cached content exists

---

## PWA Installation

### Android (Chrome)

1. Open the app URL
2. Tap **Install App**
3. Icon appears on home screen

### iOS (Safari)

1. Open the site
2. Tap **Share → Add to Home Screen**
3. PWA installs as standalone app

---

## Development

### Install dependencies

```bash
npm install
```
