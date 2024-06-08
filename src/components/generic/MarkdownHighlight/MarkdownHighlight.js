import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// Style options
// https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_STYLES_PRISM.MD
import { vscDarkPlus as CodeStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';



const CodeBlock = ({className, children}) => {
  let lang = 'text'; // default monospaced text
  if (className && className.startsWith('lang-')) {
    lang = className.replace('lang-', '');
  }
  return (
    <SyntaxHighlighter language={lang} style={CodeStyle}>
      {children}
    </SyntaxHighlighter>
  );
}

// markdown-to-jsx uses <pre><code/></pre> for code blocks.
const PreBlock = ({children, ...rest}) => {
  if ('type' in children && children ['type'] === 'code') {
    return CodeBlock(children['props']);
  }
  return <pre {...rest}>{children}</pre>;
};

export default PreBlock