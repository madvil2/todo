import React from "react";
import classNames from "classname";
import { connect } from "react-redux";
import { removeList } from "../../redux/actions/todos";
import Badge from "../Badge";

import "./Sidebar.scss";

const Sidebar = ({ items, isRemovable, onClick, colors, removeList }) => {
  const handleOnClick = ({ target }) => {
    removeList({ id: target.dataset["id"] });
  };
  window.colors = colors;
  window.items = items;
  return (
    <ul onClick={onClick} className="sidebar">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.active })}
        >
          <div>
            <i>
              {item.icon ? (
                item.icon
              ) : (
                <Badge
                  color={
                    colors.filter((val) => val.id === item.colorId)[0].name
                  }
                />
              )}
            </i>
            <span>{item.name}</span>
          </div>
          {isRemovable && (
            <div
              className="sidebar__remove-icon"
              data-id={item.id}
              onClick={handleOnClick}
            >
              <img
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-512.png"
                data-id={item.id}
                width="14"
                height="14"
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default connect(
  (state) => ({
    colors: state.todos.colors,
  }),
  { removeList }
)(Sidebar);
