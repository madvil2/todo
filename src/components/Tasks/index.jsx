import React, { useState } from "react";
import "./Tasks.scss";
import { Input, Button, message } from "antd";
import { addTask } from "../../redux/actions/todos";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import classNames from "classnames";

const Tasks = ({ todos, activeGroup, lists, addTask, colors }) => {
  const [inputValue, setInputValue] = useState("");

  const error = () => {
    message.error("Fill title");
  };

  const reset = () => {
    setInputValue("");
  };

  const AddNew = (e) => {
    e.preventDefault();
    if (!inputValue) {
      error();
      return;
    }
    addTask({
      listId: activeGroup,
      text: inputValue,
      status: false,
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
  window.todos = todos;
  console.log(todos);
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
        <EditOutlined className="tasks__edit" />
      </h2>
      <div className="tasks__add-items">
        <Input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Enter task title"
        />
        <Button onClick={AddNew} type="primary">
          Add new
        </Button>
      </div>
      {!!todos.tasks.length &&
        todos.tasks.map((item, index) => {
          if (activeGroup.id === item.listId || activeGroup.id === 1) {
            return (
              <div key={index} className="tasks__items">
                <div className="tasks__items-row">
                  <div className="checkbox">
                    <input id={`task-${item.id}`} type="checkbox" />
                    <label htmlFor={`task-${item.id}`}>
                      <CheckOutlined className="mark" />
                    </label>
                  </div>
                  <input readOnly value={item.text} />
                </div>
              </div>
            );
          } else return null;
        })}
    </div>
  );
};

export default connect((state) => ({}), { addTask })(Tasks);
