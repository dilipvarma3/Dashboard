import React from 'react';
import './App.css';
import { Layout, Avatar, Menu, Breadcrumb, Skeleton, Drawer, Button, Popover } from 'antd';
import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import 'antd/dist/antd.css';
import Icon from '@material-ui/core/Icon';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import Home from './Components/Home';
import About from './Components/About';
import History from './Components/History';
import Upcomingcalls from './Components/Upcomingscalls';
import Settings from './Components/Settings';
import Notifications from './Components/Notifications';
import Clientlist from './Components/Clientlist';
import Addclient from './Components/Addclient';
const { Header, Footer, Sider, Content } = Layout;


export default class App1 extends React.Component{
    state={
        pagename:""
    }
    setpagename = (name) => {
        this.setState({ pagename: name })
    }
    render(){
        return(
            
                 <AmplifyAuthenticator usernameAlias="email" style={{ textAlign: 'center' }} >
            <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        formFields={[
          {
            type: "email",
            label: "E-mail*",
            placeholder: "E-mail address",
            required: true,
          },
          {
            type: "password",
            label: "Password*",
            placeholder: "Password",
            required: true,
          },
          {
            type: "phone_number",
            label: "Phone",
            required: false,
          },
        ]} 
      />
      <Router>
      <div className="App"> 
      <Layout>
                    <Header style={{ padding: 10 }}>
                      
                        <Avatar style={{ float: 'right' }} src='./dp.png' />
                        <AmplifySignOut class="button" style={{ float: 'right' }}  />
                        
                        <Title style={{ color: 'white' }} level={3}>Dashboard</Title>
                    </Header>
                    <Layout>
                        <Sider>
                            <Menu

                                defaultSelectedKeys={['Dashboard']}
                                mode="inline"
                            >
                               <Menu.Item key='home' onClick={(e) => this.setpagename("home")} > <Link to="/home"></Link>Home</Menu.Item>


                                <SubMenu key='calllog'
                                    title={
                                        <span>  
                                            <span>Call</span>
                                        </span>
                                    }
                                >
                                  

                                    <Menu.Item key='history' onClick={(e) => this.setpagename("history")}> <Link to="/history"></Link> History</Menu.Item>
                                    <Menu.Item key='upcomingcalls' onClick={(e) => this.setpagename("upcomingcalls")}><Link to="/upcomingcalls"></Link>  Upcoming Calls</Menu.Item>


                                </SubMenu>
                                <SubMenu key='Clients'
                                    title={
                                        <span>
                                            <Icon type="people" />
                                            <span>Clients</span>
                                        </span>
                                    }
                                >

                                    <Menu.Item key='clientlist' ><Link to="/clientlist"></Link>Client list</Menu.Item>
                                    <Menu.Item key='addclient' onClick={(e) => this.setpagename("addclient")}><Link to="/addclient"></Link>Add client</Menu.Item>


                                </SubMenu>

                                <Menu.Item key='settings'onClick={(e) => this.setpagename("settings")}><Link to="/settings"></Link>Settings</Menu.Item>
                                <Menu.Item key='notifications'onClick={(e) => this.setpagename("notifications")}><Link to="/notifications"></Link>Notifications </Menu.Item>
                            </Menu>

                        </Sider>
                        <Layout>
                            <Content style={{ padding: '0 50px' }}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item></Breadcrumb.Item>
                                </Breadcrumb>
            <div style={{ background: '#fff', padding: 24, minHeight: 635 }}>
            <Switch> 
              <Route exact path='/home' component={Home}></Route> 
              <Route exact path='/history' component={History}></Route> 
              <Route exact path='/upcomingcalls' component={Upcomingcalls}></Route> 
              <Route exact path='/settings' component={Settings}></Route> 
              <Route exact path='/addclient' component={Addclient}></Route>                         
              <Route exact path='/notifications' component={Notifications}></Route> 
              <Route exact path='/clientlist' component={Clientlist}></Route> 

            </Switch>

            </div>
             
            </Content>
            <Footer style={{ textAlign: 'center' }}>WinWin Homesharing</Footer>
          </Layout>
            </Layout>
            </Layout>
          </div> 
      </Router>
      
      </AmplifyAuthenticator>
        

          
        );
    }
}