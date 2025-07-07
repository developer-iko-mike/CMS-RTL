import React, { useState } from "react";
import "../comments.css";

const TruncatedComment = ({ text, maxLength = 30 }) => {

  if (!text) return null;
  
  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  const truncatedText = text.substring(0, maxLength) + "...";
  
  return (
    <span 
      className="truncated-comment"
      title="مشاهده متن کامل"
    >
      {truncatedText}
    </span>
  );
};

export default TruncatedComment