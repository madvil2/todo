import React from "react";
import { DatePicker, Input, Modal, Popconfirm, Space } from "antd";
import moment from "moment";
import { removeTask, editTask } from "../../redux/actions/todos";
import { connect } from "react-redux";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import "../TasksBoard/TasksBoard.scss";

const TasksBoard = ({
  task,
  dispatchRemoveTask,
  index,
  dispatchEditTask,
  todos,
}) => {
  const [editText, setEditText] = React.useState(task.text);
  const [editDate, setEditDate] = React.useState();
  const [visible, setVisible] = React.useState(false);

  const handleOk = () => {
    let newList;
    if (todos.tasks) {
      newList = todos.tasks.map((item) => {
        if (item.taskId === task.taskId) {
          if (editDate) {
            item.date = editDate;
          }
          item.date = "";
          item.text = editText;
        }
        return item;
      });
    }
    dispatchEditTask(newList);
    setVisible(false);
  };

  const changeStatus = () => {
    const newList = todos.tasks.map((item) => {
      if (item.taskId === task.taskId) {
        item.status = !item.status;
      }
      return item;
    });
    dispatchEditTask(newList);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const onRemoveTask = (taskId) => {
    dispatchRemoveTask({ taskId });
  };

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
              defaultValue={task.date === "" ? "" : moment(task.date)}
            />
          </Space>
        </div>
      </Modal>
      <div className="tasks__items-row">
        <div className="checkbox">
          <input id={`task-${index}`} type="checkbox" />
          <label
            className={`${task.status && "active"}`}
            htmlFor={`task-${index}`}
            onClick={() => {
              changeStatus(task.taskId);
            }}
          >
            <CheckOutlined className="mark" />
          </label>
        </div>
        <input readOnly value={task.text} />
        <div className={`tasks__items-row-actions`}>
          <div onClick={() => setVisible(true)}>
            <EditOutlined />
          </div>
          <div className="tasks__items-row-confirm">
            <Popconfirm
              title="Are you sure want to delete this task?"
              onConfirm={() => onRemoveTask(task.taskId)}
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

export default connect((state) => ({}), mapDispatchToProps)(TasksBoard);
