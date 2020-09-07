import React, { useEffect } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import Badge from "../Badge";
import { useHistory } from "react-router-dom";
import icon from "../../assets/icon-close.png";
import { fetchRemoveList } from "../../redux/actions/lists.js";
import path from "../../utils/paths.js";
import styles from "./Sidebar.module.scss";
import loader from "../../index.module.scss";
import { reverse } from "named-urls/src";

const Sidebar = ({
  items,
  isRemovable,
  onClick,
  colors,
  activeGroup,
  changeActiveGroup,
  preloading,
  dispatchFetchRemoveList,
}) => {
  const handleOnClick = ({ target }) => {
    dispatchFetchRemoveList({ id: target.dataset["id"] });
  };

  let history = useHistory();

  useEffect(() => {
    const listId = history.location.pathname.split(path.todoTypes)[1];

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
        <div className={loader.flex_loader}>
          <div className={loader.loader} />
        </div>
      ) : (
        <ul onClick={onClick} className={styles.sidebar}>
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
                  history.push(reverse(path.todoTypesId, { id: item.id }));
                }}
              >
                <div>
                  <div className={styles.colors}>
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
                    data-id={item.id}
                    className={styles.sidebar__remove_icon}
                    onClick={handleOnClick}
                  >
                    <img
                      alt="remove button"
                      src={icon}
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

const mapStateToProps = (state) => ({
  colors: state.todos.colors,
  preloading: state.fetchLists,
});

const mapDispatchToProps = {
  dispatchFetchRemoveList: fetchRemoveList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
