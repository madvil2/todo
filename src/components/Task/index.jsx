import React, { useEffect } from "react";
import { DatePicker, Input, Modal, Popconfirm, Space } from "antd";
import moment from "moment";
import { removeTask, editTask } from "../../redux/actions/tasks";
import { connect, useDispatch } from "react-redux";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import "../TasksBoard/TasksBoard.scss";
import { fetchChangeTask, fetchDeleteTask } from "../../redux/actions/tasks.js";
import classNames from "classnames";

const TasksBoard = ({ task, index }) => {
  const [status, setStatus] = React.useState("");
  const [editText, setEditText] = React.useState(task.title);
  const [editDate, setEditDate] = React.useState(
    moment(task.date).isValid() ? moment(task.date) : ""
  );
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();

  const deadline = () => {
    let time = moment(task.date).unix();
    let now = moment().unix();

    if (time - now < 86400 && time - now > 0) {
      setStatus("warning");
    } else if (time - now < 0) {
      setStatus("failed");
    }
  };

  const handleOk = () => {
    dispatch(fetchChangeTask(task.id, editText, editDate, task.completed));
    setVisible(false);
  };

  const changeStatus = () => {
    dispatch(fetchChangeTask(task.id, task.title, task.date, !task.completed));
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    deadline();
  }, [task.date]);

  return (
    <li className="tasks__items">
      <Modal
        title="Edit task"
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      >
        <div className="task__items-edit">
          <p>Task text:</p>
          <Input
            className="tasks__add-items__add-input"
            defaultValue={editText}
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
          />
        </div>
        <div className="task__items-edit">
          <p>Task date:</p>
          <Space className="tasks__add-items__picker">
            <DatePicker
              format="YYYY-MM-DD HH:mm:ss"
              showTime={{
                defaultValue: moment("00:00:00", "HH:mm:ss"),
              }}
              onChange={(value) => setEditDate(value)}
              size="large"
              value={editDate}
              defaultValue={
                moment(task.date).isValid() ? "" : moment(task.date)
              }
            />
          </Space>
        </div>
      </Modal>
      <div className="tasks__items-row">
        <div
          className={classNames("checkbox", {
            warning: status === "warning" && !task.completed,
            failed: status === "failed" && !task.completed,
          })}
        >
          <input id={`task-${index}`} type="checkbox" />
          <label
            className={`${task.completed && "active"}`}
            htmlFor={`task-${index}`}
            onClick={() => {
              changeStatus(task.id);
            }}
          >
            <CheckOutlined className="mark" />
          </label>
        </div>
        <input readOnly value={task.title} />
        <div className={`tasks__items-row-actions`}>
          <div onClick={() => setVisible(true)}>
            <EditOutlined />
          </div>
          <div className="tasks__items-row-confirm">
            <Popconfirm
              title="Are you sure want to delete this task?"
              onConfirm={() => dispatch(fetchDeleteTask(task.id))}
              placement="topRight"
              okText="Yes"
              cancelText="No"
            >
              <img
                alt="remove button"
                src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-close-512.png"
                width="14"
                height="14"
              />
            </Popconfirm>
          </div>
        </div>
      </div>
    </li>
  );
};

const mapDispatchToProps = {
  dispatchRemoveTask: removeTask,
  dispatchEditTask: editTask,
};

export default connect(() => ({}), mapDispatchToProps)(TasksBoard);
