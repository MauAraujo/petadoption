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
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Container } from "react-bootstrap";
import { uploadPublication } from "../services/publications.service";
const axios = require("axios");
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
  const [form] = Form.useForm();
  const [animal, setanimal] = useState("");

  //   Submit
  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    uploadPublication(values).then(() => {
      form.resetFields();
    });
  };

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

  const uploadProps = {
    action:
      "https://u4uekrsanj.execute-api.us-east-2.amazonaws.com/dev/publications/images",
    multiple: false,
    listType: "picture",
    className: "upload-list-inline",
    onStart(file) {
      console.log("onStart", file, file.name);
    },
    onSuccess(ret, file) {
      console.log("onSuccess", ret, file.name);
    },
    onError(err) {
      console.log("onError", err);
    },
    onProgress({ percent }, file) {
      console.log("onProgress", `${percent}%`, file.name);
    },
    async customRequest({
      action,
      data,
      file,
      filename,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
    }) {
      console.log(file);
      let buff = await file.arrayBuffer();
      console.log(buff);
      let init = {
        body: buff,
      };
      API.post(apiName, "/publications/image", init)
        .then(({ data: response }) => {
          onSuccess(response, file);
        })
        .catch(onError);

      return {
        abort() {
          console.log("upload progress is aborted.");
        },
      };
    },
  };

  // const uploadProps = {
  //     action: endpoint,
  //     multiple: false,
  //     listType: 'picture',
  //     className: 'upload-list-inline',
  //     beforeUpload: async (file) => {
  //         const init = {
  //             body: {
  //                 filename: file.name + '-' + file.uid,
  //                 type: file.type
  //             }
  //         }
  //         console.log(file)
  //         let signed = await API.post(apiName, '/publications/image', init)
  //         console.log(signed.data.url)
  //         setEndpoint(signed.data.url)
  //     }
  // };

  return (
    <Container>
      <Form
        form={form}
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
        <Form.Item
          name="location"
          label="Lugar"
          hasFeedback
          rules={[
            {
              required: true,
              message: "¿Donde esta la mascota?",
            },
          ]}
        >
          <Input placeholder="Lugar donde esta la mascota"></Input>
        </Form.Item>
        <Form.Item
          name="description"
          label="Descripcion"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Ingrese una breve descripción",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Ingrese una breve descripción acerca de la mascota"
            rows="4"
          ></Input.TextArea>
        </Form.Item>
        <Form.Item name="goodWith" label="Bueno con" hasFeedback>
          <Input.TextArea
            placeholder="Escriba todos sus atributos, por ejemplo si es perfecto para
            niños pequeños, o tal vez sea bueno para parejas sin hijos..."
            rows="4"
          ></Input.TextArea>
        </Form.Item>
        <Form.Item
          name="preferences"
          label="Preferencias y tratos especiales"
          hasFeedback
        >
          <Input.TextArea
            placeholder="Escriba cualquier enfermedad, dsicapacidad o capricho por el cual el animalito
            requiera de trato especial"
            rows="4"
          ></Input.TextArea>
        </Form.Item>

        <Form.Item label="Dragger">
          <Form.Item name="dragger" noStyle>
            <div>
              <Upload {...uploadProps}>
                <Button>
                  <UploadOutlined />
                  Elegir Archivo
                </Button>
              </Upload>
            </div>
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
