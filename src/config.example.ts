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
    city: "Your City",
    country: "Your Country",
    latitude: 0,
    longitude: 0,
    timezone: "UTC",
    label: "Your City",
  },
  display: {
    port: 3004,
    prayerSchedule: false,
    prayerMethod: 8,
  },
};
