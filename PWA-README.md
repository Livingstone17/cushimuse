# CushiMuse - PWA

A Progressive Web App designed to help churches create engaging social media content for their ministries.

## Features

✨ **PWA Capabilities**
- Install on any device (iOS, Android, Desktop)
- Works offline after first visit
- Fast loading with service worker caching
- App-like experience with no browser chrome

📱 **User-Friendly Interface**
- Beautiful gradient design
- Responsive on all devices
- One-click copy to clipboard
- Toast notifications for feedback

⛪ **Church-Focused**
- Post types: Announcements, Events, Devotionals, Testimonies, Prayer Requests
- Platforms: Facebook, Instagram, Twitter, LinkedIn
- Tones: Inspirational, Welcoming, Joyful, Reflective, Educational
- Pre-filled church-appropriate content

## How to Install as PWA

### On Desktop (Chrome, Edge, Brave)
1. Visit the website
2. Look for the install icon in the address bar
3. Click "Install" when prompted
4. The app will open in its own window

### On iOS (Safari)
1. Visit the website in Safari
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Name it and tap "Add"

### On Android (Chrome)
1. Visit the website in Chrome
2. Tap the menu (three dots)
3. Tap "Install app" or "Add to Home Screen"
4. Follow the prompts

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## PWA Files

- `/public/manifest.json` - App manifest with metadata
- `/public/sw.js` - Service worker for offline support
- `/public/icon.svg` - App icon (SVG)
- `/public/icon-192.png` - App icon (192x192)
- `/public/icon-512.png` - App icon (512x512)
- `/public/offline.html` - Offline fallback page
- `/index.html` - Entry point with PWA meta tags

## Technologies

- React 18
- TypeScript
- Tailwind CSS v4
- Vite
- Service Workers API
- Web App Manifest
- Lucide Icons
- Shadcn UI Components

---

Made with ❤️ for churches and ministries
