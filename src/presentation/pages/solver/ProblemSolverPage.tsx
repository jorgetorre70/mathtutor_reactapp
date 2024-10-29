import { useState } from "react";
import {
  GptMessage,
  GptproblemsolverMessage,
  MyMessage,
  //TextMessageBox,
  TextMessageBoxFile,
  TypingLoader,
} from "../../components";
import { problemsolverUseCase } from "../../../core/use-cases/problemsolver.use-case";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    message: string;
  };
}

export const ProblemSolverPage = () => {
  const [isLoading, setisLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePostMessage = async (text: string) => {
    setisLoading(true);
    setMessages((prev) => [...prev, { text, isGpt: false }]);

    try {
      const result = await problemsolverUseCase(text);

      if ("ok" in result && result.ok === false) {
        setMessages((prev) => [
          ...prev,
          {
            text: "Lo siento, no pude procesar tu pregunta. Por favor, intenta de nuevo.",
            isGpt: true,
          },
        ]);
      } else {
        const { message } = result;
        setMessages((prev) => [
          ...prev,
          {
            text: message,
            isGpt: true,
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
        },
      ]);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Hola, soy MathTutor tu asistente para aprendizaje de matemáticas. ¿Te puedo ayudar?" />

          {messages.map((message, index) => {
            if (message.isGpt) {
              return <GptproblemsolverMessage key={index} {...message.info!} />;
            } else {
              return <MyMessage key={index} text={message.text} />;
            }
          })}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>
      <TextMessageBoxFile
        onSendMessage={handlePostMessage}
        placeholder="Escribe aquí tu pregunta"
      />
    </div>
  );
};
