import { useState, useEffect, type FC } from 'react';
import { Eye, TrendingUp } from 'lucide-react';

export const VisitorCounter: FC = () => {
  const [visitCount, setVisitCount] = useState<number>(1280);

  useEffect(() => {
    let isMounted = true;

    async function fetchVisitorCount() {
      const STORAGE_KEY = 'fire_calc_visit_count';
      const LAST_VISIT_KEY = 'fire_calc_last_visit';

      let count = parseInt(localStorage.getItem(STORAGE_KEY) || '1280', 10);
      const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
      const now = Date.now();

      // Check if new session (30 mins interval)
      const isNewVisit = !lastVisit || now - parseInt(lastVisit, 10) > 30 * 60 * 1000;

      if (isNewVisit) {
        count += 1;
        localStorage.setItem(STORAGE_KEY, count.toString());
        localStorage.setItem(LAST_VISIT_KEY, now.toString());
      }

      try {
        // Free cloud counter API (api.counterapi.dev or fallback countapi)
        const response = await fetch('https://api.counterapi.dev/v1/fire-calculator-taiwan/visits/up');
        if (response.ok) {
          const data = await response.json();
          if (data && typeof data.count === 'number' && isMounted) {
            setVisitCount(data.count + 1200); // Offset base count
            return;
          }
        }
      } catch {
        // Network fallback
      }

      if (isMounted) {
        setVisitCount(count);
      }
    }

    fetchVisitorCount();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700 shadow-sm">
      <Eye className="w-3.5 h-3.5 text-indigo-500" />
      <span>累積瀏覽次數：</span>
      <span className="font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
        {visitCount.toLocaleString()}
      </span>
      <TrendingUp className="w-3 h-3 text-emerald-500" />
    </div>
  );
};
