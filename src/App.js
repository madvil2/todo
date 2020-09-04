import React, { useState, useEffect } from "react";
import { BarsOutlined } from "@ant-design/icons";
import { requestLogOut } from "./redux/actions/users.js";
import { sortTasks } from "./redux/actions/tasks.js";
import styles from "./index.module.scss";
import { AddNewType, Sidebar, TasksBoard, Signin, Signup } from "./components";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import history from "./utils/history";
import path from "./utils/paths.js";
import { reverse } from "named-urls/src";

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

  const logout = () => {
    localStorage.removeItem("token");
    dispatchRequestAction(false);
    setLogin(false);
  };

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
      <Route exact path={path.home}>
        {localStorage.getItem("token") ? (
          <Redirect to={path.todo} />
        ) : (
          <Redirect to={path.login} />
        )}
      </Route>

      <Route path={path.login} component={Signin}>
        {isLogin ? <Redirect to={path.todo} /> : ""}
      </Route>
      <Route path={path.register} component={Signup} />
      <Route path={path.todo}>
        {isLogin ? "" : <Redirect to={path.login} />}
        <div className={styles.todo}>
          <div className={styles.todo__sidebar}>
            <Sidebar
              onClick={() => history.push(path.todo)}
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
                history.push(reverse(path.todoTypesId, list.id));
              }}
              items={lists}
              isRemovable
              activeGroup={activeGroup}
              changeActiveGroup={setActiveGroup}
            />
            <AddNewType colors={colors} />
            <button
              className={styles.todo__sidebar__button}
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>

          <div className={styles.todo__tasks}>
            <Switch>
              <Route exact path={path.todo}>
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
              <Route path={path.todoTypes}>
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
