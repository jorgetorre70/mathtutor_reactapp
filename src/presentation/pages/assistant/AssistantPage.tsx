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

export const AssistantPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([]);
    createThreadUseCase().then((id) => {
      setThreadId(id);
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  // return (
  //   <div className="chat-container">
  //     <div className="chat-messages">
  //       <div className="grid grid-cols-12 gap-y-2">
  //         <GptMessage text="Hola, soy MathTutor tu asistente para aprendizaje de matemáticas. ¿Cómo te puedo ayudar?" />

  //         {messages.map((message) =>
  //           message.isGpt ? (
  //             <GptMessage key={message.id} text={message.text} />
  //           ) : (
  //             <MyMessage key={message.id} text={message.text} />
  //           )
  //         )}

  //         {isLoading && (
  //           <div className="col-start-1 col-end-12 fade-in">
  //             <TypingLoader />
  //           </div>
  //         )}
  //         <div ref={messagesEndRef} />
  //       </div>
  //     </div>
  //     <TextMessageBox
  //       onSendMessage={handlePostMessage}
  //       placeholder="Escribe aquí tu pregunta"
  //       disabledCorrections
  //     />
  //   </div>
  // );
  return (
    <div className="flex flex-col h-screen bg-gray-600">
      {/* Main container with responsive padding */}
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Chat container with responsive height */}
        <div className="flex-1 flex flex-col min-h-0 py-4">
          {/* Messages container with responsive scrolling */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-4 max-w-3xl mx-auto">
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
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input container with fixed positioning on mobile */}
        <div className="sticky bottom-0 bg-gray-600 border-t border-gray-600 py-4">
          <div className="max-w-3xl mx-auto">
            <TextMessageBox
              onSendMessage={handlePostMessage}
              placeholder="Escribe aquí tu pregunta"
              disabledCorrections
            />
          </div>
        </div>
      </div>
    </div>
  );
};
