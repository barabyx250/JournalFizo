import React, { FC, useEffect, useState } from "react";
import "../App.css";
import { Form, Input, Button} from "antd";
// import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import ConnectionManager from "../connection/connection";
import { RequestType } from "../types/requests";

interface passEntity {
  value: string;
}

interface loginEntity {
  value: string;
}

export const LoginPage: React.FC = () => {
  const [newPass, setPass] = useState("");
  const [newLogin, setLogin] = useState("");

  return (
    <Form name="normal_login" className="login-form">
      <div className="login_page_logo_block">
        <div className="login_page_logo"></div>
      </div>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Будь ласка, введіть логін" }]}
      >
        <Input
          // prefix={<UserOutlined
          // className="site-form-item-icon"/>}
          placeholder="Логін"
          value={newLogin}
          onChange={({ target: { value } }) => {
            setLogin(value);
          }}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Будь ласка, введіть пароль" }]}
      >
        <Input
          // prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Пароль"
          name="password"
          value={newPass}
          onChange={({ target: { value } }) => {
            setPass(value);
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          onClick={() => {
            let dataArr = [newLogin, newPass];
            ConnectionManager.getInstance().emit(RequestType.USERLOGIN, dataArr);
          }}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Увійти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
