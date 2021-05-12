import { Form, Input, Button, Checkbox, Card, Spin, Row, Col } from "antd";
import "./styles/login.scss";
import React from "react";

const ChallengeName = {
  SoftwareTokenMFA: "SOFTWARE_TOKEN_MFA",
  SMSMFA: "SMS_MFA",
  NewPasswordRequired: "NEW_PASSWORD_REQUIRED",
  MFASetup: "MFA_SETUP",
  CustomChallenge: "CUSTOM_CHALLENGE",
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isLoading: false,
      needsNewPassword: false,
      forgotPassword: false,
      user: null,
      error: "",
    };
    this.onCredentialsEntered = this.onCredentialsEntered.bind(this);
    this.onNewPasswordSet = this.onNewPasswordSet.bind(this);
  }

  async onCredentialsEntered(values) {
    await this.SignIn(values);
  }

  async onNewPasswordSet({ password }) {
    console.debug("New password", password);
    this.setState({ isLoading: true });

    try {
      const { requiredAttributes } = this.state.user.challengeParam;
      console.log(this.state.user);
        console.log(requiredAttributes);
        var user;
      // const user = await Auth.completeNewPassword(
      //   this.state.user,
      //   password,
      //   requiredAttributes
      // );

      if (!user.challengeName) {
        this.finishAuth(user);
      }
    } catch (err) {
      console.debug("Error updating password", err);
    }
  }

  finishAuth(user) {
    console.debug("Signed in");
    this.setState({ isLoggedIn: true, isLoading: false });
    this.props.history.push("/dashboard");
  }

  async SignIn({ username, password }) {
    this.setState({ isLoading: true });
    console.log(username, password);
      try {
          var user;
      //const user = await Auth.signIn(username, password);
      console.log(user);
      this.setState({ user: user, isLoggedIn: true });
      if (
        user.challengeName === ChallengeName.SMSMFA ||
        user.challengeName === ChallengeName.SoftwareTokenMFA
      ) {
        console.debug("confirm user with " + user.challengeName);
        // this.handleAuthStateChange(AuthState.ConfirmSignIn, user);
      } else if (user.challengeName === ChallengeName.NewPasswordRequired) {
        console.debug("require new password", user.challengeParam);
        this.setState({ needsNewPassword: true, loading: false });
        // this.handleAuthStateChange(AuthState.ResetPassword, user);
      } else if (user.challengeName === ChallengeName.MFASetup) {
        console.debug("TOTP setup", user.challengeParam);
        // this.handleAuthStateChange(AuthState.TOTPSetup, user);
      } else if (
        user.challengeName === ChallengeName.CustomChallenge &&
        user.challengeParam &&
        user.challengeParam.trigger === "true"
      ) {
        console.debug("custom challenge", user.challengeParam);
        // this.handleAuthStateChange(AuthState.CustomConfirmSignIn, user);
      } else {
        this.finishAuth(user);
      }
    } catch (error) {
      switch (error.code) {
        case "NotAuthorizedException":
          break;
        default:
          console.error(error);
          break;
      }
    }
  }

  render() {
    return (
        <div className="login-card">
        {!this.state.isLoggedIn ? (
          <SignIn
            onFinish={this.onCredentialsEntered}
            isLoading={this.state.isLoading}
          />
        ) : this.state.needsNewPassword ? (
          <NewPassword
            onFinish={this.onNewPasswordSet}
            isLoading={this.state.isLoading}
          />
        ) : (
          <h3>Greeting</h3>
        )}
      </div>
    );
  }
}

function SignIn(props) {
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 20,
    },
  };
  return (
      <Card className="inner-card" style={{ width: "40%" }} title="Ingresa tus datos">
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={props.onFinish}
      >
        <Form.Item
          label="Usuario"
          name="username"
          rules={[
            {
              required: true,
              message: "Ingresa tu nombre de usuario.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: "Ingresa tu contraseña.",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Recordarme</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Row>
            <Col span="12">
              <Button type="primary" htmlType="submit">
                Ingresar
              </Button>
            </Col>
            {props.isLoading ? (
              <Col span="12">
                <Spin />
              </Col>
            ) : (
              <Col span="12">
                <div />
              </Col>
            )}
          </Row>
        </Form.Item>
      </Form>
    </Card>
  );
}

function NewPassword(props) {
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
      span: 16,
    },
  };
  return (
      <Card className="inner-card" style={{ width: "40%" }} title="Cambia tu contraseña">
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={props.onFinish}
      >
        <Form.Item
          label="Nueva contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: "Ingresa tu nueva contraseña.",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default Login;
