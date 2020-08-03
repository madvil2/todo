import React from "react";
import Sidebar from "./components/Sidebar/";
import { BarsOutlined } from "@ant-design/icons";
import "./index.scss";
import AddNewType from "./components/AddNewType/";

import { connect } from "react-redux";

function App({ lists, colors }) {
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
      <div className="todo__tasks"></div>
    </div>
  );
}

export default connect((state) => ({
  lists: state.todos.lists,
  colors: state.todos.colors,
}))(App);
