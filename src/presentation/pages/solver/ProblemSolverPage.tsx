// import { useState } from "react";
// import {
//   GptMessage,
//   GptproblemsolverMessage,
//   MyMessage,
//   TextMessageBox,
//   //TextMessageBoxFile,
//   TypingLoader,
// } from "../../components";
// import { problemsolverUseCase } from "../../../core/use-cases/problemsolver.use-case";

// interface Message {
//   text: string;
//   isGpt: boolean;
//   info?: {
//     message: string;
//   };
// }

// export const ProblemSolverPage = () => {
//   const [isLoading, setisLoading] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);

//   const handlePostMessage = async (text: string) => {
//     setisLoading(true);
//     setMessages((prev) => [...prev, { text, isGpt: false }]);

//     try {
//       const result = await problemsolverUseCase(text);

//       if ("ok" in result && result.ok === false) {
//         setMessages((prev) => [
//           ...prev,
//           {
//             text: "Lo siento, no pude procesar tu pregunta. Por favor, intenta de nuevo.",
//             isGpt: true,
//           },
//         ]);
//       } else {
//         const { message } = result;
//         setMessages((prev) => [
//           ...prev,
//           {
//             text: message,
//             isGpt: true,
//             info: {
//               message,
//             },
//           },
//         ]);
//       }
//     } catch (error) {
//       console.error("Error in problemsolverUseCase:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           text: "Ocurrió un error al procesar tu pregunta. Por favor, intenta de nuevo más tarde.",
//           isGpt: true,
//         },
//       ]);
//     } finally {
//       setisLoading(false);
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-messages">
//         <div className="grid grid-cols-12 gap-y-2">
//           <GptMessage text="Hola, soy MathTutor tu asistente para aprendizaje de matemáticas. ¿Te puedo ayudar?" />

//           {messages.map((message, index) => {
//             if (message.isGpt) {
//               return <GptproblemsolverMessage key={index} {...message.info!} />;
//             } else {
//               return <MyMessage key={index} text={message.text} />;
//             }
//           })}

//           {isLoading && (
//             <div className="col-start-1 col-end-12 fade-in">
//               <TypingLoader />
//             </div>
//           )}
//         </div>
//       </div>
//       <TextMessageBox
//         onSendMessage={handlePostMessage}
//         placeholder="Escribe aquí tu pregunta"
//       />
//     </div>
//   );
// };
import React, { useEffect, useState, useRef } from "react";
import {
  GptMessage,
  GptproblemsolverMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import { problemsolverUseCase } from "../../../core/use-cases/problemsolver.use-case";
import { createThreadUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  id: string;
  info?: {
    message: string;
  };
}

export const ProblemSolverPage: React.FC = () => {
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

  const handlePostMessage = async (text: string) => {
    if (!threadId) return;
    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      { text, isGpt: false, id: `${Date.now()}-${Math.random()}` },
    ]);

    try {
      const result = await problemsolverUseCase(text);

      if ("ok" in result && result.ok === false) {
        setMessages([]);
        setMessages((prev) => [
          ...prev,
          {
            text: "Lo siento, no pude procesar tu pregunta. Por favor, intenta de nuevo.",
            isGpt: true,
            id: `${Date.now()}-${Math.random()}`,
          },
        ]);
      } else {
        const { message } = result;
        setMessages([]);
        setMessages((prev) => [
          ...prev,
          {
            text: message,
            isGpt: true,
            id: `${Date.now()}-${Math.random()}`,
            info: {
              message,
            },
          },
        ]);
      }
    } catch (error) {
      console.error("Error in problemsolverUseCase:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Ocurrió un error al procesar tu pregunta. Por favor, intenta de nuevo más tarde.",
          isGpt: true,
          id: `${Date.now()}-${Math.random()}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola, soy MathTutor tu asistente para aprendizaje de matemáticas. ¿Te puedo ayudar?" />

          {messages.map((message) =>
            message.isGpt ? (
              <GptproblemsolverMessage key={message.id} {...message.info!} />
            ) : (
              <MyMessage key={message.id} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <TextMessageBox
        onSendMessage={handlePostMessage}
        placeholder="Escribe aquí tu pregunta"
        disabledCorrections
      />
    </div>
  );
};
