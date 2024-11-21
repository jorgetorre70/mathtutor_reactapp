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
