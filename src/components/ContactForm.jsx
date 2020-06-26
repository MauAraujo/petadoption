import React, { useState } from "react";
import { Col } from "react-bootstrap";
import "./styles/contact.scss";
import { Form, Input, Alert, Button, InputNumber, Select } from "antd";
// import { Button } from "../Components/Buttons";
import TextArea from "antd/lib/input/TextArea";
import { sendEmail } from "../services/email.service";

export default function ContactForm() {
  const [emailSent, setemailSent] = useState({});

  const [contactForm] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);

    sendEmail(values).then(
      (result) => {
        setemailSent({ sent: true, ok: true });
        contactForm.resetFields();
        console.log(result.text);
        setTimeout(() => {
          setemailSent({});
        }, 3000);
      },
      (error) => {
        setemailSent({ sent: true, ok: false });
        console.log(error.text);
        setTimeout(() => {
          setemailSent({});
        }, 3000);
      }
    );
  };
  return (
    <Col sm={12} lg={6}>
      <h1 className="txt-primary">Contact</h1>

      {emailSent.sent ? (
        emailSent.ok ? (
          <Alert
            className="m-2"
            message="Correo enviado"
            type="success"
            showIcon
          />
        ) : (
          <Alert
            className="m-2"
            message="Correo no enviado :("
            type="error"
            showIcon
          />
        )
      ) : null}
      <Form
        form={contactForm}
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 14 }}
        layout="vertical"
        initialValues={{ size: "large" }}
        size={"large"}
        onFinish={onFinish}
      >
        <Form.Item
          label="Nombre Completo"
          name="user_name"
          hasFeedback
          rules={[
            {
              required: true,
              message: "No ha ingresado su nombre",
            },
          ]}
        >
          <Input placeholder="Nombre"></Input>
        </Form.Item>
        <Form.Item
          label="Email"
          name="user_email"
          hasFeedback
          rules={[
            {
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              required: true,
              message: "Email de contacto",
            },
          ]}
        >
          <Input type="email" placeholder="email@example.com"></Input>
        </Form.Item>
        <Form.Item
          label="Dirección"
          name="user_addr"
          hasFeedback
          rules={[
            {
              required: true,
              message: "No ha ingresado su dirección",
            },
          ]}
        >
          <Input placeholder="Dirección"></Input>
        </Form.Item>
        <Form.Item
          label="Teléfono fijo"
          name="user_phone"
          hasFeedback
          rules={[
            {
              required: true,
              message: "No ha ingresado su Teléfono fijo",
            },
          ]}
        >
          <InputNumber placeholder="Teléfono fijo"></InputNumber>

          {/* <Input placeholder="Teléfono celular"></Input> */}
        </Form.Item>
        <Form.Item
          label="Teléfono celular"
          name="user_cellphone"
          hasFeedback
          rules={[
            {
              required: true,
              message: "No ha ingresado su Teléfono celular",
            },
          ]}
        >
          {/* <Input placeholder="Teléfono celular"></Input> */}
          <InputNumber placeholder="Teléfono celular"></InputNumber>
        </Form.Item>
        <Form.Item
          label="Edad"
          name="user_age"
          hasFeedback
          rules={[
            {
              required: true,
              message: "No ha ingresado su Edad",
            },
          ]}
        >
          <InputNumber placeholder="Edad"></InputNumber>
        </Form.Item>

        <Form.Item
          label="Vivienda"
          name="user_house"
          hasFeedback
          rules={[
            {
              required: true,
              message: "No ha ingresado su vivienda",
            },
          ]}
        >
          <Select defaultValue="casa" style={{ width: 120 }} >
            <Option value="casa">Casa</Option>
            <Option value="departamento">Departamento</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="message"
          label="Message"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Ingrese un mensaje por favor",
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Por que le gustaria adoptar esta mascota?"
          />
        </Form.Item>
        <Form.Item

        //   wrapperCol={{
        //     span: 12,
        //     offset: 6,
        //   }}
        >
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
}
