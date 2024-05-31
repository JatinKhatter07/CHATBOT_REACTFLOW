import React from 'react';
import { Handle } from 'reactflow';

const TextNode = ({ data }) => {
  return (
    <div className="text-node">
      {data.text}
      <Handle type="source" position="right" />
      <Handle type="target" position="left" />
    </div>
  );
};

export default TextNode;
