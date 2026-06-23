#!/usr/bin/env bash
set -e

# ---------------------------------------------------------------
#  Holo Projector OS — interactive setup
# ---------------------------------------------------------------

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CONFIG_FILE="$SCRIPT_DIR/src/config.ts"

echo "============================================"
echo "  Holo Projector OS — Setup"
echo "============================================"
echo ""

# ---- 1. Location ----
echo "What city are you in? (e.g. Dubai, London, Tokyo)"
read -r -p "> " CITY
CITY="${CITY:-Dubai}"

echo ""
echo "What country? (e.g. United Arab Emirates, United Kingdom)"
read -r -p "> " COUNTRY
COUNTRY="${COUNTRY:-United Arab Emirates}"

echo ""
echo "Your timezone? (e.g. Asia/Dubai, Europe/London, America/New_York)"
echo "  Find yours at: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones"
read -r -p "> " TIMEZONE
TIMEZONE="${TIMEZONE:-Asia/Dubai}"

echo ""
echo "Display label (shown on the clock):"
read -r -p "> " LABEL
LABEL="${LABEL:-$CITY}"

# ---- 2. Coordinates (for weather) ----
echo ""
echo "Latitude (e.g. 25.2048 for Dubai):"
read -r -p "> " LAT
LAT="${LAT:-25.2048}"

echo ""
echo "Longitude (e.g. 55.2708 for Dubai):"
read -r -p "> " LON
LON="${LON:-55.2708}"

# ---- 3. Prayer Schedule ----
echo ""
echo "Show Islamic prayer times? (y/n)"
read -r -p "> " SHOW_PRAYER

case "$SHOW_PRAYER" in
  [yY]*)
    PRAYER="true"
    echo ""
    echo "Prayer calculation method (default 8 = ISNA):"
    echo "  1 - University of Islamic Sciences, Karachi"
    echo "  2 - Islamic Society of North America (ISNA)"
    echo "  3 - Muslim World League"
    echo "  4 - Umm Al-Qura University, Makkah"
    echo "  5 - Egyptian General Authority of Survey"
    echo "  8 - Gulf Region"
    echo " 12 - Majlis Ugama Islam Singapura"
    read -r -p "> " METHOD
    METHOD="${METHOD:-8}"
    ;;
  *)
    PRAYER="false"
    METHOD="8"
    ;;
esac

# ---- 4. Port ----
echo ""
echo "HTTP port to serve on? (default 3004):"
read -r -p "> " PORT
PORT="${PORT:-3004}"

# ---- Write config ----
echo ""
echo "Writing configuration..."

cat > "$CONFIG_FILE" << CONFIGEOF
export interface AppConfig {
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    timezone: string;
    label: string;
  };
  display: {
    port: number;
    prayerSchedule: boolean;
    prayerMethod: number;
  };
}

export const appConfig: AppConfig = {
  location: {
    city: "${CITY}",
    country: "${COUNTRY}",
    latitude: ${LAT},
    longitude: ${LON},
    timezone: "${TIMEZONE}",
    label: "${LABEL}",
  },
  display: {
    port: ${PORT},
    prayerSchedule: ${PRAYER},
    prayerMethod: ${METHOD},
  },
};
CONFIGEOF

# ---- 5. Install dependencies ----
echo ""
echo "Installing dependencies..."
cd "$SCRIPT_DIR"

if command -v pnpm &>/dev/null; then
  pnpm install
elif command -v yarn &>/dev/null; then
  yarn install
else
  npm install
fi

# ---- 6. Update package.json dev script ----
echo ""
echo "Configuring dev script for port $PORT..."

if command -v jq &>/dev/null; then
  jq --arg port "$PORT" '.scripts.dev = "vite --port=" + $port + " --host=0.0.0.0"' package.json > package.json.tmp
  mv package.json.tmp package.json
else
  sed -i "s/\"dev\": \".*\"/\"dev\": \"vite --port=$PORT --host=0.0.0.0\"/" package.json
fi

# ---- 7. Done ----
echo ""
echo "============================================"
echo "  Setup complete!"
echo "============================================"
echo ""
echo "  Start the dashboard:     npm run dev"
echo "  Open in browser:         http://localhost:$PORT"
echo ""
echo "  To change settings, edit:"
echo "    $CONFIG_FILE"
echo ""
echo "  To build for production: npm run build"
echo ""

# Offer systemd service
echo "Install as a systemd service (auto-start on boot)? (y/n)"
read -r -p "> " INSTALL_SERVICE
case "$INSTALL_SERVICE" in
  [yY]*)
    SERVICE_NAME="holo-projector-os"
    SCRIPT_DIR_RESOLVED="$(cd "$SCRIPT_DIR" && pwd)"
    NODE_BIN="$(which node)"
    NPX_BIN="$(which npx)"

    mkdir -p "$HOME/.config/systemd/user"

    cat > "$HOME/.config/systemd/user/$SERVICE_NAME.service" << SERVICEEOF
[Unit]
Description=Holo Projector OS
After=network.target

[Service]
WorkingDirectory=$SCRIPT_DIR_RESOLVED
ExecStart=$NPX_BIN vite --port=$PORT --host=0.0.0.0
Restart=always
RestartSec=5

[Install]
WantedBy=default.target
SERVICEEOF

    systemctl --user daemon-reload
    systemctl --user enable --now "$SERVICE_NAME.service"

    echo ""
    echo "Service installed and started!"
    echo "  systemctl --user status $SERVICE_NAME"
    ;;
esac

echo ""
echo "Enjoy your holographic dashboard!"
