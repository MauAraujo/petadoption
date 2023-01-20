import { Form, Input, Button, Checkbox, Card, Spin, Row, Col } from "antd";
import "./styles/login.scss";
import React from "react";
import { LogIn } from "../services/auth.service";

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
    this.setState({ isLoading: true });

    try {
      var user;
      if (!user.challengeName) {
        this.finishAuth(user);
      }
    } catch (err) {
      console.debug("Error updating password", err);
    }
  }

  finishAuth(user) {
    this.setState({ isLoggedIn: true, isLoading: false });
    this.props.history.push("/dashboard");
  }

  async SignIn({ username, password }) {
    this.setState({ isLoading: true });
    try {
      const user = await LogIn(username, password);
      if (user !== null) {
        this.finishAuth(user);
      }
    } catch (error) {
      console.log(error);
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
    <Card
      className="inner-card"
      style={{ width: "40%" }}
      title="Ingresa tus datos"
    >
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
    <Card
      className="inner-card"
      style={{ width: "40%" }}
      title="Cambia tu contraseña"
    >
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
