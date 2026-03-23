import { Lock, ExternalLink, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WebsitePreview({ url, hostname }: { url: string; hostname: string }) {
  return (
    <div className="group/card flex h-[400px] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-indigo-100/40 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-200/50 lg:col-span-1">
      {/* Browser Chrome Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex shrink-0 gap-1.5">
            <div className="size-3 rounded-full bg-red-400" />
            <div className="size-3 rounded-full bg-amber-400" />
            <div className="size-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex shrink items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1 shadow-sm">
            <Lock className="size-3 shrink-0 text-emerald-500" />
            <span className="truncate text-xs font-semibold text-gray-600">{hostname}</span>
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative ml-2 shrink-0 rounded-md border border-gray-200 bg-white p-1.5 text-gray-400 shadow-sm transition-all hover:border-indigo-200 hover:text-indigo-600"
          title="Visit Site"
        >
          <ExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Simulated Preview Area */}
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-linear-to-br from-indigo-50 via-white to-purple-50 p-6">
        {/* Subtle background noise */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        {/* Shimmer/Grid effect using linear gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[14px_24px]"></div>

        <div className="relative z-10 flex w-full max-w-[280px] flex-col items-center rounded-[2rem] border border-white bg-white/60 p-8 text-center shadow-xl shadow-indigo-100/50 backdrop-blur-xl transition-transform duration-500 group-hover/card:scale-[1.02]">
          {/* Favicon Container */}
          <div className="mb-5 flex size-20 items-center justify-center overflow-hidden rounded-2xl border border-gray-100/80 bg-white p-4 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://s2.googleusercontent.com/s2/favicons?domain=${hostname}&sz=128`}
              alt={`${hostname} favicon`}
              className="size-full object-contain drop-shadow-sm"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTRhM2I4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTEyIDJMMiAxMmw1IDV2NUgyMnYtNWw1LTVMMTIgMnoiLz48L3N2Zz4='; // Folder SVG fallback
              }}
            />
          </div>

          <div className="flex w-full flex-col items-center justify-center">
            <h3 className="mb-1 w-full truncate text-lg font-bold text-gray-900">{hostname}</h3>
            <p className="mb-6 text-[11px] font-bold tracking-wider text-gray-400/80 uppercase">
              Preview not available
            </p>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-black hover:shadow-xl active:translate-y-0"
          >
            Visit Website <ExternalLink className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
