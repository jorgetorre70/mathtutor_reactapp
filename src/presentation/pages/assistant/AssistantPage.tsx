import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  TypingLoader,
  TextMessageBox,
  GptMessage,
  MyMessage,
} from "../../components";
import {
  createThreadUseCase,
  postQuestionUseCase,
} from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  id: string;
}

export const AssistantPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([]);
    createThreadUseCase().then((id) => {
      setThreadId(id);
    });
  }, []);

  const scrollToBottom = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Scroll when messages change

  const addMessage = useCallback((text: string, isGpt: boolean) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { text, isGpt, id: `${Date.now()}-${Math.random()}` },
    ]);
  }, []);

  const handlePostMessage = useCallback(
    async (text: string) => {
      if (!threadId) return;
      setIsLoading(true);
      addMessage(text, false);

      try {
        const replies = await postQuestionUseCase(threadId, text);
        setIsLoading(false);
        setMessages([]);

        for (const reply of replies) {
          for (const message of reply.content) {
            addMessage(message, reply.role === "assistant");
          }
        }
      } catch (error) {
        console.error("Error posting message:", error);
        setIsLoading(false);
        addMessage("Sorry, there was an error processing your request.", true);
      }
    },
    [threadId, addMessage]
  );
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Main container with responsive padding */}
      <div className="flex-1 overflow-y-auto">
        {/* Chat container with responsive height */}
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          {/* Messages container with responsive scrolling */}
          <div className="py-4">
            <div className="max-w-3xl mx-auto space-y-4">
              <GptMessage text="Hola, soy MathTutor tu asistente para aprendizaje de matemáticas. ¿Cómo te puedo ayudar?" />
              {messages.map((message) =>
                message.isGpt ? (
                  <GptMessage key={message.id} text={message.text} />
                ) : (
                  <MyMessage key={message.id} text={message.text} />
                )
              )}
              {isLoading && (
                <div className="fade-in">
                  <TypingLoader />
                </div>
              )}
              {children}
              <div ref={containerRef} /> {/* Scroll anchor */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <TextMessageBox
            onSendMessage={handlePostMessage}
            placeholder="Escribe aquí tu pregunta"
            disabledCorrections
          />
        </div>
      </div>
    </div>
  );
};
