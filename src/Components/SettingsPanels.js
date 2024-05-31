import React, { useEffect, useState } from 'react';

const SettingsPanel = ({ node, setNodes, setSelectedNode }) => {
  const [text, setText] = useState(node.data.text);

  useEffect(() => {
    setText(node.data.text);
  }, [node]);

  const handleChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    setNodes((nds) =>
      nds.map((n) => (n.id === node.id ? { ...n, data: { ...n.data, text: newText } } : n))
    );
    setSelectedNode((n) => ({ ...n, data: { ...n.data, text: newText } }));
  };

  return (
    <div className="settings-panel">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Enter text"
      />
    </div>
  );
};

export default SettingsPanel;
