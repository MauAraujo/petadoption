import { Form, Input, Button, Checkbox, Card } from "antd";
import "./styles/login.scss";
import React from "react";
import { Auth } from "aws-amplify";

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
    this.setState({ loading: true });
    await this.SignIn(values);
    this.setState({ loading: false });
  }

  async onNewPasswordSet({password}) {
    console.debug('New password', password)
    this.setState({isLoading: true})

    try {
      const { requiredAttributes } = this.state.user.challengeParam;
      console.log(this.state.user)
      console.log(requiredAttributes)
      const user = await Auth.completeNewPassword(this.state.user, password, requiredAttributes)
      
      if (!user.challengeName) {
        this.finishAuth(user)
      }
    } catch (err) {
      console.debug('Error updating password', err)
    }
  }

  finishAuth(user) {
    console.debug('Signed in')
    this.setState({isLoggedIn: true, isLoading: false})
    this.props.history.push('/dashboard')
  }

  async SignIn({ username, password }) {
    console.log(username, password);
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      this.setState({user: user, isLoggedIn: true})
      if (
        user.challengeName === ChallengeName.SMSMFA ||
        user.challengeName === ChallengeName.SoftwareTokenMFA
      ) {
        console.debug("confirm user with " + user.challengeName);
        // this.handleAuthStateChange(AuthState.ConfirmSignIn, user);
      } else if (user.challengeName === ChallengeName.NewPasswordRequired) {
        console.debug("require new password", user.challengeParam);
        this.setState({needsNewPassword: true})
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
      console.log("error signing in", error);
    }
  }

  render() {
    return (
      <div className="login-card">
      {
        !this.state.isLoggedIn ?  
        <SignIn onFinish={this.onCredentialsEntered} /> :
        this.state.needsNewPassword ? 
        <NewPassword onFinish={this.onNewPasswordSet}/> :
        <h3>Greeting</h3>
      }
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
      span: 16,
    },
  };
  return (
    <Card style={{ width: "40%" }} title="Ingresa tus datos">
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
          <Button type="primary" htmlType="submit">
            Ingresar
          </Button>
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
      offset: 6,
      span: 16,
    },
  };
  return (
    <Card style={{ width: "40%" }} title="Cambia tu contraseña">
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
