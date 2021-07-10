import React, { FC, useState } from 'react';
import '../App.css';
import { Layout, Menu } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    BrowserRouter
  } from "react-router-dom";
import List from './List';
import LoginPage from './loginpage';


interface listEntity {
  atr: string;
}


export const Mainpage :  React.FC = () => {

  const [listState, setListState] = useState('');
  const [listEntity, setListEntyty] = useState<listEntity>();
  
  const { Header, Sider, Content, Footer } = Layout;
//   toggle = () => {
//     this.setState({
//       collapsed: !this.state.collapsed,
//     });
//   };

    return (
      <Layout style={{width: '100%', height: '100vh'}}>
        <Sider >
          <div className="logo" />
          <Menu style={{marginTop: '20px'}} theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" >
                <Link className="list" to='/list'>Списки по підрозділам</Link>
            </Menu.Item>
            <Menu.Item key="2">
                Списки по групам
            </Menu.Item>
            <Menu.Item key="3" >
                Статистика
            </Menu.Item>
            <Menu.Item key="4" >
               <Link to='/login'>Вхід</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
            }}
          >
              <Route exact path='/list' component={List}></Route>
              <Route exact path='/login' component={LoginPage}></Route>
          </Content>
        </Layout>
      </Layout>
    );
}


export default Mainpage;