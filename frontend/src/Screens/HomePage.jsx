import React, { useEffect, useState } from "react";
import "antd/dist/reset.css";
import "../index.scss";
import Layout from '../Automation.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import AIChat from '../Chat/AIChat.jsx';
import { initialElements } from "../Data/Elements1.jsx";
import { getUpdatedElementsAfterNodeAddition } from "../Utils/WorkflowElementUtils.jsx";
import _ from "lodash";

const HomePage = () => {
    const [elements, setElements] = useState([]);
    const [showElements, setShowElements] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const nodes = initialElements
            .filter((x) => !x.target)
            .map((x) => ({
                ...x,
                data: { ...x.data, onDeleteNodeCallback, onNodeClickCallback },
            }));
        const edges = initialElements
            .filter((x) => x.target)
            .map((x) => ({ ...x, data: { ...x.data, onAddNodeCallback } }));

        setTimeout(() => {
            setElements([...nodes, ...edges]);
        }, 500); 
    }, []);

    useEffect(() => {
        if (elements.length > 0) {
            const allElements = document.querySelectorAll('.react-flow__node, .react-flow__edge');
            allElements.forEach((el, index) => {
                el.classList.add('element-enter');
                setTimeout(() => {
                    el.classList.add('element-enter-active');
                }, index * 100); 
            });
        }
    }, [elements]);

    const onAddNodeCallback = ({ id, type }) => {
        setElements((elements) =>
            getUpdatedElementsAfterNodeAddition({
                elements,
                targetEdgeId: id,
                type,
                onDeleteNodeCallback,
                onNodeClickCallback,
                onAddNodeCallback,
            })
        );
    };

    const onDeleteNodeCallback = (id) => {
        setElements((elements) => {
            const clonedElements = _.cloneDeep(elements);
            const incomingEdges = clonedElements.filter((x) => x.target === id);
            const outgoingEdges = clonedElements.filter((x) => x.source === id);
            const updatedIncomingEdges = incomingEdges.map((x) => ({
                ...x,
                target: outgoingEdges[0].target,
            }));
            const filteredElements = clonedElements.filter(
                (x) =>
                    x.id !== id &&
                    x.target !== incomingEdges[0].target &&
                    x.source !== outgoingEdges[0].source
            );
            filteredElements.push(...updatedIncomingEdges);
            return filteredElements;
        });
    };

    const onNodeClickCallback = (id) => {
        setElements((elements) => {
            const currentNode = elements.find((x) => x.id === id);
            const nodes = elements.filter((x) => x.position);
            const edges = elements.filter((x) => !x.position);
            console.error({
                incomers: getIncomers(currentNode, nodes, edges),
                outgoers: getOutgoers(currentNode, nodes, edges),
            });
            return elements;
        });
        alert(`You clicked the "${id}" node`);
    };

    const handleChatInteraction = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowElements(true);
        }, 5000); 
    };

    return (
        <div className="App">
            {isLoading && (
                <div className="loading-fullscreen">
                    <div className="loading-circle"></div>
                    <div className="loading-bar"></div>
                </div>
            )}
            {showElements && (
                <>
                    <Layout elements={elements} />
                    <Sidebar />
                </>
            )}
            <AIChat onChatInteraction={handleChatInteraction} />
        </div>
    );
};

export default HomePage;
