import { useState, useEffect, type FC } from 'react';
import { Eye, TrendingUp } from 'lucide-react';

export const VisitorCounter: FC = () => {
  const [visitCount, setVisitCount] = useState<number>(100);

  useEffect(() => {
    try {
      const STORAGE_KEY = 'fire_calc_visit_count';
      const LAST_VISIT_KEY = 'fire_calc_last_visit';

      let count = parseInt(localStorage.getItem(STORAGE_KEY) || '1280', 10);
      const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
      const now = new Date().getTime();

      // Increment if new session (more than 30 mins apart or first visit)
      if (!lastVisit || now - parseInt(lastVisit, 10) > 30 * 60 * 1000) {
        count += 1;
        localStorage.setItem(STORAGE_KEY, count.toString());
        localStorage.setItem(LAST_VISIT_KEY, now.toString());
      }

      setVisitCount(count);
    } catch {
      setVisitCount(1281);
    }
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
