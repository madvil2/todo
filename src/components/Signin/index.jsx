import { Form, Input, Button, Checkbox } from "antd";
import React from "react";
import "./Signin.scss";
import { Link } from "react-router-dom";
import { fetchSigninUser, requestAction } from "../../redux/actions/users.js";
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

const Signin = (isLoading) => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(fetchSigninUser(values.username, values.password));
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page">
      {}
      <div className="form">
        <div className="login-form">
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
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
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
                <Button type="primary" className="button" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
              <p className="message">
                Not registered?
                <Link to="/register"> Create an account</Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  dispatchRequestAction: requestAction,
};

export default connect((state) => ({}), mapDispatchToProps)(Signin);
