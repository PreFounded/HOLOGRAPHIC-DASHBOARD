<div align="center">
<img width="1200" alt="HoloDash" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# HoloDash — Ambient Holographic Dashboard

A beautiful, futuristic ambient dashboard for your wall display. Shows time, weather, quotes, progress bars, and optional prayer times. Designed for Raspberry Pi, old tablets, or any always-on display.

## Features

- **Clock** — Live time & date (configurable label)
- **Weather** — 5-day forecast from free Open-Meteo API (no key needed)
- **Quote** — Rotating philosophical, literary, and scientific quotes
- **Progress** — Day/week/month/year progress bars
- **Prayer** — Optional Islamic prayer times (toggle in config)
- **Holographic theme** — Scanlines, glow effects, breathing animation
- **Color themes** — Cyan, green, purple, amber, white, RGB mode
- **Lightweight** — ~300KB JS + CSS, no runtime deps

## Quick Start

\`\`\`bash
bash setup.sh
\`\`\`

Follow the prompts to configure your location, timezone, and preferences. Then open the URL shown.

### Manual Setup

\`\`\`bash
npm install
cp src/config.example.ts src/config.ts   # edit your location
npm run dev
\`\`\`

## Configuration

Edit \`src/config.ts\`:

| Field | Description |
|-------|-------------|
| \`location.city\` | City name for display |
| \`location.country\` | Country for prayer API |
| \`location.timezone\` | IANA timezone (e.g. \`Asia/Dubai\`) |
| \`location.latitude\` | For weather API |
| \`location.longitude\` | For weather API |
| \`display.prayerSchedule\` | \`true\` to show prayer times, \`false\` to hide |
| \`display.port\` | Dev server port (default \`3004\`) |

Or run \`bash setup.sh\` for an interactive walkthrough.

## Install as Systemd Service (always-on display)

\`\`\`bash
bash setup.sh
\`\`\`

The installer offers optional systemd service creation. Or manually:

\`\`\`ini
[Unit]
Description=HoloDash Dashboard
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=/path/to/HOLOGRAPHIC-PROJECTOR-DASHBOARD-OS
ExecStart=/usr/bin/npm run dev
Restart=always

[Install]
WantedBy=multi-user.target
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`

Output in \`dist/\`. Serve with any static file server.

## Credits

Based on the [Holographic Dashboard](https://github.com/PreFounded/HOLOGRAPHIC-DASHBOARD) by PreFounded. Originally created for Google AI Studio.
