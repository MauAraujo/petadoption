import React, { useState } from 'react';
import { Fragment } from 'react';
import { Menu, Button } from 'antd';

import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    RightOutlined,
    LeftOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../components/styles/Dashboard.scss'
const { SubMenu } = Menu;

function handleClick(e) {
    console.log('click ', e);
};

export default function Dashboard() {
    const media = window.matchMedia(" (max-width: 600px)")
    const [menuClosed, setMenuClosed] = useState(false)

    media.addListener(() => {
        if (media.matches !== menuClosed) {
            setMenuClosed(media.matches)
        }
    })
    return (
        <Fragment>
            <Button className="toggleMenu" style={{ width: menuClosed ? "5rem" : "16rem" }} type="primary" onClick={() => {
                setMenuClosed(!menuClosed)
            }}>
                {menuClosed ? <RightOutlined /> :<LeftOutlined />}

               
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
                    <span>Option 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <PieChartOutlined />
                    <span>Option 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                    <PieChartOutlined />
                    <span>Option 3</span>
                </Menu.Item>
            </Menu>
            Contenio
        </Fragment>
    )
}