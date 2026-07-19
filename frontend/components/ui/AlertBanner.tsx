import { AlertTriangle, X } from "lucide-react";

export function AlertBanner({ title, description, onClose }: { title: string; description: string; onClose?: () => void }) {
  return (
    <div className="flex items-start p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20">
      <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
      <div className="ml-3 flex-1">
        <h3 className="text-sm font-medium text-red-400">{title}</h3>
        <p className="text-sm text-red-400/80 mt-1">{description}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="ml-4 text-red-400/60 hover:text-red-400 transition-colors">
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
