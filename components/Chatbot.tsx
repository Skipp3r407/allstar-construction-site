"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { LeadForm, type LeadPayload } from "@/components/chat/LeadForm";
import type { QuickReplyItem } from "@/components/chat/QuickReplies";
import { QuickReplies } from "@/components/chat/QuickReplies";
import { chatbotFaqs } from "@/lib/chatbot-knowledge";
import { FALLBACK_REPLY, findBestFaq, wantsLeadCapture } from "@/lib/chatbot-match";
import { CHATBOT_COMPANY, CHATBOT_SERVICES, LEAD_STORAGE_KEY } from "@/lib/chatbot-types";

const OPENING_MESSAGE = `Hi! I'm the ${CHATBOT_COMPANY.name} assistant. I can help with services, service areas, common project questions, and quote requests — answers come from our on-site knowledge base (not a generic AI).`;

const SERVICES_OVERVIEW = `We specialize in outdoor construction across ${CHATBOT_COMPANY.area}: concrete footings, slabs & sidewalks, pavers, masonry, pergolas, fire pits, decks, fences, and retaining walls. Tap a topic below or ask in your own words.`;

const AREAS_OVERVIEW = `We serve homeowners throughout ${CHATBOT_COMPANY.area}, including Orlando, Kissimmee, Sanford, Winter Park, Altamonte Springs, Clermont, Oviedo, Apopka, Lakeland, Davenport, and nearby communities. Not sure? Mention your city in a message or call ${CHATBOT_COMPANY.phoneDisplay}.`;

const PRICING_REPLY = `Pricing depends on project size, materials, site conditions, and scope — we don't publish one-size-fits-all numbers here. Request a free quote or call ${CHATBOT_COMPANY.phoneDisplay} and we'll review your property and goals.`;

const TIMELINE_REPLY = `Timelines vary by project size, materials, and weather. After we understand your scope, we'll share a realistic schedule. The fastest way to get specifics is a quote request or a call to ${CHATBOT_COMPANY.phoneDisplay}.`;

const MAIN_QUICK_REPLIES: QuickReplyItem[] = [
  { id: "get-quote", label: "Get a Quote" },
  { id: "services", label: "Services" },
  { id: "areas", label: "Areas We Serve" },
  { id: "pricing", label: "Pricing Questions" },
  { id: "timeline", label: "Project Timeline" },
  { id: "call", label: "Call Now" },
  { id: "form", label: "Use quick form" },
];

const SERVICE_TOPIC_REPLIES: QuickReplyItem[] = [
  { id: "topic-pavers", label: "Pavers" },
  { id: "topic-pergolas", label: "Pergolas" },
  { id: "topic-fire", label: "Fire Pits" },
  { id: "topic-decks", label: "Decks" },
  { id: "topic-fences", label: "Fences" },
  { id: "topic-walls", label: "Retaining Walls" },
  { id: "topic-concrete", label: "Concrete / Slabs" },
];

const FALLBACK_QUICK: QuickReplyItem[] = [
  { id: "get-quote", label: "Request a Free Quote" },
  { id: "call", label: `Call ${CHATBOT_COMPANY.phoneDisplay}` },
  { id: "contact-page", label: "Contact Us" },
];

const LEAD_LABELS = ["name", "phone", "email", "service", "city", "details"] as const;
type LeadField = (typeof LEAD_LABELS)[number];

const LEAD_PROMPTS: Record<LeadField, string> = {
  name: "Great! What's your full name?",
  phone: "Thanks. What's the best phone number to reach you?",
  email: "Got it. What's your email address?",
  service: "Which service are you most interested in? (You can pick from the buttons or type your own.)",
  city: "What city is the project in?",
  details: "Last step: briefly describe your project (goals, approximate size, anything we should know).",
};

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function isValidPhone(s: string) {
  return s.replace(/\D/g, "").length >= 10;
}

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
}

type Msg = { id: string; role: "user" | "bot"; text: string };

type LeadSession = { step: number; data: Partial<Record<LeadField, string>> };

export function Chatbot() {
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [quickItems, setQuickItems] = useState<QuickReplyItem[]>(MAIN_QUICK_REPLIES);
  const [leadMode, setLeadMode] = useState(false);
  const leadRef = useRef<LeadSession | null>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [welcomed, setWelcomed] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing, showLeadForm]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    if (welcomed) return;
    queueMicrotask(() => {
      setWelcomed(true);
      setMessages([{ id: uid(), role: "bot", text: OPENING_MESSAGE }]);
      setQuickItems(MAIN_QUICK_REPLIES);
    });
  }, [open, welcomed]);

  const pushBot = useCallback((text: string, delayMs = 420) => {
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: uid(), role: "bot", text }]);
      setTyping(false);
    }, delayMs);
  }, []);

  const pushUser = useCallback((text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { id: uid(), role: "user", text: t }]);
  }, []);

  const finishLead = useCallback(
    (data: Partial<Record<LeadField, string>>, source: LeadPayload["source"]) => {
      const payload: LeadPayload = {
        name: data.name ?? "",
        phone: data.phone ?? "",
        email: data.email ?? "",
        service: data.service ?? "",
        city: data.city ?? "",
        details: data.details ?? "",
        source,
        createdAt: new Date().toISOString(),
      };
      try {
        sessionStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(payload));
      } catch {
        /* ignore */
      }
      leadRef.current = null;
      setLeadMode(false);
      setQuickItems(MAIN_QUICK_REPLIES);
      pushBot(
        `Thanks — I've captured your project details. The ${CHATBOT_COMPANY.name} team can review your request and follow up about your estimate. You can also call ${CHATBOT_COMPANY.phoneDisplay} to speak with someone directly. Open the Contact page if you'd like to add photos — your info may pre-fill when available.`,
        500
      );
    },
    [pushBot]
  );

  const startLeadFlow = useCallback(() => {
    setShowLeadForm(false);
    leadRef.current = { step: 0, data: {} };
    setLeadMode(true);
    setQuickItems([]);
    pushBot("Let's get a few details for the team. " + LEAD_PROMPTS.name, 380);
  }, [pushBot]);

  const handleLeadMessage = useCallback(
    (text: string) => {
      const session = leadRef.current;
      if (!session) return;

      const field = LEAD_LABELS[session.step];
      if (!field) return;

      if (field === "phone" && !isValidPhone(text)) {
        pushBot("Please enter a valid phone number with area code (at least 10 digits).", 350);
        return;
      }
      if (field === "email" && !isValidEmail(text)) {
        pushBot("That email doesn't look quite right — please try again (example: name@email.com).", 350);
        return;
      }

      const data = { ...session.data, [field]: text.trim() };
      const nextStep = session.step + 1;

      if (nextStep >= LEAD_LABELS.length) {
        finishLead(data, "chatbot-chat");
        return;
      }

      leadRef.current = { step: nextStep, data };
      const nextField = LEAD_LABELS[nextStep];
      if (nextField === "service") {
        setQuickItems(
          CHATBOT_SERVICES.map((s) => ({
            id: `pick-service-${s}`,
            label: s,
          }))
        );
      } else {
        setQuickItems([]);
      }
      pushBot(LEAD_PROMPTS[nextField], 400);
    },
    [finishLead, pushBot]
  );

  const answerUserMessage = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text) return;

      if (showLeadForm) return;

      if (leadMode && leadRef.current) {
        handleLeadMessage(text);
        return;
      }

      if (wantsLeadCapture(text)) {
        startLeadFlow();
        return;
      }

      const faq = findBestFaq(text, chatbotFaqs);
      if (faq) {
        pushBot(faq.answer);
        setQuickItems(MAIN_QUICK_REPLIES);
        return;
      }

      pushBot(FALLBACK_REPLY);
      setQuickItems(FALLBACK_QUICK);
    },
    [leadMode, showLeadForm, handleLeadMessage, startLeadFlow, pushBot]
  );

  const handleSend = () => {
    const t = input.trim();
    if (!t || typing) return;
    pushUser(t);
    setInput("");
    answerUserMessage(t);
  };

  const handleQuickSelect = (id: string) => {
    if (typing) return;

    if (id.startsWith("pick-service-")) {
      const svc = id.replace("pick-service-", "");
      pushUser(svc);
      handleLeadMessage(svc);
      return;
    }

    switch (id) {
      case "get-quote":
        pushUser("I'd like a quote");
        startLeadFlow();
        break;
      case "services":
        pushUser("Services");
        pushBot(SERVICES_OVERVIEW);
        setQuickItems(SERVICE_TOPIC_REPLIES);
        break;
      case "areas":
        pushUser("Areas you serve");
        pushBot(AREAS_OVERVIEW);
        setQuickItems(MAIN_QUICK_REPLIES);
        break;
      case "pricing":
        pushUser("Pricing");
        pushBot(PRICING_REPLY);
        setQuickItems(MAIN_QUICK_REPLIES);
        break;
      case "timeline":
        pushUser("Timeline");
        pushBot(TIMELINE_REPLY);
        setQuickItems(MAIN_QUICK_REPLIES);
        break;
      case "call":
        pushUser("Call");
        pushBot(
          `The fastest way to reach us is to call ${CHATBOT_COMPANY.phoneDisplay}. We're happy to talk through your project.`,
          300
        );
        setQuickItems(MAIN_QUICK_REPLIES);
        break;
      case "contact-page":
        pushUser("Contact page");
        pushBot(
          "You can open the full Contact page from the site menu or the link below the message box to send photos and detailed notes.",
          300
        );
        setQuickItems(MAIN_QUICK_REPLIES);
        break;
      case "form":
        pushUser("Quick form");
        setShowLeadForm(true);
        setLeadMode(false);
        leadRef.current = null;
        setQuickItems([]);
        pushBot("Fill out the short form below — or tap “Back to chat” anytime.", 250);
        break;
      case "topic-pavers":
        pushUser("Pavers");
        answerUserMessage("Do you install paver patios?");
        break;
      case "topic-pergolas":
        pushUser("Pergolas");
        answerUserMessage("Do you build pergolas?");
        break;
      case "topic-fire":
        pushUser("Fire pits");
        answerUserMessage("Do you build backyard fire pits?");
        break;
      case "topic-decks":
        pushUser("Decks");
        answerUserMessage("Do you build decks?");
        break;
      case "topic-fences":
        pushUser("Fences");
        answerUserMessage("Do you install privacy fences?");
        break;
      case "topic-walls":
        pushUser("Retaining walls");
        answerUserMessage("Do you build retaining walls?");
        break;
      case "topic-concrete":
        pushUser("Concrete");
        answerUserMessage("Do you pour concrete slabs?");
        break;
      default:
        break;
    }
  };

  const leadFormDone = (payload: LeadPayload) => {
    setShowLeadForm(false);
    setMessages((m) => [...m, { id: uid(), role: "user", text: "[Submitted quick form]" }]);
    finishLead(
      {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        service: payload.service,
        city: payload.city,
        details: payload.details,
      },
      "chatbot-form"
    );
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col items-end sm:bottom-6 sm:right-6">
      <div
        id={panelId}
        role="dialog"
        aria-label="Chat with All-Star Custom Construction"
        aria-hidden={!open}
        className={`pointer-events-auto mb-3 flex max-h-[min(560px,72vh)] w-[min(100vw-2rem,380px)] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-gray-200/90 bg-[#fafafa] shadow-[0_12px_40px_-8px_rgba(17,24,39,0.35),0_0_0_1px_rgba(212,160,23,0.12)] transition-all duration-200 ease-out motion-reduce:transition-none ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-gray-200/90 bg-gradient-to-r from-[#111827] to-[#1f2937] px-3 py-2.5 text-white">
          <div>
            <p className="text-sm font-bold tracking-tight">All-Star Assistant</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#d4a017]">
              FAQ & quote help
            </p>
          </div>
          <a
            href={CHATBOT_COMPANY.phoneLink}
            className="hidden text-xs font-semibold text-[#d4a017] underline-offset-2 hover:underline sm:inline"
          >
            {CHATBOT_COMPANY.phoneDisplay}
          </a>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-1.5 text-white/90 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a017]"
            aria-label="Close chat"
          >
            <span className="text-lg leading-none">×</span>
          </button>
        </div>

        <div
          ref={listRef}
          className="flex min-h-[220px] flex-1 flex-col gap-2.5 overflow-y-auto px-3 py-3"
        >
          {messages.map((m) => (
            <ChatBubble key={m.id} role={m.role}>
              {m.role === "bot" && m.text.includes(CHATBOT_COMPANY.phoneDisplay) ? (
                <span>
                  {m.text.split(CHATBOT_COMPANY.phoneDisplay).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 ? (
                        <a
                          href={CHATBOT_COMPANY.phoneLink}
                          className="font-semibold text-[#b45309] underline decoration-[#d4a017] underline-offset-2"
                        >
                          {CHATBOT_COMPANY.phoneDisplay}
                        </a>
                      ) : null}
                    </span>
                  ))}
                </span>
              ) : (
                m.text
              )}
            </ChatBubble>
          ))}
          {typing ? (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md border border-gray-200 bg-white px-3 py-2 text-xs text-[#6b7280] shadow-sm motion-reduce:animate-none">
                <span className="inline-flex gap-1">
                  <span className="animate-pulse motion-reduce:animate-none">●</span>
                  <span className="animate-pulse motion-reduce:animate-none [animation-delay:150ms]">●</span>
                  <span className="animate-pulse motion-reduce:animate-none [animation-delay:300ms]">●</span>
                </span>
              </div>
            </div>
          ) : null}
          {showLeadForm ? (
            <LeadForm
              onSubmitted={leadFormDone}
              onCancel={() => {
                setShowLeadForm(false);
                setQuickItems(MAIN_QUICK_REPLIES);
                pushBot("No problem — ask me anything, or choose a quick reply below.", 200);
              }}
            />
          ) : null}
        </div>

        <QuickReplies items={quickItems} onSelect={handleQuickSelect} disabled={typing} />
        {leadMode && quickItems.length > 0 ? (
          <p className="border-t border-gray-100 px-3 py-1 text-[10px] text-[#6b7280]">
            Or type your answer in the box below.
          </p>
        ) : null}

        <div className="border-t border-gray-200 bg-white p-2">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder={leadMode ? "Type your answer…" : "Ask about your project…"}
              disabled={typing || showLeadForm}
              className="min-w-0 flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#d4a017] focus:ring-2 focus:ring-[#d4a017]/25 disabled:bg-gray-100"
              aria-label="Message"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={typing || !input.trim() || showLeadForm}
              className="shrink-0 rounded-xl bg-[#d4a017] px-3 py-2 text-sm font-semibold text-[#111827] shadow-sm transition hover:bg-[#bf9014] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111827] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-[10px] text-[#6b7280]">
            <Link href="/contact" className="font-semibold text-[#111827] hover:text-[#d4a017]">
              Contact
            </Link>
            <a href={CHATBOT_COMPANY.phoneLink} className="font-semibold text-[#111827] hover:text-[#d4a017]">
              Call
            </a>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close chat assistant" : "Open chat assistant — quotes and FAQs"}
        className="pointer-events-auto flex items-center gap-2 rounded-full border border-[#d4a017]/40 bg-gradient-to-br from-[#111827] to-[#1f2937] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#d4a017]/20 transition hover:scale-[1.02] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a017] motion-reduce:transition-none"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4a017] text-[#111827]" aria-hidden>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0-.83-.83-.83-2.17 0-3l8.5-8.5c.83-.83 2.17-.83 3 0 .83.83.83 2.17 0 3Z" />
            <path d="m17.5 9.5-1.4-1.4" />
            <path d="m22 4-1.4 1.4" />
          </svg>
        </span>
        <span className="hidden pr-1 sm:inline">Need a quote?</span>
        <span className="pr-1 sm:hidden">Chat</span>
      </button>
    </div>
  );
}
