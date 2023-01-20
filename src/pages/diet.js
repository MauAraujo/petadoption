import { Form, InputNumber, Select, Button } from "antd";
import { useState } from "react";
import "./styles/diet.scss";
import { dog_breeds, cat_breeds } from "../data/pet_info";
import { useHistory } from "react-router";

const { Option } = Select;

export default function Diet() {
  const [animal, setAnimal] = useState();
  const [age, setAge] = useState();
  const [breed, setBreed] = useState();
  const history = useHistory();

  const onFinish = () => {
    history.push(`/dieta/${animal}/${age}/${breed}`);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className="diet-form"
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
    >
      <div className="title-container">
        <h2 className="subtitle">
          Te ayudaremos a encontrar una dieta para tu mascota
        </h2>
      </div>
      <Form.Item
        className="diet-item"
        label="Animal"
        name="animal"
        rules={[{ required: true, message: "Ingresa un tipo de animal!" }]}
      >
        <Select size="large" onChange={(val) => setAnimal(val)}>
          <Option value="dog">Perro</Option>
          <Option value="cat">Gato</Option>
        </Select>
      </Form.Item>

      <Form.Item
        className="diet-item"
        label="Edad"
        name="age"
        rules={[{ required: true, message: "Ingresa una edad!" }]}
      >
        <Select onChange={(val) => setAge(val)}>
          <Option value="baby">Bebé</Option>
          <Option value="adult">Adulto</Option>
          <Option value="senior">Mayor</Option>
        </Select>
      </Form.Item>

      <Form.Item
        className="diet-item"
        label="Raza"
        name="breed"
        rules={[{ required: true, message: "Seleccion a una raza!" }]}
      >
        <Select
          onChange={(val) => setBreed(val)}
          showSearch
          optionFilterProp="children"
          size="large"
        >
          {animal === "dog"
            ? dog_breeds.map((breed, index) => (
                <Option key={index} value={breed}>
                  {toTitleCase(breed)}
                </Option>
              ))
            : animal === "cat"
            ? cat_breeds.map((breed, index) => (
                <Option key={index} value={breed}>
                  {breed}
                </Option>
              ))
            : null}
        </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Buscar dieta personalizada
        </Button>
      </Form.Item>
    </Form>
  );
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
