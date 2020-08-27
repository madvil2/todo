import React, { useEffect, useState } from "react";
import "./TasksBoard.scss";
import { Input, DatePicker, Space } from "antd";
import { editList, fetchGetListGroup } from "../../redux/actions/lists.js";
import { fetchAddTask, fetchGetTaskList } from "../../redux/actions/tasks.js";
import { fetchChangeList } from "../../redux/actions/lists.js";
import { EditOutlined } from "@ant-design/icons";
import { connect, useDispatch } from "react-redux";
import classNames from "classnames";
import moment from "moment";
import showError from "../../utils/showError";
import { Task } from "../";

const TasksBoard = ({
  todos,
  activeGroup,
  lists,
  dispatchAddTask,
  colors,
  user,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchGetTaskList());
      dispatch(fetchGetListGroup());
    }
  }, [dispatch]);

  const onEditTitle = (id, title) => {
    dispatch(fetchChangeList(id, title));
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
      title: inputValue,
      type: activeGroup.id,
      description: "",
      date: dateValue,
      completed: false,
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
          className="tasks__add-items__button"
          onClick={AddNew}
          type="primary"
        >
          Add new
        </button>
      </div>
      <ul className="tasks__list">
        {!!todos.tasks.length &&
          todos.tasks.map((item, index) => {
            if (activeGroup.id === item.type || activeGroup.id === 1) {
              return (
                <Task
                  index={index}
                  task={item}
                  activeGroup={activeGroup}
                  todos={todos}
                />
              );
            } else return null;
          })}
      </ul>
    </div>
  );
};

const mapStateToProps = (initState) => {
  return {};
};

const mapDispatchToProps = {
  dispatchAddTask: fetchAddTask,
  dispatchSetList: editList,
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksBoard);
