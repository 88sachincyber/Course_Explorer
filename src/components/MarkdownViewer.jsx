import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownViewer = ({ content }) => {
  return (
    <div className="prose prose-blue max-w-none bg-white p-6 rounded-lg shadow border overflow-hidden">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          // Fix code blocks overflow
          code: ({ inline, className, children, ...props }) => {
            return inline ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <code 
                className={`${className} block overflow-x-auto whitespace-pre-wrap break-words`} 
                {...props}
              >
                {children}
              </code>
            );
          },
          // Fix pre blocks overflow
          pre: ({ children }) => (
            <pre className="overflow-x-auto whitespace-pre-wrap break-words bg-gray-100 p-4 rounded">
              {children}
            </pre>
          ),
          // Fix long URLs and text
          p: ({ children }) => (
            <p className="break-words overflow-wrap-anywhere">
              {children}
            </p>
          ),
          // Fix links
          a: ({ children, href }) => (
            <a 
              href={href} 
              className="break-all text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;