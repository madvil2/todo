import React from "react";
import { BarsOutlined } from "@ant-design/icons";
import "./index.scss";
import { AddNewType, Sidebar, Tasks } from "./components";

import { connect } from "react-redux";

function App({ todos, lists, colors, tasks }) {
  window.lists = lists;
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <Sidebar
          items={[
            {
              icon: <BarsOutlined />,
              name: "All types",
            },
          ]}
        />
        <Sidebar items={lists} onRemove={() => {}} isRemovable />
        <AddNewType colors={colors} />
      </div>
      <div className="todo__tasks">{lists && <Tasks todos={todos} />}</div>
    </div>
  );
}

export default connect((state) => ({
  todos: state.todos,
  lists: state.todos.lists,
  colors: state.todos.colors,
  tasks: state.todos.tasks,
}))(App);
