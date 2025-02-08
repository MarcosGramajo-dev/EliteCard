import React from "react";
import DOMPurify from "dompurify";

export function PreviewCard({ code }) {
  const cleanCode = DOMPurify.sanitize(code);

  return (
    <div className="bg-white p-0 m-0">
        <div dangerouslySetInnerHTML={{ __html: cleanCode }} />
    </div>
  );
}

export default PreviewCard;
