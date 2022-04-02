import React from 'react';
import { Form, Input, Button } from 'antd';
import AuthLayout from '../components/AuthLayout';
import Eye from '../../../common/Icons/Eye';
import EyeInvisible from '../../../common/Icons/EyeInvisible';
import authenticationApi from '../../../services/api/authentication';

export default function Login() {
  const [loginForm] = Form.useForm();

  const submitForm = async (data: any) => {
    const response = await authenticationApi.login({ email: data.email, password: data.password });
    console.log(response);
  };

  return (
    <AuthLayout>
      <Form form={loginForm} layout="vertical" onFinish={submitForm}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Por favor insira seu email' },
            { pattern: /^\S+@\S+\.\S+$/, message: 'Email inválido' }
          ]}
        >
          <Input type="email" placeholder="joao@email.com" size="large" />
        </Form.Item>
        <Form.Item
          label="Senha"
          name="password"
          rules={[{ required: true, message: 'Por favor insira sua senha' }]}
        >
          <Input.Password placeholder="********" size="large" iconRender={visible => (visible ? <button><Eye /></button> : <button><EyeInvisible /></button>)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Entrar</Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
}
