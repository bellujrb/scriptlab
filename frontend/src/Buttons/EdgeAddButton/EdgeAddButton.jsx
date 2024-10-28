import "./EdgeAddButton.scss";


const EdgeAddButton = (props) => {
    const { style, data, id } = props;

    const dropzone = (
        <div
            className="node-dropzone"
            onDrop={(event) =>
                data.onAddNodeCallback({
                    id,
                    type: event.dataTransfer.getData("nodeType"),
                })
            }
        >
            {" "}
            +
        </div>
    );
    return (
        <div className="EdgeAddButton" style={style}>
            {dropzone}
        </div>
    );
};

export default EdgeAddButton;
