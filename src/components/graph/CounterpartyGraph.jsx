import React, { useState } from 'react';
import { ReactFlow, Controls, Background, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { counterpartyNodes, counterpartyEdges } from '../../data/counterparties';

export default function CounterpartyGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(counterpartyNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(counterpartyEdges);
  const [selectedNodeData, setSelectedNodeData] = useState(null);

  const onNodeClick = (event, node) => {
    if (node.data && node.data.details) {
      setSelectedNodeData({ name: node.data.label, details: node.data.details });
    } else {
      setSelectedNodeData(null);
    }
  };

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
        attributionPosition="bottom-right"
      >
        <Background color="#DCE7E4" gap={16} />
        <Controls />
      </ReactFlow>

      {selectedNodeData && (
        <div className="absolute top-4 right-4 w-72 bg-white border border-border shadow-lg rounded-xl p-4 z-10">
          <button 
            className="absolute top-3 right-3 text-textMuted hover:text-textPrimary"
            onClick={() => setSelectedNodeData(null)}
          >
            ×
          </button>
          <h3 className="font-bold text-sm mb-3 pr-4">{selectedNodeData.name}</h3>
          <div className="text-sm text-textSecondary whitespace-pre-line leading-relaxed">
            {selectedNodeData.details}
          </div>
        </div>
      )}
    </div>
  );
}
