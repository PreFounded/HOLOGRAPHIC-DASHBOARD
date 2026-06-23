import { HoloWrapper } from "./HoloWrapper";
import { PrayerTimesData, usePrayerTimes, PRAYERS } from "../hooks/usePrayerTimes";

export function PrayerWidget() {
  const { times, nextPrayer } = usePrayerTimes();
  
  if (!times) return <HoloWrapper theme="green" className="animate-pulse blur"><div/></HoloWrapper>;

  const formatCountdown = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <HoloWrapper theme="green">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xs font-black font-mono text-emerald-400 uppercase tracking-widest">Prayer Schedule</h2>
        {nextPrayer && (
          <div className="text-right">
            <div className="text-[10px] text-emerald-400 font-black font-mono uppercase tracking-widest mb-1">Next in</div>
            <div className="text-lg font-bold font-mono text-emerald-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]">{formatCountdown(nextPrayer.diffSeconds)}</div>
          </div>
        )}
      </div>

      <div className="space-y-2 flex-grow flex flex-col justify-around">
        {PRAYERS.map((p, index) => {
          const isActive = nextPrayer?.name === p;
          const isLast = index === PRAYERS.length - 1;
          return (
            <div key={p} className={`flex justify-between items-center ${!isLast ? 'border-b-2 border-emerald-400/20 pb-2' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,1)]' : 'bg-transparent border-2 border-emerald-400/30'}`} />
                <span className={`text-lg font-bold uppercase tracking-widest ${isActive ? "text-white" : "text-emerald-100/60"}`}>{p}</span>
              </div>
              <span className={`text-xl font-bold font-mono ${isActive ? "text-emerald-300 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]" : "text-white/60"}`}>
                {times[p as keyof PrayerTimesData] || "--:--"}
              </span>
            </div>
          );
        })}
      </div>
    </HoloWrapper>
  );
}
