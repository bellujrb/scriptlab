// =================================================================================================
import React from "react";

const Sidebar = ({ onAddNodeCallback }) => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("nodeType", nodeType); 
    };
    return (
        <div className="sidebar">
            <h5>Drag the elements from here!</h5>
            <div
                className="SidebarItem"
                draggable
                onDragStart={(event) => onDragStart(event, "invoce")}
                key="invoce"
            >
                Check Key
            </div>
            <div
                className="SidebarItem"
                draggable
                onDragStart={(event) => onDragStart(event, "centerprice")}
                key="centerprice"
            >
                100 Blocks
            </div>
            <div
                className="SidebarItem"
                draggable
                onDragStart={(event) => onDragStart(event, "centerpricepayment")}
                key="centerpricepayment"
            >
                If/Else
            </div>
            <div
                className="SidebarItem"
                draggable
                onDragStart={(event) => onDragStart(event, "end")}
                key="end"
            >
                End
            </div>
        </div>
    );
};

export default Sidebar;
