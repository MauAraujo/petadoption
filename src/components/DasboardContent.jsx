import React, { Fragment, useState } from 'react';
import './styles/Dashboard.scss'
import {
    Form,
    Select,
    InputNumber,
    Button,
    Upload,
    Input,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Container } from 'react-bootstrap';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const normFile = e => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};



export function NewPost() {
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    const [animal, setanimal] = useState("")
    const getBreeds = () => {
        switch (animal) {
            case "dog":
                return [
                    <Option value="chihuahua" key="chihuahua">Chihuahua</Option>,
                    <Option value="san bernardo" key="san bernardo">San bernardo</Option>,
                    <Option value="golden" key="golden">Golden</Option>
                ]
            case "cat":
                return [
                    <Option value="blue russian" key="blue russian">Blue</Option>,
                    <Option value="gardfield" key="gardfield">Gardfield</Option>,
                    <Option value="fluffy" key="fluffy">Fluffy</Option>
                ]
            default:
                return []
        }
    }

    return (
        <Container>
            <Form
                name="post"
                {...formItemLayout}
                onFinish={onFinish}
                initialValues={{
                    'age': 1,
                    // 'checkbox-group': ['A', 'B'],
                    // rate: 3.5,
                }}
            >
                {/* <Form.Item label="Plain Text">
                    <span className="ant-form-text">China</span>
                </Form.Item> */}
                <Form.Item
                    name="name"
                    label="Nombre"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Nombre de la mascota',
                        },
                    ]}
                >
                    <Input placeholder="Nombre" >
                    </Input>
                    {/* <Select placeholder="Please select a country">
                        <Option value="china">China</Option>
                        <Option value="usa">U.S.A</Option>
                    </Select> */}
                </Form.Item>

                <Form.Item
                    name="animal"
                    label="Animal"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Ingresa que animal es',
                        },
                    ]}
                >
                    <Select placeholder="Selecciona que animal es" allowClear onSelect={(e) => setanimal(e)}>
                        <Option value="dog">Perro</Option>
                        <Option value="cat">Gato</Option>
                        <Option value="other">Otro</Option>
                    </Select>
                </Form.Item>

                {animal ? <Form.Item
                    name="breed"
                    label="Raza"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Ingresa su raza',
                        },
                    ]}
                >

                    <Select placeholder="Selecciona su raza">
                        {getBreeds()}
                    </Select>
                </Form.Item> : <div></div>}

                <Form.Item
                    name="categories"
                    label="Categorias"
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Elige las categorias',
                            type: 'array',
                        },
                    ]}
                >
                    <Select mode="multiple" placeholder="Elige las categorias de la mascota">
                        <Option value="red">Red</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Edad" hasFeedback>
                    <Form.Item name="age" noStyle>
                        <InputNumber min={0} max={20} />
                    </Form.Item>
                    <span className="ant-form-text"> Años</span>
                </Form.Item>

                <Form.Item label="Dragger">
                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <Upload.Dragger name="files" action="/upload.do">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
                {/* <Form.Item name="switch" label="Switch" valuePropName="checked">
                    <Switch />
                </Form.Item> */}

                {/* <Form.Item name="slider" label="Slider">
                    <Slider
                        marks={{
                            0: 'A',
                            20: 'B',
                            40: 'C',
                            60: 'D',
                            80: 'E',
                            100: 'F',
                        }}
                    />
                </Form.Item> */}

                {/* <Form.Item name="radio-group" label="Radio.Group">
                    <Radio.Group>
                        <Radio value="a">item 1</Radio>
                        <Radio value="b">item 2</Radio>
                        <Radio value="c">item 3</Radio>
                    </Radio.Group>
                </Form.Item> */}

                {/* <Form.Item name="radio-button" label="Radio.Button">
                    <Radio.Group>
                        <Radio.Button value="a">item 1</Radio.Button>
                        <Radio.Button value="b">item 2</Radio.Button>
                        <Radio.Button value="c">item 3</Radio.Button>
                    </Radio.Group>
                </Form.Item> */}

                {/* <Form.Item name="checkbox-group" label="Checkbox.Group">
                    <Checkbox.Group>
                        <Row>
                            <Col span={8}>
                                <Checkbox
                                    value="A"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                >
                                    A
                                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox
                                    value="B"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                    disabled
                                >
                                    B
                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox
                                    value="C"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                >
                                    C
                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox
                                    value="D"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                >
                                    D
                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox
                                    value="E"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                >
                                    E
                </Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox
                                    value="F"
                                    style={{
                                        lineHeight: '32px',
                                    }}
                                >
                                    F
                </Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </Form.Item> */}

                {/* <Form.Item name="rate" label="Rate">
                    <Rate />
                </Form.Item> */}

                {/* <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="longgggggggggggggggggggggggggggggggggg"
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                            <UploadOutlined /> Click to upload
                    </Button>
                    </Upload>
                </Form.Item> */}



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
};
export function Posts() {
    return (
        <Fragment>
            Post
        </Fragment>
    )
}

export function Inbox() {
    return (
        <Fragment>
            Inbox
        </Fragment>
    )
}