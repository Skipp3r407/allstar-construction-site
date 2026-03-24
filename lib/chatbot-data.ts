/**
 * Re-exports for consumers that expect `lib/chatbot-data.ts`.
 * Source of truth for FAQ rows: `chatbot-knowledge.ts`.
 */
export { chatbotFaqs } from "./chatbot-knowledge";
export type { ChatbotFaq, ChatbotFaqCategory } from "./chatbot-types";
export { CHATBOT_COMPANY, CHATBOT_CITIES, CHATBOT_SERVICES, LEAD_STORAGE_KEY } from "./chatbot-types";
