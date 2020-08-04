import React from 'react';
import { Layout, Avatar, Menu, Breadcrumb, Skeleton, Drawer, Button, Popover } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

export default class Home extends React.Component{
    render(){
    return(
        <Content style={{ padding: '0 50px' }}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item>Welcome Home</Breadcrumb.Item>
                                </Breadcrumb>
            
            </Content>
    )
    }
}