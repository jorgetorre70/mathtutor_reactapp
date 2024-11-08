// import Markdown from "react-markdown";
// import { GiMegabot } from "react-icons/gi";
// import { IconContext } from "react-icons";

// interface Props {
//   text: string;
// }

// export const GptMessage = ({ text }: Props) => {
//   return (
//     <div className="col-start-1 col-end-9 p-3 rounded-lg">
//       <div className="flex flex-row items-start">
//         <IconContext.Provider
//           value={{
//             color: "#3E9FBD",
//             size: "4em",
//           }}
//         >
//           <div>
//             <GiMegabot />
//           </div>
//         </IconContext.Provider>
//         {/* <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
//           G
//         </div> */}
//         <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
//           <Markdown>{text}</Markdown>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from "react";
import Markdown from "react-markdown";
import { GiMegabot } from "react-icons/gi";
import { IconContext } from "react-icons";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface Props {
  text: string | React.ReactNode;
}

export const GptMessage: React.FC<Props> = ({ text }) => {
  const renderLatex = (content: React.ReactNode): React.ReactNode => {
    if (typeof content !== "string") {
      return content;
    }

    const parts = content.split(
      /(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/
    );

    if (parts.length > 1) {
      return parts.map((part, index) => {
        if (part.startsWith("\\[") && part.endsWith("\\]")) {
          return <BlockMath key={index}>{part.slice(2, -2)}</BlockMath>;
        } else if (part.startsWith("\\(") && part.endsWith("\\)")) {
          return <InlineMath key={index}>{part.slice(2, -2)}</InlineMath>;
        } else if (part.startsWith("$$") && part.endsWith("$$")) {
          return <BlockMath key={index}>{part.slice(2, -2)}</BlockMath>;
        } else if (part.startsWith("$") && part.endsWith("$")) {
          return <InlineMath key={index}>{part.slice(1, -1)}</InlineMath>;
        }
        return part;
      });
    } else {
      const fallbackParts = content.split(/(\[[\s\S]*?\]|\([\s\S]*?\))/);
      return fallbackParts.map((part, index) => {
        if (part.startsWith("[") && part.endsWith("]")) {
          return <BlockMath key={index}>{part.slice(1, -1)}</BlockMath>;
        } else if (part.startsWith("(") && part.endsWith(")")) {
          return <InlineMath key={index}>{part.slice(1, -1)}</InlineMath>;
        }
        return part;
      });
    }
  };

  // return (
  //   <div className="col-start-1 col-end-9 p-3 rounded-lg">
  //     <div className="flex flex-row items-start">
  //       <IconContext.Provider value={{ color: "#3E9FBD", size: "4em" }}>
  //         <div>
  //           <GiMegabot />
  //         </div>
  //       </IconContext.Provider>
  //       <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
  //         {typeof text === "string" ? (
  //           <Markdown
  //             components={{
  //               p: ({ children }) => <p>{renderLatex(children)}</p>,
  //               span: ({ children }) => <span>{renderLatex(children)}</span>,
  //               strong: ({ children }) => (
  //                 <strong>{renderLatex(children)}</strong>
  //               ),
  //               em: ({ children }) => <em>{renderLatex(children)}</em>,
  //             }}
  //           >
  //             {text}
  //           </Markdown>
  //         ) : (
  //           renderLatex(text)
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex items-start space-x-3 sm:space-x-4">
        {/* Bot Icon - Responsive sizing */}
        <div className="flex-shrink-0">
          <IconContext.Provider
            value={{
              color: "#3E9FBD",
              size: "2.5em",
              className: "sm:w-12 sm:h-12 w-8 h-8",
            }}
          >
            <GiMegabot />
          </IconContext.Provider>
        </div>

        {/* Message Content - Responsive width and padding */}
        <div className="flex-1 min-w-0 max-w-[85%] sm:max-w-[75%]">
          <div className="relative bg-black bg-opacity-25 rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-sm">
            <div className="text-sm sm:text-base prose prose-invert max-w-none">
              {typeof text === "string" ? (
                <Markdown
                  components={{
                    p: ({ children }) => (
                      <p className="mb-2 last:mb-0">{renderLatex(children)}</p>
                    ),
                    span: ({ children }) => (
                      <span className="inline-block">
                        {renderLatex(children)}
                      </span>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold">
                        {renderLatex(children)}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{renderLatex(children)}</em>
                    ),
                    // Handle code blocks and inline code
                    code: ({ children }) => (
                      <code className="bg-black bg-opacity-50 px-1 py-0.5 rounded text-sm">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-black bg-opacity-50 p-3 rounded-lg overflow-x-auto my-2 text-sm">
                        {children}
                      </pre>
                    ),
                    // Handle lists
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside my-2 space-y-1">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside my-2 space-y-1">
                        {children}
                      </ol>
                    ),
                    // Handle links
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        className="text-blue-400 hover:text-blue-300 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {text}
                </Markdown>
              ) : (
                renderLatex(text)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// import React, { useEffect, useState } from "react";
// import Markdown from "react-markdown";
// import { GiMegabot } from "react-icons/gi";
// import { IconContext } from "react-icons";
// import { InlineMath, BlockMath } from "react-katex";
// import "katex/dist/katex.min.css";

// interface Props {
//   text: string | React.ReactNode;
// }

// export const GptMessage: React.FC<Props> = ({ text }) => {
//   const [debugInfo, setDebugInfo] = useState<string>("");

//   useEffect(() => {
//     if (typeof text === "string") {
//       setDebugInfo(`Received text: ${text}`);
//     }
//   }, [text]);

//   const renderLatex = (content: React.ReactNode): React.ReactNode => {
//     if (typeof content !== "string") {
//       return content;
//     }

//     console.log("Content before processing:", content);

//     // First, try to match equations with backslashes
//     const parts = content.split(
//       /(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/
//     );

//     if (parts.length > 1) {
//       return parts.map((part, index) => {
//         console.log(`Part ${index}:`, part);

//         if (part.startsWith("\\[") && part.endsWith("\\]")) {
//           return <BlockMath key={index}>{part.slice(2, -2)}</BlockMath>;
//         } else if (part.startsWith("\\(") && part.endsWith("\\)")) {
//           return <InlineMath key={index}>{part.slice(2, -2)}</InlineMath>;
//         } else if (part.startsWith("$$") && part.endsWith("$$")) {
//           return <BlockMath key={index}>{part.slice(2, -2)}</BlockMath>;
//         } else if (part.startsWith("$") && part.endsWith("$")) {
//           return <InlineMath key={index}>{part.slice(1, -1)}</InlineMath>;
//         }
//         return part;
//       });
//     } else {
//       // If no equations with backslashes are found, try matching without backslashes
//       const fallbackParts = content.split(/(\[[\s\S]*?\]|\([\s\S]*?\))/);
//       return fallbackParts.map((part, index) => {
//         console.log(`Fallback Part ${index}:`, part);

//         if (part.startsWith("[") && part.endsWith("]")) {
//           return <BlockMath key={index}>{part.slice(1, -1)}</BlockMath>;
//         } else if (part.startsWith("(") && part.endsWith(")")) {
//           return <InlineMath key={index}>{part.slice(1, -1)}</InlineMath>;
//         }
//         return part;
//       });
//     }
//   };

//   return (
//     <div className="col-start-1 col-end-9 p-3 rounded-lg">
//       <div className="flex flex-row items-start">
//         <IconContext.Provider value={{ color: "#3E9FBD", size: "4em" }}>
//           <div>
//             <GiMegabot />
//           </div>
//         </IconContext.Provider>
//         <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
//           {typeof text === "string" ? (
//             <Markdown
//               components={{
//                 p: ({ children }) => <p>{renderLatex(children)}</p>,
//                 span: ({ children }) => <span>{renderLatex(children)}</span>,
//                 strong: ({ children }) => (
//                   <strong>{renderLatex(children)}</strong>
//                 ),
//                 em: ({ children }) => <em>{renderLatex(children)}</em>,
//               }}
//             >
//               {text}
//             </Markdown>
//           ) : (
//             renderLatex(text)
//           )}
//         </div>
//       </div>
//       {debugInfo && (
//         <div className="mt-2 text-xs text-gray-500">
//           <pre>{debugInfo}</pre>
//         </div>
//       )}
//     </div>
//   );
// };
