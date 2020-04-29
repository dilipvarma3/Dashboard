import React from 'react';
import './App.css';
import { Layout, Avatar, Menu, Icon, Breadcrumb, Skeleton, Drawer, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';
import { getTwoToneColor, setTwoToneColor, PhoneOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import { Form, Input, Table,  Checkbox } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import { Empty } from 'antd';
import PhoneMissedIcon from '@material-ui/icons/PhoneMissed';
import SvgIcon from '@material-ui/core/SvgIcon';

const { TabPane } = Tabs;

//import { Link } from 'react-router';

const { Header, Footer, Sider, Content } = Layout;


export default class App extends React.Component {
    state = {
        pagename: "",
        details: details,
        name:"",
        phno:"",
        email:"",
        searchText: '',
    searchedColumn: '',
    //   
    visible: false
    }
    showDrawer = () => {
    
      
      this.setState({
        visible: true,
      });
    };
  
    onClose = () => {
      this.setState({
        visible: false,
      });
    };
    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
      render: text =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    });
  
    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };
    handleChange=(event)=> { 
           this.setState({name: event.target.value}); 
         }
         handleChange1=(event)=> { 
            this.setState({phno: event.target.value}); 
          }
          handleChange2=(event)=> { 
            this.setState({email: event.target.value}); 
          }
    individuallog=(event)=>{
        // alert("hello"+this.state.details)
        
        
          this.setState({Test:'individual log'});
          //alert(this.state.Test)

      
        
    }
    
    addclient = () => {
        this.setState((preveState) => {
            let st = preveState;
            st.details.push({
                name: this.state.name,
                phno: this.state.phno,
                email: this.state.email
            });
            alert("succesfully stored client details");
            return st;
            

        })
    }
    setpagename = (name) => {
        this.setState({ pagename: name })
    }
    render() {
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: '30%',
          ...this.getColumnSearchProps('name'),
        },
        {
          title: 'Phno',
          dataIndex: 'phno',
          key: 'phno',
          width: '20%',
          ...this.getColumnSearchProps('phno'),
        },
        {
          title: 'E-mail',
          dataIndex: 'email',
          key: 'email',
          ...this.getColumnSearchProps('email'),
        },
      ];
        return (
          <Router>
            <div className="App">
                
                <Layout>
                    <Header style={{ padding: 10 }}>
                        <Avatar style={{ float: 'right' }} src='./dp.png' />
                        <Title style={{ color: 'white' }} level={3}>Dashboard</Title>
                    </Header>
                    <Layout>
                        <Sider>
                            <Menu

                                defaultSelectedKeys={['Dashboard']}
                                mode="inline"
                            >
                                <Menu.Item key='home' onClick={(e) => this.setpagename("home")} > Home</Menu.Item>


                                <SubMenu key='calllog'
                                    title={
                                        <span>
                                            <Icon type="PhoneOutlined" />
                                            <span>Calllog</span>
                                        </span>
                                    }
                                >
                                  

                                    <Menu.Item key='History' onClick={(e) => this.setpagename("history")}> History</Menu.Item>
                                    <Menu.Item key='upcomingcalls' onClick={(e) => this.setpagename("upcomingcalls")}> Upcoming Calls</Menu.Item>


                                </SubMenu>
                                <SubMenu key='Clients'
                                    title={
                                        <span>
                                            <Icon type="people" />
                                            <span>Clients</span>
                                        </span>
                                    }
                                >

                                    <Menu.Item key='allclients' onClick={(e) => this.setpagename("allclients")} >All Clients</Menu.Item>
                                    <Menu.Item key='addclient' onClick={(e) => this.setpagename("addclient")}>Add client</Menu.Item>


                                </SubMenu>

                                <Menu.Item key='settings'onClick={(e) => this.setpagename("settings")}>Settings</Menu.Item>
                                <Menu.Item key='notifications'onClick={(e) => this.setpagename("notifications")}>Notifications </Menu.Item>
                            </Menu>

                        </Sider>
                        <Layout>
                            <Content style={{ padding: '0 50px' }}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                                </Breadcrumb>
                                <div style={{ background: '#fff', padding: 24, minHeight: 635 }}>
                              
                                    
                                       { (this.state.pagename === "home") ? (<><h1>Welcome home</h1></>):(<></>)}
                                      {  (this.state.pagename === "upcomingcalls") ? 
                                    (<>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="ts">Client Name</th>
                                                    <th className="ts">Scheduled Call</th>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Nancy</td>
                                                    <td>Today, 5:00pm EST</td>
                                                   
                                                </tr>
                                            </tbody>
                                        </table>
                                        </>
                                        ):(<></>)  
                                    }
                                      {  (this.state.pagename === "settings") ? (<><h1>Settings</h1></>):(<></>)}
                                      {  (this.state.pagename === "notifications") ? (<><h1>Notifications</h1></>):(<></>)}
                                       { (this.state.pagename === "allclients") ? (
                                            <>
                                             <Table columns={columns} dataSource={details} onRowClick={this.showDrawer}  >
                                  
                                       
                                               </Table>
                                               <Drawer
                                                    title="Individual logs"
                                                    width="450"
                                                    placement="right"
                                                    closable={false}
                                                    onClose={this.onClose}
                                                    visible={this.state.visible}
                                                    getContainer={false}
                                                    style={{ position: 'absolute' }}
                                                     >
                                                       <Avatar size={300} icon={<UserOutlined />} />
                                                       <Tabs defaultActiveKey="1" >
    <TabPane tab="Missed call" key="1">
    <table>
                                            <thead>
                                                
                                            </thead>
                                            <tbody>
                                                <tr>
                                                   <td><SvgIcon component={PhoneMissedIcon}></SvgIcon></td>
                                                    <td>Today, 11:00pm EST</td>
                                                   
                                                </tr>
                                            </tbody>
                                        </table>
    </TabPane>
    <TabPane tab="Received call" key="2">
      <Empty/>
    </TabPane>
    <TabPane tab="Dialled call" key="3">
     <Empty/>
    </TabPane>
  </Tabs>
                                                       
                                           
        </Drawer>
                                            </>
                                        ) : (<></>)
                                    }
                                    {
                                        (this.state.pagename === "addclient") ? (
                                            // <button onClick={(e)=>this.addclient()}>add</button>
                                            <>
                                            <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
     
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input type="text" value={this.state.name} onChange={this.handleChange}/>
      </Form.Item>

      <Form.Item
        label="Phno"
        name="phno"
        rules={[
          {
            required: true,
            message: 'Please input your phno!',
          },
        ]}
      >
        <Input value={this.state.phno} onChange={this.handleChange1}/>
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input value={this.state.email} onChange={this.handleChange2}/>
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" onClick={(e)=>
            this.addclient()}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  
                                            </>
                                        ):(<></>)
                                    }
                                    {
                                        (this.state.pagename==="history")?(<>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="ts">Client Name</th>
                                                    <th className="ts">Time of Call</th>
                                                    <th className="ts"> Result</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Dilip</td>
                                                    <td>12:00pm, 4th March 2020</td>
                                                    <td>Resolved</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        </>
                                        ):(<></>)
                                    }
                                </div>
                                
                            </Content>

                            <Footer style={{ textAlign: 'center' }}>WinWin Homesharing</Footer>
                        </Layout>
                    </Layout>
                </Layout>

            </div>
            
            </Router>
        );
    }
}

const details = [{
    key:'1',
    name: "Nancy",
    phno: "9581004247",
    email: "nancy@gmail.com"
},
{
  key:'2',
    name: "Dilip",
    phno: "1232456789",
    email: "Dilip@gmail.com"
},
{
  key:'3',
    name: "Blake",
    phno: "12025312345",
    email: "blake@gmail.com"
},{
  key:'4',
  name: "Nancy",
  phno: "9581004247",
  email: "nancy@gmail.com"
},
{
key:'5',
  name: "Dilip",
  phno: "1232456789",
  email: "Dilip@gmail.com"
},
{
key:'6',
  name: "Blake",
  phno: "12025312345",
  email: "blake@gmail.com"
},{
  key:'7',
  name: "Nancy",
  phno: "9581004247",
  email: "nancy@gmail.com"
},
{
key:'8',
  name: "Dilip",
  phno: "1232456789",
  email: "Dilip@gmail.com"
},
{
key:'9',
  name: "Blake",
  phno: "12025312345",
  email: "blake@gmail.com"
}
]

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  }
  
  
export class details1 extends React.Component {
render()
{
  return(
    <h1>hello</h1>
  );
}
}