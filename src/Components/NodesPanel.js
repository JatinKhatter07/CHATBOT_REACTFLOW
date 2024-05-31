import React from 'react';

const NodesPanel = ({ setNodes }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">Drag and drop nodes to the flow</div>
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, 'textNode')}
        draggable
      >
        Text Node
      </div>
    </aside>
  );
};

export default NodesPanel;
