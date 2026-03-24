type ChatBubbleProps = {
  role: "user" | "bot";
  children: React.ReactNode;
};

/**
 * Chat message bubble — user (right, gold tint) vs assistant (left, dark panel).
 */
export function ChatBubble({ role, children }: ChatBubbleProps) {
  const isUser = role === "user";
  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "rounded-br-md bg-[#d4a017] text-[#111827]"
            : "rounded-bl-md border border-gray-200/80 bg-white text-[#1f2937]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
