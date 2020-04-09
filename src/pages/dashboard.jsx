import React, { useState } from 'react';
import { Fragment } from 'react';
import { Menu, Layout } from 'antd';
import { MessageOutlined, PlusCircleOutlined, TagOutlined } from '@ant-design/icons';


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
import 'antd/dist/antd.css';
import '../components/styles/Dashboard.scss'
import { Posts, NewPost, Inbox } from '../components/DasboardContent';
const { Content, Sider } = Layout;


export default function Dashboard() {
    // const media = window.matchMedia(" (max-width: 600px)")
    const [content, setContent] = useState(<NewPost />)
    // media.addListener(() => {
    //     if (media.matches !== menuClosed) {
    //         setMenuClosed(media.matches)
    //     }
    // })

    let handleContent = e => {
        console.log('click ', e.key);
        switch (e.key) {
            case "new":
                setContent(<NewPost />)
                break;
            case "posts":
                setContent(<Posts />)
                break;
            case "inbox":
                setContent(<Inbox />)
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
                    onBreakpoint={broken => {
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
                        defaultSelectedKeys={['new']}
                    >
                        <Menu.Item className="menu-item" key="new" >
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
                <Layout style={{backgroundColor: "#fff"}}>
                    {/* <Header className="site-layout-sub-header-background" style={{ padding: 0 }} /> */}
                    <Content className="content">
                        {content}
                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
                </Layout>
            </Layout>

            {/* <Button className="toggleMenu" style={{ width: menuClosed ? "5rem" : "16rem" }} type="primary" onClick={() => {
                setMenuClosed(!menuClosed)
            }}>
                {menuClosed ? <RightOutlined /> : <LeftOutlined />}


            </Button>
            <Menu
                onClick={handleClick}
                style={{ width: menuClosed ? "5rem" : "16rem" }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode={menuClosed ? "horizontal" : "inline"}
                inlineCollapsed={menuClosed}

            >
                <Menu.Item key="1">
                    <PieChartOutlined />
                    <span>Agregar publicación</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <PieChartOutlined />
                    <span>Publicaciones</span>
                </Menu.Item>
                <Menu.Item key="3">
                    <PieChartOutlined />
                    <span>Inbox</span>
                </Menu.Item>
            </Menu> */}
        </Fragment>
    )
}