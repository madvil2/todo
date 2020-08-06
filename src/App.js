import React from "react";
import { BarsOutlined } from "@ant-design/icons";
import "./index.scss";
import { AddNewType, Sidebar, Tasks } from "./components";

import { connect } from "react-redux";

function App({ todos, lists, colors, tasks }) {
  window.lists = lists;
  const [activeGroup, setActiveGroup] = React.useState({
    id: 1,
    color: null,
  });
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <Sidebar
          items={[
            {
              icon: <BarsOutlined />,
              name: "All types",
              id: 1,
            },
          ]}
          activeGroup={activeGroup}
          changeActiveGroup={setActiveGroup}
        />
        <Sidebar
          items={lists}
          isRemovable
          activeGroup={activeGroup}
          changeActiveGroup={setActiveGroup}
        />
        <AddNewType colors={colors} />
      </div>
      <div className="todo__tasks">
        {lists && (
          <Tasks
            todos={todos}
            lists={lists}
            activeGroup={activeGroup}
            colors={colors}
          />
        )}
      </div>
    </div>
  );
}

export default connect((state) => ({
  todos: state.todos,
  lists: state.todos.lists,
  colors: state.todos.colors,
  tasks: state.todos.tasks,
}))(App);
