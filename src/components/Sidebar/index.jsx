import React, { useEffect } from "react";
import classNames from "classname";
import { connect } from "react-redux";
import { removeList } from "../../redux/actions/todos";
import Badge from "../Badge";
import { useHistory } from "react-router-dom";
import ic from "../../assets/icon-close.png";

import "./Sidebar.scss";

const Sidebar = ({
  items,
  isRemovable,
  onClick,
  colors,
  removeList,
  activeGroup,
  changeActiveGroup,
}) => {
  const handleOnClick = ({ target }) => {
    removeList({ id: target.dataset["id"] });
  };

  let history = useHistory();
  useEffect(() => {
    const listId = history.location.pathname.split("/todo/types/")[1];
    if (items) {
      const list = items.find((list) => list.id === listId);
      if (list) {
        changeActiveGroup({
          id: list.id,
          color: list.colorId,
        });
      }
    }
  }, [history.location.pathname]);
  return (
    <ul onClick={onClick} className="sidebar">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, {
            active: activeGroup.id === item.id,
          })}
          onClick={() => {
            changeActiveGroup({
              id: item.id,
              color: item.colorId,
            });
            history.push(`/todo/types/${item.id}`);
          }}
        >
          <div>
            <div className="colors">
              {item.icon ? (
                item.icon
              ) : (
                <Badge
                  color={
                    colors.filter((val) => val.id === item.colorId)[0].name
                  }
                />
              )}
            </div>
            <span>{item.name}</span>
          </div>
          {isRemovable && (
            <div
              className="sidebar__remove-icon"
              data-id={item.id}
              onClick={handleOnClick}
            >
              <img
                alt="remove button"
                src={ic}
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
