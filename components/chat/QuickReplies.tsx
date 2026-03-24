export type QuickReplyItem = {
  id: string;
  label: string;
};

type QuickRepliesProps = {
  items: QuickReplyItem[];
  onSelect: (id: string) => void;
  disabled?: boolean;
};

/**
 * Horizontally wrapping chips for common intents (keyboard-friendly buttons).
 */
export function QuickReplies({ items, onSelect, disabled }: QuickRepliesProps) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 border-t border-gray-200/80 bg-[#f9fafb] px-3 py-2.5">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(item.id)}
          className="rounded-full border border-[#1f2937]/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#111827] shadow-sm transition hover:border-[#d4a017]/50 hover:bg-[#fffbeb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#d4a017] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
