import { Form, Input, Button } from "antd";
import React from "react";
import styles from "../Signin/Signin.module.scss";
import loader from "../../index.module.scss";
import path from "../../utils/paths.js";
import { Link } from "react-router-dom";
import { fetchSignupUser, requestAction } from "../../redux/actions/users.js";
import { connect, useDispatch } from "react-redux";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

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
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          "The two passwords that you entered do not match!"
                        );
                      },
                    }),
                  ]}
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
