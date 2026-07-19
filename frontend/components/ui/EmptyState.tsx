import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white/5 rounded-2xl border border-white/10">
      <div className="w-16 h-16 mb-4 rounded-full bg-white/5 flex items-center justify-center">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
