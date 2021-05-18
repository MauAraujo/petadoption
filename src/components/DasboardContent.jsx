import React, { Fragment, useState, useEffect } from "react";
import "./styles/Dashboard.scss";
import {
  Form,
  Select,
  InputNumber,
  Button,
  Upload,
  Input,
  message,
  Card,
  Popconfirm,
  Modal,
} from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import { Container, Col, Row } from "react-bootstrap";
import {
   uploadPublication,
   updatePublication,
   removePublication
} from "../services/publications.service";
import filters from "../data/filters.json";
import { getPublications } from "../services/publications.service";
import Meta from "antd/lib/card/Meta";
import { Link } from "react-router-dom";

const { Option } = Select;
const Minio = require('minio');

var minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: 'admin',
    secretKey: 'password'
});

let dummy =
    "https://i.pinimg.com/originals/22/d2/aa/22d2aa3cf43c1e6a72d18887be3846c2.jpg";
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

export function NewPost(props) {
  console.log(props.user);
  const [form] = Form.useForm();
  const [imgKeys, setImgKeys] = useState([]);

  //   Submit
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    console.log(imgKeys);
    delete values.image;
      values["images"] = imgKeys;

    uploadPublication(values)
      .then(() => {
        message.success("La publicación se ha guardado exitosamente");
        form.resetFields();
      })
      .catch(() => {
        message.error("Ha ocurrido un error");
      });
  };

  const uploadProps = {
      action: "",
    multiple: false,
    listType: "picture",
    className: "upload-list-inline",
      beforeUpload: async (file) => {
          const metaData = {
              'Content-Type': file.type,
          };
          const path = `publications/${props.user.id}/${file.name}`;
          const buffer = Buffer.from(await file.arrayBuffer());
          console.log(path);
          console.log(buffer);

          minioClient.putObject('pet-adoption', path, buffer, metaData, (err, objInfo) => {
              console.log(err);
          });


          minioClient.presignedUrl('GET', 'pet-adoption', path, (err, presignedUrl) => {
              if (err) return console.log(err);
              console.log(presignedUrl);
              setImgKeys(imgKeys.concat([presignedUrl]));
          });

      // Storage.put(path, file, {
      //   contentType: "image/png",
      // })
      //   .then((result) => {
      //     let url = `https://petadpotionecdd85be9d38496a923a980f5f978930153255-dev.s3.us-east-2.amazonaws.com/public/${encodeURIComponent(
      //       result.key
      //     )}`;
      //     return setImgKeys(imgKeys.concat([url]));
      //   })
      //   .catch((err) => console.log(err));
    },
    transformFile: () => {
      return "";
    },
    onRemove: (file) => {
      // const path = `publications/${props.user.id}/${file.name}`;
      // Storage.remove(path)
      //   .then((result) => console.log(result))
      //   .catch((err) => console.log(err));
    },
  };

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

        {filters.map((filter) => {
          return buildFilters(filter);
        })}

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
        <Form.Item name="goodWith" label="Cualidades" hasFeedback>
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

        <Form.Item label="Imagen">
          <Form.Item name="image" noStyle>
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

export function Posts(props) {
  const [publications, setpublications] = useState([]);
  const [edit, setedit] = useState(null);

  // Form
  const [form] = Form.useForm();
  const [imgKeys, setImgKeys] = useState([]);

  const uploadProps = {
    action:
      "",
    multiple: false,
    listType: "picture",
    className: "upload-list-inline",
      beforeUpload: async (file) => {
          const metaData = {
              'Content-Type': file.type,
          };
          const user = props.user.current.user;
          const path = `publications/${user.id}/${file.name}`;
          const buffer = Buffer.from(await file.arrayBuffer());
          console.log(path);
          console.log(buffer);

          minioClient.putObject('pet-adoption', path, buffer, metaData, (err, objInfo) => {
              console.log(err);
          });


          minioClient.presignedUrl('GET', 'pet-adoption', path, (err, presignedUrl) => {
              if (err) return console.log(err);
              console.log(presignedUrl);
              setImgKeys(imgKeys.concat([presignedUrl]));
          });

      // const path = `publications/${props.user.id}/${file.name}`;
      // console.log(path);
      // Storage.put(path, file, {
      //   contentType: "image/png",
      // })
      //   .then((result) => {
      //     let url = `https://petadpotionecdd85be9d38496a923a980f5f978930153255-dev.s3.us-east-2.amazonaws.com/public/${encodeURIComponent(
      //       result.key
      //     )}`;
      //     return setImgKeys(imgKeys.concat([url]));
      //   })
      //   .catch((err) => console.log(err));
    },
    transformFile: () => {
      return "";
    },
    onRemove: (file) => {
      const path = `publications/${props.user.id}/${file.name}`;
      // Storage.remove(path)
      //   .then((result) => console.log(result))
      //   .catch((err) => console.log(err));
    },
  };

  useEffect(() => {
    async function fetchPublications() {
      setpublications(await getPublications());
    }
    fetchPublications();
  }, []);

  const cleanData = (data) => {
    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        delete data[key];
      }
    });
    return data;
  };

  const editPublication = async () => {
    const values = cleanData(form.getFieldsValue());
    delete values.image;
    values["images"] = [...imgKeys, ...edit["images"]];
    console.log(values);

    await updatePublication(edit["ID"], { ...edit, ...values });
    message.success("La publicación se ha editado exitosamente");
    form.resetFields();
    setpublications(await getPublications());

    setedit(null);
  };

  return (
    <Fragment>
        <Modal
          visible={edit !== null}
          title={"Editar publicación"}
          onOk={editPublication}
          onCancel={() => {
            setedit(null);
          }}
        >
          <Form
            form={form}
            name="post"
            layout="vertical"
            {...formItemLayout}
            size="large"
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

            {filters.map((filter) => {
              return buildFilters(filter);
            })}

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
            <Form.Item name="goodWith" label="Cualidades" hasFeedback>
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

            <Form.Item label="Imagen">
              <Form.Item name="image" noStyle>
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
          </Form>
        </Modal>
        <Row>
        {publications?.map((publication) => {
            return (
             <Col key={publication.name}>
              <Card
                cover={
                  <img
                      alt="example"
                      src={publication.images ? publication.images[0] : dummy}
                  />
                }
                actions={[
                      // <SettingOutlined key="setting" />,
                      <EditOutlined
                          key="edit"
                        onClick={() => {
                            console.log(props);
                              setedit(publication);
                              form.setFieldsValue(publication);
                          }}
                      />,
                      <Link to={"/detail/" + (publication.ID)}>
                          <EyeOutlined />
                      </Link>,
                      <Popconfirm
                          onConfirm={async () => {
                              await removePublication(publication.ID);
                              message.success("La publicación se ha eliminado exitosamente");
                              setpublications(await getPublications());
                          }}
                          cancelText={"Cancelar"}
                          okText={"Eliminar"}
                          okButtonProps={{
                              type: "danger",
                          }}
                          cancelButtonProps={{
                              danger: true,
                          }}
                          title="Esta seguro que desea eliminar?"
                          icon={<DeleteOutlined style={{ color: "red" }} />}
                      >
                          <DeleteOutlined
                              key="delete"
                          />
                      </Popconfirm>,
                  // <Button><</Button>
                  // <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  title={publication.name}
                  description={`${publication.animal?.toUpperCase() || ""} | ${
                    new Date(
                      publication.publicationDate
                    ).toLocaleDateString() || new Date()
                  } | ${publication.views || 0} Visualizaciones`}
                />
              </Card>
                </Col>
          );
        })}
      </Row>
    </Fragment>
  );
}

export function Inbox(props) {
  console.log(props.user);
  return <Fragment>Inbox </Fragment>;
}

function buildFilters(filter) {
  return filter.mode === "options" ? (
    <Form.Item
      key={filter.name}
      name={filter.name}
      label={filter.label}
      hasFeedback
      rules={[
        {
          required: true,
          message: filter.message,
          type: filter.ruleType,
        },
      ]}
    >
      <Select mode={filter.mode} placeholder={filter.label}>
        {filter.options.map((option) => {
          return (
            <Option value={option} key={option}>
              {option}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  ) : (
    <Form.Item
      key={filter.name}
      name={filter.name}
      label={filter.label}
      hasFeedback
      rules={[
        {
          required: true,
          message: filter.message,
          type: filter.ruleType,
        },
      ]}
    >
      <Select
        mode={filter.mode}
        tokenSeparators={[","]}
        placeholder={filter.label}
      ></Select>
    </Form.Item>
  );
}
