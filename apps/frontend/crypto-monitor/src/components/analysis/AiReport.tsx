import ReactMarkdown from "react-markdown";
import { useTheme } from "@/components/theme-provider";

interface Props {
  ai: string;
}

export default function AiReport({ ai }: Props) {
  const { theme } = useTheme();

  return (
    <div className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"} p-6 rounded-lg shadow-md`}>
      <h2 className={`text-xl font-bold mb-6 ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
        AI 분석 리포트
      </h2>
      <div className={`prose prose-sm max-w-none ${theme === "dark" ? "prose-invert" : ""}`}>
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1
                className={`text-2xl font-bold my-4 ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
              >
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2
                className={`text-xl font-bold my-3 ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
              >
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3
                className={`text-lg font-bold my-2 ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
              >
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className={`leading-relaxed my-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                {children}
              </p>
            ),
            ul: ({ children }) => <ul className="list-disc list-inside my-2">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside my-2">{children}</ol>,
            li: ({ children }) => <li className="my-1">{children}</li>,
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-200 pl-4 my-2 italic">{children}</blockquote>
            ),
            code: ({ children }) => (
              <code className="bg-gray-100 rounded px-1 py-0.5 text-sm">{children}</code>
            ),
          }}
        >
          {ai}
        </ReactMarkdown>
      </div>
    </div>
  );
}
