"use client";

import React, { useState } from 'react';
import { Send, Loader2, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const Chatbot: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError("Vui lòng nhập yêu cầu");
      return;
    }

    setIsLoading(true);
    setError(null);

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('http://localhost:8080/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: input }),
      });

      if (!res.ok) {
        throw new Error('Không thể kết nối tới máy chủ');
      }

      const data = await res.json();
      const botMessage: Message = { role: 'bot', content: data.answer || 'Không có phản hồi' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error instanceof Error ? error.message : 'Đã xảy ra lỗi');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 rounded-full p-4 z-50"
          variant="default"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] flex flex-col p-0">
        <SheetHeader className="px-4 py-2 border-b">
          <SheetTitle>Chatbot Tìm Việc Làm</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-grow p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-2 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Nhập yêu cầu của bạn (ví dụ: Tìm việc làm lập trình viên)..."
            className="min-h-[80px] mb-2"
            disabled={isLoading}
          />
          {error && (
            <p className="text-red-500 text-sm mb-2">{error}</p>
          )}
          <Button 
            onClick={handleSubmit}
            disabled={isLoading || !input.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang tìm kiếm...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Gửi Yêu Cầu
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Chatbot;