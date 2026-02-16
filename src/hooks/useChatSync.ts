
import { useEffect, useState } from "react";
import { chatService } from "@/services/chat.service";

export function useChatSync(conversationId: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!conversationId) return;

    let active = true;

    async function loadMessages() {
      try {
        setLoading(true);
        const data = await chatService.getRoomMessages(conversationId);
        if (active) setMessages(data);
      } catch (err: any) {
        if (active) setError("Failed to load messages");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadMessages();

    return () => {
      active = false;
    };
  }, [conversationId]);

  return {
    messages,
    loading,
    error,
  };
}
