import React, { useEffect } from "react";
import classNames from "classnames";
import { connect, useDispatch } from "react-redux";
import Badge from "../Badge";
import { useHistory } from "react-router-dom";
import ic from "../../assets/icon-close.png";
import { editList, fetchRemoveList } from "../../redux/actions/lists.js";

import "./Sidebar.scss";
import { fetchAddTask } from "../../redux/actions/tasks";

const Sidebar = ({
  items,
  isRemovable,
  onClick,
  colors,
  activeGroup,
  changeActiveGroup,
  preloading,
}) => {
  const dispatch = useDispatch();
  const handleOnClick = ({ target }) => {
    dispatch(fetchRemoveList({ id: target.dataset["id"] }));
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
  }, [changeActiveGroup, history.location.pathname, items]);
  return (
    <>
      {preloading.loading ? (
        <div className="flex-loader">
          <div className="loader" />
        </div>
      ) : (
        <ul onClick={onClick} className="sidebar">
          {Array.isArray(items) &&
            !!items.length &&
            items.map((item, index) => (
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
                          colors.filter((val) => val.id === item.colorId)[0]
                            .name
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
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return { colors: state.todos.colors, preloading: state.fetchLists };
};

const mapDispatchToProps = {
  dispatchAddTask: fetchAddTask,
  dispatchSetList: editList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
