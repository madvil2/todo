import { Form, Input, Button } from "antd";
import React from "react";
import "../Signin/Signin.scss";
import { Link } from "react-router-dom";
import { fetchSignupUser } from "../../redux/actions/users.js";
import { useDispatch } from "react-redux";

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

const Signup = () => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(fetchSignupUser(values.username, values.email, values.password));
  };

  const onFinishFailed = (errorInfo) => {
    // fetchSignupUser(
    //   errorInfo.values.username,
    //   errorInfo.values.email,
    //   errorInfo.values.password
    // );
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      <div className="form">
        <div className="register-form">
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <form className="login-form">
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
                <Button type="primary" className="button" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
              <p className="message">
                Already registered?
                <Link to="/login"> Login</Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
