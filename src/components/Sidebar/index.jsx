import React from "react";
import classNames from "classname";
import { CloseOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import Badge from "../Badge";

import "./Sidebar.scss";

const Sidebar = ({ items, isRemovable, onClick, onRemove, lists, colors }) => {
  const removeList = (item) => {
    if (window.confirm("Are u sure?")) {
      onRemove(item);
    }
  };
  return (
    <ul onClick={onClick} className="sidebar">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.active })}
        >
          <i>
            {item.icon ? (
              item.icon
            ) : (
              <Badge
                color={
                  colors.filter((val) =>
                    val.id === item.colorId ? val.name : null
                  )[0].name
                }
              />
            )}
          </i>
          <span>{item.name}</span>
          {isRemovable && (
            <CloseOutlined
              className="sidebar__remove-icon"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default connect((state) => ({
  colors: state.todos.colors,
}))(Sidebar);
