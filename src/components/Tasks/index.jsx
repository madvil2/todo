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

const Tasks = (tasks) => {
  window.tasks = tasks;
  console.log(tasks);
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        Frontend
        <EditOutlined className="tasks__edit" />
      </h2>
      <div className="tasks__items">
        <div className="tasks__items-row">
          <div className="checkbox">
            <input id="check" type="checkbox" />
            <label htmlFor="check">
              <CheckOutlined className="mark" />
            </label>
          </div>
          <input value="Learn React! (useState, useReducer, useEffects and more)" />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
