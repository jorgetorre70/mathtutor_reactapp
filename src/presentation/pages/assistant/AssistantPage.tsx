// import { useEffect, useState } from "react";
// import {
//   TypingLoader,
//   TextMessageBox,
//   GptMessage,
//   MyMessage,
// } from "../../components";
// import {
//   createThreadUseCase,
//   postQuestionUseCase,
// } from "../../../core/use-cases";

// interface Message {
//   text: string;
//   isGpt: boolean;
// }

// export const AssistantPage = () => {
//   const [isLoading, setisLoading] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [threadId, setthreadId] = useState<string>();

//   useEffect(() => {
//     // Clear messages and remove threadId from localStorage on component mount
//     setMessages([]);
//     localStorage.removeItem("threadId");

//     createThreadUseCase().then((id) => {
//       setthreadId(id);
//       localStorage.setItem("threadId", id);
//     });
//   }, []);
//   // useEffect(() => {
//   //   const threadId = localStorage.getItem("threadId");
//   //   if (threadId) {
//   //     setthreadId(threadId);
//   //   } else {
//   //     createThreadUseCase().then((id) => {
//   //       setthreadId(id);
//   //       localStorage.setItem("threadId", id);
//   //     });
//   //   }
//   // }, []);

//   const handlePostMessage = async (text: string) => {
//     if (!threadId) return;
//     setisLoading(true);
//     setMessages((prev) => [...prev, { text, isGpt: false }]);
//     const replies = await postQuestionUseCase(threadId, text);
//     setisLoading(false);

//     for (const reply of replies) {
//       for (const message of reply.content) {
//         setMessages((prev) => [
//           ...prev,
//           { text: message, isGpt: reply.role === "assistant", info: reply },
//         ]);
//       }
//     }
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-messages">
//         <div className="grid grid-cols-12 gap-y-2">
//           {/* Bienvenida */}

//           <GptMessage text="Hola, soy MathTutor tu asistente para aprendizaje de matemáticas. ¿Cómo te puedo ayudar?" />

//           {messages.map((message, index) => {
//             if (message.isGpt) {
//               return <GptMessage key={index} text={message.text} />;
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
//         disabledCorrections
//       />
//     </div>
//   );
// };

// import { useEffect, useState, useCallback, useRef } from "react";
// import {
//   TypingLoader,
//   TextMessageBox,
//   GptMessage,
//   MyMessage,
// } from "../../components";
// import {
//   createThreadUseCase,
//   postQuestionUseCase,
// } from "../../../core/use-cases";
// import { InlineMath } from "react-katex";
// import "katex/dist/katex.min.css";

// interface Message {
//   text: string;
//   isGpt: boolean;
//   id: string;
// }

// export const AssistantPage = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [threadId, setThreadId] = useState<string>();
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setMessages([]);
//     localStorage.removeItem("threadId");

//     createThreadUseCase().then((id) => {
//       setThreadId(id);
//       localStorage.setItem("threadId", id);
//     });
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const addMessage = useCallback((text: string, isGpt: boolean) => {
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text, isGpt, id: `${Date.now()}-${Math.random()}` },
//     ]);
//   }, []);

//   const handlePostMessage = useCallback(
//     async (text: string) => {
//       if (!threadId) return;
//       setIsLoading(true);
//       addMessage(text, false);

//       try {
//         const replies = await postQuestionUseCase(threadId, text);
//         setIsLoading(false);
//         setMessages([]);

//         for (const reply of replies) {
//           for (const message of reply.content) {
//             addMessage(message, reply.role === "assistant");
//           }
//         }
//       } catch (error) {
//         console.error("Error posting message:", error);
//         setIsLoading(false);
//         addMessage("Sorry, there was an error processing your request.", true);
//       }
//     },
//     [threadId, addMessage]
//   );

//   const renderMessage = (text: string): React.ReactNode => {
//     const parts = text.split(/(\$.*?\$)/);
//     return parts.map((part, index) => {
//       if (part.startsWith('$') && part.endsWith('$')) {
//         return <InlineMath key={index}>{part.slice(1, -1)}</InlineMath>;
//       }
//       return <span key={index}>{part}</span>;
//     });
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-messages">
//         <div className="grid grid-cols-12 gap-y-2">
//           <GptMessage text="Hola, soy MathTutor tu asistente para aprendizaje de matemáticas. ¿Cómo te puedo ayudar?" />

//           {messages.map((message) =>
//             message.isGpt ? (
//               <GptMessage key={message.id} text={renderMessage(message.text)} />
//             ) : (
//               <MyMessage key={message.id} text={message.text} />
//             )
//           )}

//           {isLoading && (
//             <div className="col-start-1 col-end-12 fade-in">
//               <TypingLoader />
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
//       </div>
//       <TextMessageBox
//         onSendMessage={handlePostMessage}
//         placeholder="Escribe aquí tu pregunta"
//         disabledCorrections
//       />
//     </div>
//   );
// };

// import React, { useEffect, useState, useCallback, useRef } from "react";
// import {
//   TypingLoader,
//   TextMessageBox,
//   GptMessage,
//   MyMessage,
// } from "../../components";
// import {
//   createThreadUseCase,
//   postQuestionUseCase,
// } from "../../../core/use-cases";

// interface Message {
//   text: string;
//   isGpt: boolean;
//   id: string;
// }

// export const AssistantPage: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [threadId, setThreadId] = useState<string>();
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setMessages([]);
//     localStorage.removeItem("threadId");

//     createThreadUseCase().then((id) => {
//       setThreadId(id);
//       localStorage.setItem("threadId", id);
//     });
//   }, []);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const addMessage = useCallback((text: string, isGpt: boolean) => {
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { text, isGpt, id: `${Date.now()}-${Math.random()}` },
//     ]);
//   }, []);

//   const handlePostMessage = useCallback(
//     async (text: string) => {
//       if (!threadId) return;
//       setIsLoading(true);
//       addMessage(text, false);

//       try {
//         const replies = await postQuestionUseCase(threadId, text);
//         setIsLoading(false);
//         setMessages([]);

//         for (const reply of replies) {
//           for (const message of reply.content) {
//             addMessage(message, reply.role === "assistant");
//           }
//         }
//       } catch (error) {
//         console.error("Error posting message:", error);
//         setIsLoading(false);
//         addMessage("Sorry, there was an error processing your request.", true);
//       }
//     },
//     [threadId, addMessage]
//   );

//   return (
//     <div className="chat-container">
//       <div className="chat-messages">
//         <div className="grid grid-cols-12 gap-y-2">
//           <GptMessage text="Hola, soy MathTutor tu asistente para aprendizaje de matemáticas. ¿Cómo te puedo ayudar?" />

//           {messages.map((message) =>
//             message.isGpt ? (
//               <GptMessage key={message.id} text={message.text} />
//             ) : (
//               <MyMessage key={message.id} text={message.text} />
//             )
//           )}

//           {isLoading && (
//             <div className="col-start-1 col-end-12 fade-in">
//               <TypingLoader />
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
//       </div>
//       <TextMessageBox
//         onSendMessage={handlePostMessage}
//         placeholder="Escribe aquí tu pregunta"
//         disabledCorrections
//       />
//     </div>
//   );
// };

// New version removing threadId from localStorage
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

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola, soy MathTutor tu asistente para aprendizaje de matemáticas. ¿Cómo te puedo ayudar?" />

          {messages.map((message) =>
            message.isGpt ? (
              <GptMessage key={message.id} text={message.text} />
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
