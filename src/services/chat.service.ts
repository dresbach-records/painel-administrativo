
import { api } from './api';

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isAdmin: boolean;
}

export interface ChatRoom {
  id: string;
  company: string;
  messages: ChatMessage[];
  status: 'online' | 'waiting' | 'closed';
  unreadCount: number;
}

/**
 * Secondary Chat Service (Operational)
 * Pure API Client - No side effects.
 */
export const chatService = {
  getRooms: () => api.get<ChatRoom[]>('/chat/rooms'),
  getRoomMessages: (roomId: string) => api.get<ChatMessage[]>(`/chat/rooms/${roomId}/messages`),
  sendMessage: (roomId: string, text: string) => api.post(`/chat/rooms/${roomId}/messages`, { text }),
  markAsRead: (roomId: string) => api.post(`/chat/rooms/${roomId}/read`, {}),
};
