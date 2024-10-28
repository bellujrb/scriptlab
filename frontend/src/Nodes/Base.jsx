import * as colors from "@contactlab/ds-tokens/constants/colors";
import {
  CloseOutlined,
} from "@ant-design/icons";

import "./Style.scss";

const getColor = (type) => {
  switch (type) {
    case "source":
      return colors.success;
    case "invoce":
      return colors.accent;
    case "centerprice":
      return colors.accent;
    case "centerpricepayment":
      return colors.warning;
    case "erp":
      return colors.base;
    default:
      return colors.base;
  }
};

const getIconSrc = (type) => {
  const iconSrc = "/public/icon-1.png";

  switch (type) {
    case "source":
    case "invoce":
    case "centerprice":
    case "centerpricepayment":
    case "end":
      return (
        <div 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            width: "48px", 
            height: "48px", 
            borderRadius: "12px", 
            backgroundColor: "#E4E9F0" 
          }}
        >
          <img src={iconSrc} alt={`${type} Node Icon`} className="NodeIcon" style={{ width: "32px", height: "32px" }} />
        </div>
      );
    default:
      return (
        <div 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            width: "48px", 
            height: "48px", 
            borderRadius: "12px", 
            backgroundColor: "#E4E9F0" 
          }}
        >
          <img src={iconSrc} alt="Default Node Icon" className="NodeIcon" style={{ width: "32px", height: "32px" }} />
        </div>
      );
  }
};

const getUrlForType = (type) => {
  switch (type) {
    case "source":
      return "/bloco1";
    case "invoce":
      return "/email-page";
    case "centerprice":
      return "/sms-page";
    case "centerpricepayment":
      return "/wait-page";
    case "end":
      return "/end-page";
    default:
      return "/";
  }
};

// Atualize o onNodeClick para redirecionar para a URL correspondente
const handleNodeClick = (type, data) => {
  const url = getUrlForType(type);
  window.location.href = url;
};

export const BaseNode = ({
  type,
  data,
  selected,
  disabled,
  onCloseIconClick,
  additionalClassName,
}) => {
  const content = (
    <>
      {getIconSrc(type)}
      <div className="NodeContent">
        <div className="NodeTitle">{data.title}</div>
        <p className="NodeDesc">{data.description}</p>
      </div>
    </>
  );

  return (
    <div
      data-selected={selected}
      aria-disabled={disabled}
      className={`NodeInnerWrapper ${additionalClassName}`}
      style={{
        color: getColor(type),
        borderRadius: "12px",
        backgroundColor: "#F6F9FC",
        padding: "10px",
        border: "1px solid #E4E9F0",
        display: "flex",
        alignItems: "center",
      }}
      onClick={() => handleNodeClick(type, data)}
    >
      {content}
      <CloseOutlined
        className="closeIcon"
        onClick={(e) => {
          e.stopPropagation();
          onCloseIconClick();
        }}
        style={{ color: "#4A90E2" }}
      />
    </div>
  );
};

export const EmptyBaseNode = () => {
  return <div className="EmptyNodeInnerWrapper"></div>;
};
