import MetricCard from '../MetricCard';
import OpportunityCard from '../OpportunityCard';
import { Timer, Gauge, Activity, Layout, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '@/components/ui/dashboard-elements';
import { Button } from '@/components/ui/button';

export function ReportDetails({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
      {/* Left: Key Metrics */}
      <div className="lg:col-span-2">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900 underline decoration-indigo-500/30 decoration-4 underline-offset-8">
            Key Metrics
          </h2>
          <div className="text-xs font-bold text-gray-400">VITALS</div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <MetricCard label="LCP" value={data.metrics.lcp} icon={Timer} />
          <MetricCard label="FCP" value={data.metrics.fcp} icon={Gauge} />
          <MetricCard label="TBT" value={data.metrics.tbt} icon={Activity} />
          <MetricCard label="CLS" value={data.metrics.cls} icon={Layout} />
        </div>

        <GlassCard className="mt-6 bg-indigo-600 p-6 text-white dark:bg-indigo-700">
          <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-white/20">
            <ArrowUpRight className="size-6" />
          </div>
          <h3 className="text-xl font-bold">Improve Your Score</h3>
          <p className="mt-2 text-sm leading-relaxed text-indigo-100 opacity-90">
            Based on our analysis, implementing the suggested changes could improve your LCP by up
            to 1.4s.
          </p>
          <Button
            variant="ghost"
            className="mt-4 h-9 border border-white/30 text-xs font-bold transition-colors hover:bg-white hover:text-indigo-600"
          >
            VIEW FULL RECOMMENDATIONS
          </Button>
        </GlassCard>
      </div>

      {/* Right: Opportunities */}
      <div className="lg:col-span-3">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-black text-gray-900 underline decoration-purple-500/30 decoration-4 underline-offset-8">
            Optimization Opportunities
          </h2>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
            <Clock className="size-3" /> SAVING TIME
          </div>
        </div>
        {data.opportunities.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {data.opportunities.map((opp: any, index: number) => (
              <OpportunityCard
                key={index}
                title={opp.title}
                description={opp.description}
                displayValue={opp.displayValue}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-48 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50/30">
            <CheckCircle2 className="mb-2 size-8 text-emerald-500" />
            <p className="font-bold text-gray-400">Great job! No major opportunities found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
