import React, { useState, useEffect } from "react";
import { BarsOutlined } from "@ant-design/icons";
import { requestLogOut } from "./redux/actions/users.js";
import { sortTasks } from "./redux/actions/tasks.js";
import "./index.scss";
import { AddNewType, Sidebar, TasksBoard, Signin, Signup } from "./components";
import { Route, useHistory, Switch, Redirect, Router } from "react-router-dom";
import { connect, Provider } from "react-redux";
import history from "./utils/history";

function App({
  todos,
  lists,
  colors,
  user,
  dispatchRequestAction,
  dispatchSortTasks,
}) {
  const [activeGroup, setActiveGroup] = useState({
    id: 1,
    color: null,
  });

  const [isLogin, setLogin] = useState(user.success);
  const [sort, setSort] = useState({ value: "" });

  useEffect(() => {
    dispatchSortTasks(sort);
  }, [todos.tasks.length, sort, dispatchSortTasks]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [user.success]);

  return (
    <Switch>
      <Route exact path="/">
        {localStorage.getItem("token") ? (
          <Redirect to="/todo" />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>

      <Route path="/login" component={Signin}>
        {isLogin ? <Redirect to="/todo" /> : ""}
      </Route>
      <Route path="/register" component={Signup} />
      <Route path="/todo">
        {isLogin ? "" : <Redirect to="/login" />}
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
              className="todo__sidebar__button"
              onClick={() => {
                localStorage.removeItem("token");
                dispatchRequestAction(false);
                setLogin(false);
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
                    sort={sort}
                    setSort={setSort}
                  />
                )}
              </Route>
              <Route path="/todo/types">
                {lists && (
                  <TasksBoard
                    todos={todos}
                    lists={lists}
                    activeGroup={activeGroup}
                    colors={colors}
                    sort={sort}
                    setSort={setSort}
                  />
                )}
              </Route>
            </Switch>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

const mapStateToProps = (state) => ({
  todos: state.todos,
  lists: state.todos.lists,
  colors: state.todos.colors,
  tasks: state.todos.tasks,
  user: state.users,
});

const mapDispatchToProps = {
  dispatchRequestAction: requestLogOut,
  dispatchSortTasks: sortTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
