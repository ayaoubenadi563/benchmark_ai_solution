import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeWithHighlights({ code, language = "javascript", highlightLines = [] }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      wrapLines={true}
      showLineNumbers={true}
      lineProps={(lineNumber) => {
        const style = highlightLines.includes(lineNumber)
          ? { display: "block", backgroundColor: "#ffecec" }  // rouge clair
          : { display: "block" };
        return { style };
      }}
      customStyle={{ borderRadius: "12px", maxHeight: "40vh", overflowY: "auto" }}
    >
      {code}
    </SyntaxHighlighter>
  );
}

export default CodeWithHighlights;
