    import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
    Controls,
    MiniMap,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
} from "reactflow";

import "./Automation.css";

import { nodeTypes } from "./Nodes/index.jsx";
import { edgeTypes } from "./Edges/index.jsx";
import { getLayoutedElements } from "./Utils/WorkflowLayoutUtils.jsx";

export const Automation = (props) => {
    const { elements } = props;
    console.log(props);

    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState();
    const [edges, setEdges, onEdgesChange] = useEdgesState();
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    useEffect(() => {
        const layoutElements = getLayoutedElements(elements);
        const layoutNodes = layoutElements.filter((x) => x.position);
        const layoutEdges = layoutElements.filter((x) => !x.position);
        setNodes(layoutNodes);
        setEdges(layoutEdges);
    }, [elements]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => eds.concat(params)), 
        [setEdges]
    );

    let id = 0;
    const getId = () => `dndnode_${id++}`;

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds =
                reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData("application/reactflow");

            if (typeof type === "undefined" || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, setNodes]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    // =================================>

    return (
        <div className="AutomationCanvas">
            <ReactFlowProvider>
                <div ref={reactFlowWrapper} className="reactflow-wrapper">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodesDraggable={false}
                        nodesConnectable={false}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        onConnect={onConnect}
                        fitView
                        onInit={setReactFlowInstance}
                        onDragOver={onDragOver}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                    >
                        <Controls
                            className="Controls"
                        />
                        <MiniMap />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    );
};

const Layout = (props) => (
    <ReactFlowProvider>
        <Automation {...props} />
    </ReactFlowProvider>
);

export default Layout;
