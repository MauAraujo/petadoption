import React, { Fragment, useState, useEffect } from "react";
import API from "@aws-amplify/api";
import "./styles/Dashboard.scss";
import {
  Form,
  Select,
  InputNumber,
  Button,
  Upload,
  Input,
  message,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Container } from "react-bootstrap";
import { uploadPublication } from "../services/publications.service";

/* AWS Config */
API.configure();
const apiName = "api024fb227";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

export function NewPost(props) {
  console.log(props.user);

  //   Submit
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    Posts(values);
    uploadPublication(values);
  };

  const [animal, setanimal] = useState("");
  const getBreeds = () => {
    switch (animal) {
      case "dog":
        return [
          <Option value="chihuahua" key="chihuahua">
            Chihuahua
          </Option>,
          <Option value="san bernardo" key="san bernardo">
            San bernardo
          </Option>,
          <Option value="golden" key="golden">
            Golden
          </Option>,
        ];
      case "cat":
        return [
          <Option value="blue russian" key="blue russian">
            Blue
          </Option>,
          <Option value="gardfield" key="gardfield">
            Gardfield
          </Option>,
          <Option value="fluffy" key="fluffy">
            Fluffy
          </Option>,
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    message.success("La puclicación se ha guardado exitosamente");
  });

  return (
    <Container>
      <Form
        name="post"
        {...formItemLayout}
        onFinish={onFinish}
        size="large"
        initialValues={{
          age: 1,
          size: "middle",
          // 'checkbox-group': ['A', 'B'],
          // rate: 3.5,
        }}
      >
        <Form.Item
          name="name"
          label="Nombre"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Nombre de la mascota",
            },
          ]}
        >
          <Input placeholder="Nombre"></Input>
        </Form.Item>
        <Form.Item
          name="animal"
          label="Animal"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Ingresa que animal es",
            },
          ]}
        >
          <Select
            placeholder="Selecciona que animal es"
            allowClear
            onSelect={(e) => setanimal(e)}
          >
            <Option value="dog"> Perro </Option>
            <Option value="cat"> Gato </Option>
            <Option value="other"> Otro </Option>
          </Select>
        </Form.Item>
        {animal ? (
          <Form.Item
            name="breed"
            label="Raza"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Ingresa su raza",
              },
            ]}
          >
            <Select placeholder="Selecciona su raza"> {getBreeds()} </Select>
          </Form.Item>
        ) : (
          <div> </div>
        )}
        <Form.Item
          name="categories"
          label="Categorias"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Elige las categorias",
              type: "array",
            },
          ]}
        >
          <Select
            mode="multiple"
            placeholder="Elige las categorias de la mascota"
          >
            <Option value="cute"> Cute </Option>
            <Option value="happy"> Happy </Option>
          </Select>
        </Form.Item>
        <Form.Item label="Edad" hasFeedback>
          <Form.Item name="age" noStyle>
            <InputNumber min={0} max={20} />
          </Form.Item>
          <span className="ant-form-text"> Años </span>
        </Form.Item>

        <Form.Item  name="description"
          label="Descripcion"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Ingrese una breve descripción",
            },
          ]}>
            <Input.TextArea placeholder="Ingrese una breve descripción" rows="4"></Input.TextArea>
        </Form.Item>

        <Form.Item label="Dragger">
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}
export function Posts(form) {
  API.post(apiName, "/publications", {
    body: {
      //   publicationID: "786tyghb8t",
      publicationID: `${new Date().getTime()}`,
      content: form,
    },
  });
  return <Fragment> Post </Fragment>;
}

export function Inbox(props) {
  console.log(props.user);
  return <Fragment>Inbox </Fragment>;
}
