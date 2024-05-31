import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodesPanel from './Components/NodesPanel';
import SettingsPanel from './Components/SettingsPanels';
import TextNode from './Components/TextNode';

const nodeTypes = {
  textNode: TextNode,
};

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const handleSave = () => {
    const invalidNodes = nodes.filter(node => !node.targetPosition);
    if (invalidNodes.length > 1) {
      alert('Error: More than one node with empty target handles');
    } else {
      // Save logic
      console.log('Flow saved:', nodes, edges);
    }
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = event.target.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');

    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: `node_${Date.now()}`,
      type,
      position,
      data: { text: 'New Node' },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  return (
    <div className="app">
      <NodesPanel setNodes={setNodes} />
      <div className="flow" onDrop={onDrop} onDragOver={onDragOver}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      {selectedNode && (
        <SettingsPanel node={selectedNode} setNodes={setNodes} setSelectedNode={setSelectedNode} />
      )}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default App;
