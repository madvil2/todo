import React, { useEffect } from "react";
import { DatePicker, Input, Modal, Popconfirm, Space } from "antd";
import moment from "moment";
import { removeTask, editTask } from "../../redux/actions/tasks";
import { connect, useDispatch } from "react-redux";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import styles from "../TasksBoard/TasksBoard.module.scss";
import "../TasksBoard/TasksBoard.module.scss";
import { fetchChangeTask, fetchDeleteTask } from "../../redux/actions/tasks.js";
import classNames from "classnames";
import icon from "../../assets/icon-close.png";

const TasksBoard = ({ task, index }) => {
  const [status, setStatus] = React.useState("");
  const [editText, setEditText] = React.useState(task.title);
  const [editDate, setEditDate] = React.useState(
    moment(task.date).isValid() ? moment(task.date) : ""
  );
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();

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
    let time = moment(task.date).unix();
    let now = moment().unix();

    if (time - now < 86400 && time - now > 0) {
      setStatus("warning");
    } else if (time - now < 0) {
      setStatus("failed");
    }
  }, [task.date]);

  return (
    <li className={styles.tasks__items}>
      <Modal
        title="Edit task"
        visible={visible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      >
        <div className={styles.task__items_edit}>
          <p>Task text:</p>
          <Input
            className={styles.tasks__add_items__add_input}
            defaultValue={editText}
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
          />
        </div>
        <div className={styles.task__items_edit}>
          <p>Task date:</p>
          <Space className={styles.tasks__add_items__picker}>
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
      <div className={styles.tasks__items_row}>
        <div
          className={classNames({
            [styles.checkbox]: true,
            [styles.warning]: status === "warning" && !task.completed,
            [styles.failed]: status === "failed" && !task.completed,
          })}
        >
          <input id={`task-${index}`} type="checkbox" />
          <label
            className={`${task.completed && styles.active}`}
            htmlFor={`task-${index}`}
            onClick={() => {
              changeStatus(task.id);
            }}
          >
            <CheckOutlined className={styles.mark} />
          </label>
        </div>
        <input readOnly value={task.title} />
        <div className={styles.tasks__items_row_actions}>
          <div onClick={() => setVisible(true)}>
            <EditOutlined />
          </div>
          <div className={styles.tasks__items_row_confirm}>
            <Popconfirm
              title="Are you sure want to delete this task?"
              onConfirm={() => dispatch(fetchDeleteTask(task.id))}
              placement="topRight"
              okText="Yes"
              cancelText="No"
            >
              <img alt="remove button" src={icon} width="14" height="14" />
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
