import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CodeComponent } from 'react-markdown/lib/ast-to-react'

const CodeBlock: CodeComponent = ({ inline, className, children }) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <SyntaxHighlighter
      style={oneLight}
      language={match[1]}
      children={String(children).replace(/\n$/, '')}
    />
  ) : (
    <code className={className}>
      {children}
    </code>
  )
};

export default CodeBlock;