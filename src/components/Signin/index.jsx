import { Form, Input, Button, Checkbox } from "antd";
import React from "react";
import styles from "./Signin.module.scss";
import loader from "../../index.module.scss";
import { Link } from "react-router-dom";
import { fetchSigninUser, requestAction } from "../../redux/actions/users.js";
import { connect, useDispatch } from "react-redux";
import path from "../../utils/paths.js";
import message from "../../utils/message.js";
import { layout, tailLayout } from "../../utils/layout.js";

const Signin = ({ user }) => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(fetchSigninUser(values.username, values.password));
  };

  return (
    <div className={styles.login_page}>
      {user.loading ? (
        <div className={loader.flex_loader}>
          <div className={loader.loader} />
        </div>
      ) : (
        <div className={styles.form}>
          <div className={styles.login_form}>
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
                  label="Password"
                  name="password"
                  rules={message.pleasePassword}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  {...tailLayout}
                  name="remember"
                  valuePropName="checked"
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button
                    type="primary"
                    className={styles.button}
                    htmlType="submit"
                  >
                    Login
                  </Button>
                </Form.Item>
                <p className={styles.message}>
                  Not registered?
                  <Link to={path.register}> Create an account</Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
