import React, { FC, useState } from 'react';
import '../App.css';
import { Form, Input, Button, Checkbox, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";
import Mainpage from './MainPage';


interface passEntity {
	value: string
}

interface loginEntity {
	value: string
}


export const LoginPage : React.FC = () => {
	const [newPass, setPass] = useState('');
	const [editPass, setEditPass] = useState<passEntity>();

	const [newLogin, setLogin] = useState('');
	const [editLogin, setEditlogin] = useState<loginEntity>();

	let okPass = function (pass: string) {
		let ps = document.querySelector(".list");
		if(pass === 'Bius2019'){
			ps?.setAttribute('disabled', 'disabled')
			return(
				newPass
			)
		} else{
			console.log("errr");
			
		}
	}

	return(
		<Form
		name="normal_login"
		className="login-form"
	  >
		<div className='login_page_logo_block'>
			<div className="login_page_logo"></div>
		</div>
		<Form.Item
		  name="username"
		  rules={[{ required: true, message: 'Будь ласка, введіть логін' }]}
		>
		  <Input
		   	// prefix={<UserOutlined 
		   	// className="site-form-item-icon"/>}
			placeholder="Логін"
			value={newLogin}
			onChange={({target: {value}}) => {
				setLogin(value);
			}}
			/>
		</Form.Item>
		<Form.Item
		  name="password"
		  rules={[{ required: true, message: 'Будь ласка, введіть пароль' }]}
		>
		  <Input
			// prefix={<LockOutlined className="site-form-item-icon" />}
			type="password"
			placeholder="Пароль"
			name="password"
			value={newPass}
			onChange={({target: {value}}) => {
				setPass(value);
			}}
		  />
		</Form.Item>
		<Form.Item>
		  <Button onClick={() => {
			  console.log(newLogin);
			  console.log(newPass);
			  okPass(newPass);
		  }}
		   type="primary" htmlType="submit" className="login-form-button">
				Увійти
		  </Button>
		</Form.Item>
	  </Form>
	)
}




export default LoginPage;

