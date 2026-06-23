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
    city: "Dubai",
    country: "United Arab Emirates",
    latitude: 25.2048,
    longitude: 55.2708,
    timezone: "Asia/Dubai",
    label: "Dubai",
  },
  display: {
    port: 3004,
    prayerSchedule: true,
    prayerMethod: 8,
  },
};
