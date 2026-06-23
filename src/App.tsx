import { ThemeProvider } from "./components/ThemeContext";
import { ClockWidget } from "./components/ClockWidget";
import { PrayerWidget } from "./components/PrayerWidget";
import { WeatherWidget } from "./components/WeatherWidget";
import { ProgressWidget } from "./components/ProgressWidget";
import { QuoteWidget } from "./components/QuoteWidget";
import { EmptyWidget } from "./components/EmptyWidget";
import { appConfig } from "./config";

export default function App() {
  const showPrayer = appConfig.display.prayerSchedule;

  return (
    <ThemeProvider>
      <div className="w-screen h-screen bg-black overflow-hidden relative font-sans text-white font-bold">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQwIDBMMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-50 z-0"></div>
        <div className="scanlines z-[1]"></div>

        <div className="w-full h-full p-8 lg:p-12 relative z-10 flex flex-col items-center justify-center bg-black">
          <div className="w-full max-w-[1400px] h-[90vh] mx-auto grid grid-cols-1 md:grid-cols-12 grid-rows-12 gap-5 relative z-10">
            <div className="md:col-span-4 row-span-4">
              <ClockWidget />
            </div>

            <div className="md:col-span-8 row-span-4">
              <WeatherWidget />
            </div>

            <div className="md:col-span-4 row-span-8">
              {showPrayer ? <PrayerWidget /> : <EmptyWidget />}
            </div>
            <div className="md:col-span-4 row-span-8">
              <QuoteWidget />
            </div>
            <div className="md:col-span-4 row-span-8">
              <ProgressWidget />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
