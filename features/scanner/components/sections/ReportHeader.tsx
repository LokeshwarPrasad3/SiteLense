import { Globe, Download, Loader2, ExternalLink, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientHeading } from '@/components/ui/dashboard-elements';
import { motion } from 'framer-motion';

interface ReportHeaderProps {
  hostname: string;
  url: string;
  onExport: () => void;
  isGenerating: boolean;
  onScanOther: () => void;
}

export function ReportHeader({
  hostname,
  url,
  onExport,
  isGenerating,
  onScanOther,
}: ReportHeaderProps) {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-1.5 backdrop-blur-md"
      >
        <Globe className="size-4 text-indigo-600" />
        <span className="text-sm font-bold text-indigo-600">{hostname}</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-indigo-400 hover:text-indigo-600"
        >
          <ExternalLink className="size-3" />
        </a>
      </motion.div>

      <GradientHeading className="mt-6 text-5xl md:text-6xl">Analysis Results</GradientHeading>
      <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-gray-500">
        Complete performance audit and optimization report for your digital asset.
      </p>

      {/* Download PDF Button */}
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row" data-pdf-ignore="true">
        <Button
          onClick={onScanOther}
          variant="outline"
          className="h-12 rounded-2xl border-gray-200 px-8 text-sm font-bold text-gray-700 transition-all duration-300 hover:scale-[1.02] hover:bg-gray-50"
        >
          <span className="relative flex items-center gap-2.5">
            <RotateCcw className="size-4 transition-transform duration-300 group-hover/button:-rotate-45" />
            Scan Other Website
          </span>
        </Button>
        <Button
          onClick={onExport}
          disabled={isGenerating}
          className="group relative h-12 overflow-hidden rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 px-8 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="relative flex items-center gap-2.5">
            {isGenerating ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Generating PDF…
              </>
            ) : (
              <>
                <Download className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                Download PDF Report
              </>
            )}
          </span>
        </Button>
      </div>
    </div>
  );
}
