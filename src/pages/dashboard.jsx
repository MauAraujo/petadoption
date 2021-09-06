import React, { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import { Menu, Layout } from "antd";
import {
  MessageOutlined,
  PlusCircleOutlined,
  TagOutlined,
} from "@ant-design/icons";

// import {
//     AppstoreOutlined,
//     MenuUnfoldOutlined,
//     MenuFoldOutlined,
//     RightOutlined,
//     LeftOutlined,
//     PieChartOutlined,
//     DesktopOutlined,
//     ContainerOutlined,
//     MailOutlined,
// } from '@ant-design/icons';
import "../components/styles/Dashboard.scss";
import { Posts, NewPost, Inbox } from "../components/DasboardContent";
import { GetSession } from "../services/auth.service";
const { Content, Sider } = Layout;

export default function Dashboard() {
    // const media = window.matchMedia(" (max-width: 600px)")
    const session = useRef(() => GetSession());
    const [content, setContent] = useState(<Posts user={session}/>);

  // media.addListener(() => {
  //     if (media.matches !== menuClosed) {
  //         setMenuClosed(media.matches)
  //     }
  // })

  useEffect(() => {
    async function fetchSession() {
        const currentSession = await GetSession();
        const user = {
            "id" : currentSession.uid,
            "username": currentSession.username,
            "fullname" : currentSession.fullname
        };
       //this.setState({ session: session, user: user });
      session.current = { session: currentSession, user: user };
    }
    fetchSession();
  }, [session]);
  // async componentDidMount() {

  //   }

  let handleContent = (e) => {
      console.log("click ", e.key);
      switch (e.key) {
      case "new":
        setContent(<NewPost user={session.current.user} />);
        break;
      case "posts":
          setContent(<Posts user={session.current.user} />);
        break;
      case "inbox":
          setContent(<Inbox user={session.current.user} />);
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
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
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
            <Menu.Item className="menu-item" key="inbox">
              <MessageOutlined />
              <span className="nav-text">Inbox</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ backgroundColor: "#fff" }}>
          {/* <Header className="site-layout-sub-header-background" style={{ padding: 0 }} /> */}
          <Content className="content">{content}</Content>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
      </Layout>
    </Fragment>
  );
}
