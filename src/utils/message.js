export default {
  pleaseUsername: [
    {
      required: true,
      message: "Please input your username!",
    },
  ],
  pleasePassword: [
    {
      required: true,
      message: "Please input your password!",
    },
  ],
  inputEmail: [
    {
      type: "email",
      message: "The input is not valid E-mail!",
    },
    {
      required: true,
      message: "Please input your E-mail!",
    },
  ],
  passwordConfirm: [
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
  ],
};
