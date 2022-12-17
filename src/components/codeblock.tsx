import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { CodeComponent } from 'react-markdown/lib/ast-to-react'

const CodeBlock: CodeComponent = ({ inline, className, children }) => {
  const match = /language-(\w+)/.exec(className || '');
  return !inline && match ? (
    <SyntaxHighlighter
      style={dark}
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