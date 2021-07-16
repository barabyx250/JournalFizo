import React, { useEffect, useState } from "react";
import { Button, Layout, Menu, message } from "antd";
import ConnectionManager from "../connection/connection";
import { RequestType } from "../types/requests";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DivisionList from "./DivisionList";
import GroupList from "./GroupListPage";
import ListStandarts from "./ListStandarts";
import Statistic from "./Statistic";
import LoginPage from "./loginpage";

export const MainPage: React.FC<{}> = () => {
  const [munuItemLogin, setMenuItemLogin] = useState("block");
  const [munuItemListStandarts, setMunuItemListStandarts] = useState("none");

  const { Sider, Content } = Layout;

  const error = () => {
    message.error("Не вірні данні користувача!");
  };

  const success = () => {
    message.success("Вхід виконано!");
  };

  useEffect(() => {
    ConnectionManager.registerResponseHandler(RequestType.MESSAGE, (m: any) => {
      if (m === true) {
        setMenuItemLogin("none");
        setMunuItemListStandarts("block");
        success();
        // window.location.href = '/listStatistic';
      } else if (m === false) {
        error();
      }
    });
    ConnectionManager.registerResponseHandler(RequestType.ERROR, (m: any) => {
      message.error(m);
    });
  }, []);

  return (
    <Layout style={{ width: "100%", height: "100vh" }}>
      <Router>
        <Sider>
          <div className="logo" />
          <Route>
            <Menu
              style={{ marginTop: "20px" }}
              theme="dark"
              mode="inline"
              // defaultSelectedKeys={["1"]}
            >
              <Menu.Item className="list" key="1">
                <Link to="/listDivision">Списки по підрозділам</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/listGroup">Списки по групам</Link>
              </Menu.Item>
              <Menu.Item key="3" style={{ display: munuItemListStandarts }}>
                <Link to="/listStandarts"> Списки нормативів</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/listStatistic">Статистика</Link>
              </Menu.Item>
              <Menu.Item key="5" style={{ display: munuItemLogin }}>
                <Link to="/login">Увійти</Link>
              </Menu.Item>
              <Button
                onClick={() => {
                  window.location.href = "/login";
                }}
                type="ghost"
                style={{
                  width: "100%",
                  paddingLeft: "25px",
                  textAlign: "left",
                  border: "none",
                  color: "#969595",
                  display: munuItemListStandarts,
                }}
              >
                Вийти
              </Button>
            </Menu>
          </Route>
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
            }}
          >
            <Route path="/listDivision" component={DivisionList}></Route>
            <Route path="/listGroup" component={GroupList}></Route>
            <Route path="/listStandarts" component={ListStandarts}></Route>
            <Route path="/listStatistic" component={Statistic}></Route>
            <Route path="/login" component={LoginPage}></Route>
          </Content>
        </Layout>
      </Router>
    </Layout>
  );
};
