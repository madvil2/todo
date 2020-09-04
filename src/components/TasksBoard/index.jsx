import React, { useEffect, useState } from "react";
import styles from "./TasksBoard.module.scss";
import loader from "../../index.module.scss";
import { Input, DatePicker, Space, Select } from "antd";
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
  preloading,
  setSort,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const dispatch = useDispatch();

  const { Option } = Select;

  function handleChange(value) {
    setSort({ value });
  }

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
    <div className={styles.tasks}>
      <h2
        className={classNames(styles.tasks__title, {
          [styles[`tasks__title__${color}`]]: color,
        })}
      >
        {activeGroup.id === 1 ? "All types" : title}
        {activeGroup.id === 1 ? (
          ""
        ) : (
          <EditOutlined onClick={editTitle} className={styles.tasks__edit} />
        )}
        <Select
          defaultValue={"Sort by date:"}
          onChange={handleChange}
          className={styles.sort}
        >
          <Option value="ASCENDING">Early first</Option>
          <Option value="DESCENDING">Late first</Option>
        </Select>
      </h2>
      <div className={styles.tasks__add_items}>
        <Input
          className={styles.tasks__add_items__add_input}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Enter task title"
        />
        <Space className={styles.tasks__add_items__picker}>
          <DatePicker
            format="YYYY-MM-DD HH:mm:ss"
            showTime={{ defaultValue: moment("00:00:00", "HH:mm:ss") }}
            onChange={(value) => setDateValue(value)}
            size="large"
            value={dateValue}
          />
        </Space>
        <button
          className={styles.tasks__add_items__button}
          onClick={AddNew}
          type="primary"
        >
          Add new
        </button>
      </div>
      {preloading.loadingTodos ? (
        <div className={loader.flex_loader}>
          <div className={loader.loader} />
        </div>
      ) : (
        <ul className={styles.tasks__list}>
          {!!todos.tasks.length &&
            todos.tasks.map((item, index) => {
              if (activeGroup.id === item.type || activeGroup.id === 1) {
                return (
                  <Task
                    index={index}
                    task={item}
                    key={item.id}
                    activeGroup={activeGroup}
                    todos={todos}
                  />
                );
              } else return null;
            })}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  preloading: state.fetchTasks,
});

const mapDispatchToProps = {
  dispatchAddTask: fetchAddTask,
  dispatchSetList: editList,
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksBoard);
