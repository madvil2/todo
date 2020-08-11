import React from "react";
import { BarsOutlined } from "@ant-design/icons";
import "./index.scss";
import { AddNewType, Sidebar, Tasks } from "./components";
import { Route, useHistory, Switch } from "react-router-dom";
import { connect } from "react-redux";

function App({ todos, lists, colors, tasks }) {
  const [activeGroup, setActiveGroup] = React.useState({
    id: 1,
    color: null,
  });
  let history = useHistory();
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <Sidebar
          onClick={() => history.push(`/`)}
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
          onClickItem={(list) => {
            history.push(`/types/${list.id}`);
          }}
          items={lists}
          isRemovable
          activeGroup={activeGroup}
          changeActiveGroup={setActiveGroup}
        />
        <AddNewType colors={colors} />
      </div>

      <div className="todo__tasks">
        <Switch>
          <Route exact path="/">
            {lists && (
              <Tasks
                todos={todos}
                lists={lists}
                activeGroup={activeGroup}
                colors={colors}
              />
            )}
          </Route>
          <Route path="/types">
            {lists && (
              <Tasks
                todos={todos}
                lists={lists}
                activeGroup={activeGroup}
                colors={colors}
              />
            )}
          </Route>
        </Switch>
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
