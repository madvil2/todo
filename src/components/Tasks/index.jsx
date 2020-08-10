import React, { useState } from "react";
import "./Tasks.scss";
import { Input, DatePicker, Space } from "antd";
import { addTask, setList } from "../../redux/actions/todos";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import classNames from "classnames";
import moment from "moment";
import showError from "../../utils/showError";

const Tasks = ({
  todos,
  activeGroup,
  lists,
  dispatchAddTask,
  colors,
  dispatchSetList,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [dateValue, setDateValue] = useState("");

  const onEditTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });
    dispatchSetList(newList);
  };

  const editTitle = () => {
    const newTitle = window.prompt("Enter new list name", title);
    if (newTitle) {
      onEditTitle(activeGroup.id, newTitle);
    }
  };

  const reset = () => {
    setInputValue("");
    setDateValue("");
  };

  const AddNew = (e) => {
    e.preventDefault();
    if (!inputValue) {
      showError("Fill title");
      return;
    }
    dispatchAddTask({
      listId: activeGroup.id,
      text: inputValue,
      status: false,
      date: dateValue,
    });
    reset();
  };

  let title;
  for (let item of lists) {
    if (item.id === activeGroup.id) {
      title = item.name;
      break;
    }
  }
  let color = colors.filter((val) => val.id === activeGroup.color);
  if (color.length > 0) {
    color = color[0].name;
  } else {
    color = "default";
  }

  return (
    <div className="tasks">
      <h2
        className={classNames("tasks__title", {
          [`tasks__title--${color}`]: color,
        })}
      >
        {activeGroup.id === 1 ? "All types" : title}
        {activeGroup.id === 1 ? (
          ""
        ) : (
          <EditOutlined onClick={editTitle} className="tasks__edit" />
        )}
      </h2>
      <div className="tasks__add-items">
        <Input
          className="tasks__add-items__add-input"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Enter task title"
        />
        <Space className="tasks__add-items__picker">
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            onChange={(value) => setDateValue(value)}
            size="large"
            value={dateValue}
          />
        </Space>
        <button
          className="tasks__add-items__sbutton"
          onClick={AddNew}
          type="primary"
        >
          Add new
        </button>
      </div>
      <ul className="tasks__list">
        {!!todos.tasks.length &&
          todos.tasks.map((item, index) => {
            if (activeGroup.id === item.listId || activeGroup.id === 1) {
              return (
                <li key={index} className="tasks__items">
                  <div className="tasks__items-row">
                    <div className="checkbox">
                      <input id={`task-${index}`} type="checkbox" />
                      <label htmlFor={`task-${index}`}>
                        <CheckOutlined className="mark" />
                      </label>
                    </div>
                    <input readOnly value={item.text} />
                  </div>
                </li>
              );
            } else return null;
          })}
      </ul>
    </div>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  dispatchAddTask: addTask,
  dispatchSetList: setList,
};

export default connect((state) => ({}), mapDispatchToProps)(Tasks);
