"use client";

import { useChat } from "@/hooks/useChat";
import MessageBubble from "./MessageBubble";
import LoadingPulse from "./LoadingPulse";

export default function ChatBox() {
  const { messages, input, setInput, send, loading } = useChat();

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-[#05010f] shadow-[0_0_80px_-15px_rgba(139,92,246,0.6)]">

      {/* Neon animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.25),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.25),transparent_40%)] animate-pulseSlow" />

      {/* Animated border glow */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />

      {/* Messages */}
      <div className="relative z-10 flex-1 space-y-5 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} />
        ))}
        {loading && <LoadingPulse />}
      </div>

      {/* Input Area */}
      <div className="relative z-10 bg-black/50 backdrop-blur-2xl p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex items-center gap-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type something magical…"
            className="flex-1 rounded-2xl bg-[#0b061a] px-5 py-4 text-sm text-white placeholder-white/40 outline-none ring-1 ring-purple-500/30 transition focus:ring-2 focus:ring-fuchsia-500 shadow-inner"
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 px-6 py-4 text-sm font-semibold text-white shadow-[0_0_25px_rgba(168,85,247,0.8)] transition hover:scale-110 active:scale-95 disabled:opacity-50"
          >
            <span className="relative z-10">Send</span>
            <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition" />
          </button>
        </form>
      </div>
    </div>
  );
}
