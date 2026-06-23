import { useEffect, useState } from "react";
import { HoloWrapper } from "./HoloWrapper";
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, differenceInSeconds } from "date-fns";

const ProgressBar = ({ label, percentage }: { label: string, percentage: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs font-black font-mono text-purple-100 uppercase tracking-widest">
      <span>{label}</span>
      <span>{percentage.toFixed(0)}%</span>
    </div>
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <div className="h-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]" style={{ width: `${percentage}%` }} />
    </div>
  </div>
);

export function ProgressWidget() {
  const [progress, setProgress] = useState({ day: 0, week: 0, month: 0, year: 0 });

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      setProgress({
        day: (differenceInSeconds(now, startOfDay(now)) / differenceInSeconds(endOfDay(now), startOfDay(now))) * 100,
        week: (differenceInSeconds(now, startOfWeek(now, { weekStartsOn: 0 })) / differenceInSeconds(endOfWeek(now, { weekStartsOn: 0 }), startOfWeek(now, { weekStartsOn: 0 }))) * 100,
        month: (differenceInSeconds(now, startOfMonth(now)) / differenceInSeconds(endOfMonth(now), startOfMonth(now))) * 100,
        year: (differenceInSeconds(now, startOfYear(now)) / differenceInSeconds(endOfYear(now), startOfYear(now))) * 100,
      });
    };
    calc();
    const interval = setInterval(calc, 60000); // 1 min is fine
    return () => clearInterval(interval);
  }, []);

  return (
    <HoloWrapper theme="purple" className="flex flex-col">
      <h2 className="text-xs font-black font-mono text-purple-400 uppercase tracking-widest mb-6">Cycle Status</h2>
      <div className="flex flex-col gap-6 flex-grow justify-center">
        <ProgressBar label="Day" percentage={progress.day} />
        <ProgressBar label="Week" percentage={progress.week} />
        <ProgressBar label="Month" percentage={progress.month} />
        <ProgressBar label="Year" percentage={progress.year} />
      </div>
    </HoloWrapper>
  );
}
