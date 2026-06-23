<p align="center">
  <img width="1200" alt="HoloDash Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6">
</p>

<h1 align="center">✦ HoloDash ✦</h1>

<p align="center">
  <b>Ambient Holographic Dashboard</b><br>
  Futuristic always-on wall display — time, weather, quotes, progress & optional prayer times.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/size-~300KB-0ff?style=flat-square" alt="Size">
  <img src="https://img.shields.io/badge/api_key-none-0ff?style=flat-square" alt="No API keys">
  <img src="https://img.shields.io/badge/license-MIT-0ff?style=flat-square" alt="MIT">
  <img src="https://img.shields.io/badge/runtime-Node.js-0ff?style=flat-square" alt="Node.js">
</p>

<p align="center">
  <a href="#features">Features</a> ⋮
  <a href="#quick-start">Quick Start</a> ⋮
  <a href="#configuration">Configuration</a> ⋮
  <a href="#systemd-service">Systemd</a> ⋮
  <a href="#build">Build</a> ⋮
  <a href="#credits">Credits</a>
</p>

<br>

---

<br>

## ✦ Features

| Widget | Description |
|--------|-------------|
| **⌚ Clock** | Live time & date — configurable city label |
| **⛅ Weather** | 5-day forecast via Open-Meteo (free, zero setup) |
| **✎ Quote** | Rotating philosophical, literary & scientific quotes |
| **◉ Progress** | Day / week / month / year progress bars |
| **ﷲ Prayer** | Optional Islamic prayer times with next-prayer countdown |

### Visual

Holographic theme with scanlines, glow FX, and breathing animation.  
Six color presets — **Cyan · Green · Purple · Amber · White · RGB** rainbow cycle.  
Responsive grid — looks stunning on monitors, tablets, and wall displays.

---

## ✦ Quick Start

```bash
bash setup.sh
```

Follow the interactive prompts — city, timezone, coordinates, prayer toggle, port.  
That's **it**. Open the URL it prints.

### Manual

```bash
npm install
cp src/config.example.ts src/config.ts
# edit src/config.ts → set your location & preferences
npm run dev
```

> **Zero API keys required.** Weather from [Open-Meteo](https://open-meteo.com), prayer times from [Aladhan](https://aladhan.com) — both free & open.

---

## ✦ Configuration

```ts
location: {
  city:      "Dubai",
  country:   "United Arab Emirates",
  timezone:  "Asia/Dubai",
  latitude:  25.2048,
  longitude: 55.2708,
}
display: {
  port:           3004,
  prayerSchedule: true,    // false → hides prayer widget
  prayerMethod:   8,       // 8 = ISNA calculation
}
```

Run `bash setup.sh` for an interactive walkthrough that writes `src/config.ts` for you.

---

## ✦ Systemd Service

For always-on displays (Raspberry Pi, old laptop, tablet kiosk):

```bash
bash setup.sh    # offers optional systemd installation
```

Or wire manually:

```ini
[Unit]
Description=HoloDash Dashboard
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/holodash
ExecStart=/usr/bin/npm run dev
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable --now holodash
```

---

## ✦ Build

```bash
npm run build
```

Output lands in `dist/` — serve with any static file server.

---

## ✦ Credits

Built on [Holographic Dashboard](https://github.com/PreFounded/HOLOGRAPHIC-DASHBOARD) by PreFounded.  
Originally created for Google AI Studio.
