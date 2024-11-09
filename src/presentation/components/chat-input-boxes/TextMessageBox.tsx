import { FormEvent, useState } from "react";

interface Props {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabledCorrections?: boolean;
}

export const TextMessageBox = ({
  onSendMessage,
  placeholder,
  disabledCorrections = false,
}: Props) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.trim().length === 0) return;
    onSendMessage(message);
    setMessage("");
  };
  // return (
  //   <form
  //     onSubmit={handleSendMessage}
  //     className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
  //   >
  //     <div className="flex-grow flex-shrink-0">
  //       <div className="relative w-full">
  //         <input
  //           type="text"
  //           autoFocus
  //           name="message"
  //           className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
  //           placeholder={placeholder}
  //           autoComplete={disabledCorrections ? "on" : "off"}
  //           autoCorrect={disabledCorrections ? "on" : "off"}
  //           spellCheck={disabledCorrections ? true : false}
  //           value={message}
  //           onChange={(event) => setMessage(event.target.value)}
  //         />
  //       </div>
  //     </div>

  //     <div className="ml-4">
  //       <button className="btn-primary">
  //         <span className="mr-2"> Enviar</span>
  //         <i className="fa-regular fa-paper-plane"></i>
  //       </button>
  //     </div>
  //   </form>
  // );
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 sm:gap-4 bg-white rounded-xl shadow-lg 
                 p-2 sm:p-3 border border-gray-200 fixed bottom-0 left-0 right-0 
                 sm:relative sm:bottom-auto sm:left-auto sm:right-auto
                 bg-opacity-95 backdrop-blur-sm"
      >
        {/* Input Container */}
        <div className="flex-1 min-w-0">
          <input
            type="text"
            autoFocus
            name="message"
            className="w-full px-3 py-2 sm:py-2.5 text-sm sm:text-base
                     border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     transition-colors duration-200
                     placeholder:text-gray-400"
            placeholder={placeholder}
            autoComplete={disabledCorrections ? "on" : "off"}
            autoCorrect={disabledCorrections ? "on" : "off"}
            spellCheck={disabledCorrections ? true : false}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            style={{ marginBottom: "env(safe-area-inset-bottom)" }}
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
