import WebsitePreview from '../WebsitePreview';
import ScoreCard from '../ScoreCard';
import { Zap, Search, Layout, Lock } from 'lucide-react';

export function ReportSummaryCards({
  data,
  url,
  hostname,
}: {
  data: any;
  url: string;
  hostname: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <WebsitePreview url={url} hostname={hostname} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
        <ScoreCard
          title="Performance"
          score={data.performance}
          icon={Zap}
          colorClass="text-emerald-500"
        />
        <ScoreCard title="SEO" score={data.seo} icon={Search} colorClass="text-blue-500" />
        <ScoreCard
          title="Accessibility"
          score={data.accessibility}
          icon={Layout}
          colorClass="text-purple-500"
        />
        <ScoreCard
          title="Security"
          score={data.bestPractices}
          icon={Lock}
          colorClass="text-indigo-500"
        />
      </div>
    </div>
  );
}
