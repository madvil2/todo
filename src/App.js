import React from "react";
import { BarsOutlined } from "@ant-design/icons";
import "./index.scss";
import { AddNewType, Sidebar, Tasks } from "./components";

import { connect } from "react-redux";

function App({ lists, colors, tasks }) {
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
      <div className="todo__tasks">
        {lists && <Tasks lists={lists} tasks={tasks} />}
      </div>
    </div>
  );
}

export default connect((state) => ({
  lists: state.todos.lists,
  colors: state.todos.colors,
}))(App);
