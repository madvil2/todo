import { Form, Input, Button } from "antd";
import React from "react";
import styles from "../Signin/Signin.module.scss";
import loader from "../../index.module.scss";
import path from "../../utils/paths.js";
import { Link } from "react-router-dom";
import { fetchSignupUser, requestAction } from "../../redux/actions/users.js";
import { connect, useDispatch } from "react-redux";
import message from "../../utils/message.js";
import { layout, tailLayout } from "../../utils/layout.js";

const Signup = ({ user }) => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(fetchSignupUser(values.username, values.email, values.password));
  };

  return (
    <div className={styles.login_page}>
      {user.loading ? (
        <div className={loader.flex_loader}>
          <div className={loader.loader} />
        </div>
      ) : (
        <div className={styles.form}>
          <div className={styles.register_form}>
            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <form className={styles.login_form}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={message.pleaseUsername}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={message.inputEmail}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={message.pleasePassword}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={message.passwordConfirm}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button
                    type="primary"
                    className={styles.button}
                    htmlType="submit"
                  >
                    Register
                  </Button>
                </Form.Item>
                <p className={styles.message}>
                  Already registered?
                  <Link to={path.login}> Login</Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      )}
      ;
    </div>
  );
};

const mapStateToProps = (initState) => {
  return {
    user: initState.users,
  };
};

const mapDispatchToProps = {
  dispatchRequestAction: requestAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
