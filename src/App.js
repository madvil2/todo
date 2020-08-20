import React from "react";
import { BarsOutlined } from "@ant-design/icons";
import "./index.scss";
import { AddNewType, Sidebar, TasksBoard, Signin, Signup } from "./components";
import { Route, useHistory, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function App({ todos, lists, colors }) {
  const [activeGroup, setActiveGroup] = React.useState({
    id: 1,
    color: null,
  });
  let history = useHistory();
  return (
    <>
      <Route exact path="/">
        {localStorage.getItem("token") ? (
          <Redirect to="/todo" />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/login" component={Signin} />
      <Route path="/register" component={Signup} />
      <Route path="/todo">
        {localStorage.getItem("token") ? "" : <Redirect to="/login" />}
        <div className="todo">
          <div className="todo__sidebar">
            <Sidebar
              onClick={() => history.push(`/todo`)}
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
                history.push(`/todo/types/${list.id}`);
              }}
              items={lists}
              isRemovable
              activeGroup={activeGroup}
              changeActiveGroup={setActiveGroup}
            />
            <AddNewType colors={colors} />
            <button
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Logout
            </button>
          </div>

          <div className="todo__tasks">
            <Switch>
              <Route exact path="/todo">
                {lists && (
                  <TasksBoard
                    todos={todos}
                    lists={lists}
                    activeGroup={activeGroup}
                    colors={colors}
                  />
                )}
              </Route>
              <Route path="/todo/types/">
                {lists && (
                  <TasksBoard
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
      </Route>
    </>
  );
}

export default connect((state) => ({
  todos: state.todos,
  lists: state.todos.lists,
  colors: state.todos.colors,
  tasks: state.todos.tasks,
}))(App);
