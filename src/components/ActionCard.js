import React from "react";
import "./styles/action-card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { Modal } from "antd";
import { Col } from "react-bootstrap";
import "./styles/contact.scss";
import { Form, Input, Alert, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { sendEmail } from "../services/email.service";
const { Option } = Select;
export default function ActionCard(props) {
  const [adopt, setadopt] = useState(false);
  const [emailSent, setemailSent] = useState({});

  const [contactForm] = Form.useForm();

  const onFinish = () => {
    const values = contactForm.getFieldsValue();
    values["pet_name"] = props.pet?.name || "";

    sendEmail(values).then(
      (result) => {
        setemailSent({ sent: true, ok: true });
        contactForm.resetFields();
        setTimeout(() => {
          setemailSent({});
        }, 3000);
        setadopt(false);
      },
      (error) => {
        setemailSent({ sent: true, ok: false });
        setTimeout(() => {
          setemailSent({});
        }, 3000);
      }
    );
  };

  return (
    <div className="action-card">
      <Modal
        visible={adopt}
        onCancel={() => {
          contactForm.resetFields();
          setadopt(false);
        }}
        onOk={() => {
          onFinish();
        }}
        okText="Enviar"
        cancelText="Cancelar"
      >
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
              name="user_dir"
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
              <Input placeholder="Teléfono fijo"></Input>

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
              <Input placeholder="Teléfono celular"></Input>
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
              <Input placeholder="Edad"></Input>
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
              <Select>
                <Option value="Casa">Casa</Option>
                <Option value="Departamento">Departamento</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Arrendamiento"
              name="user_rent"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "No ha ingresado su tipo de arrendamiento vivienda",
                },
              ]}
            >
              <Select>
                <Option value="Propia">Casa propia</Option>
                <Option value="Renta">Renta</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="family_members"
              label="¿Cuántos miembros de la familia son y de que edad?"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "No ha ingresado cuantas personas viven en su casa",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="¿Cuántos miembros de la familia son y de que edad?"
              />
            </Form.Item>

            <Form.Item
              name="other_pets"
              label="¿Tiene otras mascotas? ¿De que especie?"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "No ha ingresado si tiene otras mascotas",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="¿Tiene otras mascotas? ¿De que especie?"
              />
            </Form.Item>
          </Form>
        </Col>
      </Modal>

      <div className="card">
        <div id="action" className="card-body">
          <button
            onClick={() => {
              setadopt(true);
            }}
            type="button"
            className="btn btn-primary rounded-pill"
          >
            ¡Adóptame!
          </button>
          <div className="social-banner">
            <FontAwesomeIcon className="social" icon={faFacebookF} />
            <FontAwesomeIcon className="social" icon={faTwitter} />
            <FontAwesomeIcon className="social" icon={faInstagram} />
          </div>
        </div>
      </div>
    </div>
  );
}
