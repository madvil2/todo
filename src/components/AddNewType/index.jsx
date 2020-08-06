import React, { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Button, message } from "antd";
import "antd/dist/antd.css";
import { v4 as uuidv4 } from "uuid";

import { Badge, Sidebar } from "../";

import { addList } from "../../redux/actions/todos";
import { connect } from "react-redux";
import useOutsideClick from "../../utils/clickOutside";

import "./AddNewType.scss";

const AddNewType = ({ colors, addList }) => {
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

  const error = () => {
    message.error("Fill name");
  };

  const AddNew = (e) => {
    e.preventDefault();
    if (!inputValue) {
      error();
      return;
    }
    window.colors = colors;
    const color = colors.filter((c) => c.id === selectedColor)[0].id;
    addList({
      id: uuidv4(),
      name: inputValue,
      colorId: color,
    });
    onClose();
  };

  return (
    <div className="add-new_button">
      <div
        className="sidebar__add-button"
        onClick={() => setVisiblePopup(true)}
      >
        <div>
          <i>
            <PlusOutlined />
          </i>
          <span>Add New Type</span>
        </div>
      </div>
      {visiblePopup && (
        <form className="add-new__popup" ref={ref} onSubmit={AddNew}>
          <Input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Enter name"
          />
          <div className="add-new__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => selectColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"}
              />
            ))}
          </div>
          <Button onClick={AddNew} type="primary">
            Add new
          </Button>
        </form>
      )}
    </div>
  );
};

export default connect((state) => ({}), { addList })(AddNewType);
