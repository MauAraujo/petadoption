import React, { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import { Menu, Layout } from "antd";
import { PlusCircleOutlined, TagOutlined } from "@ant-design/icons";

import "../components/styles/Dashboard.scss";
import { Posts, NewPost } from "../components/DashboardContent";
import { GetSession } from "../services/auth.service";
const { Content, Sider } = Layout;

export default function Dashboard() {
  const session = useRef(() => GetSession());
  const [content, setContent] = useState(<Posts user={session} />);

  useEffect(() => {
    async function fetchSession() {
      const currentSession = await GetSession();
      const user = {
        id: currentSession.uid,
        username: currentSession.username,
        fullname: currentSession.fullname,
      };
      session.current = { session: currentSession, user: user };
    }
    fetchSession();
  }, [session]);

  let handleContent = (e) => {
    switch (e.key) {
      case "new":
        setContent(<NewPost user={session.current.user} />);
        break;
      case "posts":
        setContent(<Posts user={session.current.user} />);
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <Layout>
        <Sider
          theme="light"
          breakpoint="lg"
          collapsedWidth="0"
          zeroWidthTriggerStyle={{ top: 0 }}
        >
          <div className="logo sider" />
          <Menu
            onClick={handleContent}
            className="menu"
            mode="inline"
            defaultSelectedKeys={["posts"]}
          >
            <Menu.Item className="menu-item" key="new">
              <PlusCircleOutlined />
              <span className="nav-text">Nueva Publicación</span>
            </Menu.Item>
            <Menu.Item className="menu-item" key="posts">
              <TagOutlined />
              <span className="nav-text">Publicaciones</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ backgroundColor: "#fff" }}>
          <Content className="content">{content}</Content>
        </Layout>
      </Layout>
    </Fragment>
  );
}
