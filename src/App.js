import React, { useState } from "react";
import {} from "antd";
import Sidebar from "./components/Sidebar/";
import { BarsOutlined } from "@ant-design/icons";
import "./index.scss";
import AddNewType from "./components/AddNewType/";

import { connect } from "react-redux";

function App({ menu, colors }) {
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
        <Sidebar items={menu} onRemove={() => {}} isRemovable />
        <AddNewType colors={colors} />
      </div>
      <div className="todo__tasks"></div>
    </div>
  );
}

export default connect((state) => ({
  menu: state.todos.lists,
  colors: state.todos.colors,
}))(App);
