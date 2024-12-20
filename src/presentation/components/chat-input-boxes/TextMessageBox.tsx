import { FormEvent, useState } from "react";

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabledCorrections?: boolean;
  messages?: any[]; // prop to watch for new messages
}

export const TextMessageBox = ({
  onSendMessage,
  placeholder,
  disabledCorrections = false,
}: //messages = [], //added prop to watch for new messages
Props) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length === 0) return;
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-4">
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 sm:gap-4 py-2 sm:py-3"
      >
        {/* Input Container */}
        <div className="flex-1 min-w-0">
          <input
            type="text"
            autoFocus
            name="message"
            className="w-full px-3 py-2 sm:py-2.5 text-base text-white
                     bg-gray-800 
                     border border-gray-700 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     transition-colors duration-200
                     placeholder:text-gray-400"
            placeholder={placeholder}
            autoComplete={disabledCorrections ? "on" : "off"}
            autoCorrect={disabledCorrections ? "on" : "off"}
            spellCheck={disabledCorrections ? true : false}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          className="inline-flex items-center justify-center
                   px-4 py-2 sm:px-6 sm:py-2.5
                   text-sm sm:text-base font-medium
                   text-white bg-indigo-600 rounded-lg
                   hover:bg-indigo-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                   transition-colors duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed
                   whitespace-nowrap"
          disabled={!message.trim()}
        >
          <span className="hidden sm:inline mr-2">Enviar</span>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};
