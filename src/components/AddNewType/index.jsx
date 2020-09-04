import React, { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
import "antd/dist/antd.css";
import { fetchAddList } from "../../redux/actions/lists.js";
import { Badge } from "../";

import { connect, useDispatch } from "react-redux";
import useOutsideClick from "../../utils/clickOutside";
import showError from "../../utils/showError";

import "./AddNewType.module.scss";
import styles from "./AddNewType.module.scss";
import badgeStyles from "../Badge/Badge.module.scss";
import classNames from "classnames";

const AddNewType = ({ colors }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState("");

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue("");
    selectColor(colors[0].id);
  };

  const ref = useRef(null);
  useOutsideClick(ref, onClose);
  const dispatch = useDispatch();

  const AddNew = (e) => {
    e.preventDefault();
    if (!inputValue) {
      showError("Fill name");
      return;
    }
    const color = colors.filter((c) => c.id === selectedColor)[0].id;
    dispatch(fetchAddList(inputValue, color));
    onClose();
  };

  return (
    <div>
      <div
        data-click="clickOutside"
        className={styles.sidebar__add_button}
        onClick={() => setVisiblePopup(true)}
      >
        <div>
          <div className={styles.close}>
            <PlusOutlined />
          </div>
          <span data-click="clickOutside">Add New Type</span>
        </div>
      </div>
      {visiblePopup && (
        <form className={styles.add_new__popup} ref={ref} onSubmit={AddNew}>
          <Input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Enter name"
          />
          <div className={styles.add_new__popup_colors}>
            {colors.map((color) => (
              <Badge
                onClick={() => selectColor(color.id)}
                key={color.id}
                color={color.name}
                className={classNames(styles.badge, {
                  [styles.badge_active]: selectedColor === color.id,
                })}
              />
            ))}
          </div>
          <button
            className={styles.add_new__button}
            onClick={AddNew}
            type="primary"
          >
            Add new
          </button>
        </form>
      )}
    </div>
  );
};

export default AddNewType;
