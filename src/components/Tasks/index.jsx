import React from "react";
import "./Tasks.scss";
import {
  List,
  Card,
  Checkbox,
  DatePicker,
  TimePicker,
  Select,
  Space,
} from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

const Tasks = ({ todos }) => {
  window.todos = todos;
  console.log(todos);
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {todos.lists[0].name}
        <EditOutlined className="tasks__edit" />
      </h2>
      {todos.tasks.map((task) => {
        return (
          <div className="tasks__items">
            <div className="tasks__items-row">
              <div className="checkbox">
                <input id={`task-${task.id}`} type="checkbox" />
                <label htmlFor={`task-${task.id}`}>
                  <CheckOutlined className="mark" />
                </label>
              </div>
              <input value={task.text} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Tasks;
