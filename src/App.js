

import React from 'react';
import './App.css';
import { Layout, Avatar, Menu, Breadcrumb, Skeleton, Drawer, Button, Popover } from 'antd';
import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';
import { getTwoToneColor, setTwoToneColor, PhoneOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import { Form, Input, InputNumber, Table,  Checkbox } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import { Empty } from 'antd';
import PhoneMissedIcon from '@material-ui/icons/PhoneMissed';
import SvgIcon from '@material-ui/core/SvgIcon';
import PhoneIcon from '@material-ui/icons/Phone';
import Icon from '@material-ui/core/Icon';
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignOut } from '@aws-amplify/ui-react';
import axios from 'axios';
import withOAuth from 'aws-amplify';
import {Auth} from 'aws-amplify';


const { TabPane } = Tabs;

//import { Link } from 'react-router';

const { Header, Footer, Sider, Content } = Layout;


 export default class App extends React.Component {
    state = {
        pagename: "",
        details: [],
        name:"",
        phno:0,
        email:"",
        searchText: '',
    searchedColumn: '',  
    visible: false,
    token:"",
    hours:0,
    minutes:0,
    timeOfDay:{
      hours:this.hours,
      minutes:this.minutes
    }
    // test:
     }
    
    // async componentDidMount(){
    //   const url="https://virtserver.swaggerhub.com/good-morning-c/DashboardAPI/1.0.0/clients/";
    //   const response= await fetch(url);
    //   const data= await response.json();
    //   console.log(data[0].careCircle[0].name); // data retrievel way
    //   console.log(data[0].phoneNumber);// phno retrievel
    //   this.setState({details:data})

    // }
    showDrawer = () => {
    
      
      this.setState({
        visible: true,
      });
    };
    showClients=(e)=>{
      this.setState({
        pagename:"allclients"
    });
    Auth.currentSession().then(response=>{
      this.setState({token:response.getIdToken().getJwtToken()})
      // console.log(this.state.token)
      axios.get("https://staging.goodmorningcalls.com/api/clients",{
      headers:{
      authorization: this.state.token}
    }
  )
    .then((res)=>{
      console.log(res);
    const repos=res.data.data;
    console.log(repos)
    this.setState({details:repos});
    console.log(this.state.details);
    
    })
    

    });
    // axios.defaults.headers.common['authorization']=`Bearer ${this.state.token}`
  //   axios.get("https://staging.goodmorningcalls.com/api",{
  //     headers:{
  //     authorization: this.state.token}
  //   }
  // )
  //   .then((res)=>{
  //     console.log(res);
  //   const repos=res.data;
  //   this.setState({details:repos});
  //   console.log(this.state.details);
  //   })
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
          handleChange3=(event)=> { 
            this.setState({hours: parseInt(event.target.value)}); 
          }
          handleChange4=(event)=> { 
            this.setState({minutes: parseInt(event.target.value)}); 
          }
    individuallog=(event)=>{
        // alert("hello"+this.state.details)
        
        
          this.setState({Test:'individual log'});
          //alert(this.state.Test)

      
        
    }
    
    addclient = () => {
        // this.setState((preveState) => {
        //     let st = preveState;
        //     st.details.push({
        //         name: this.state.name,
        //         phoneNumber: this.state.phno,
        //         email: this.state.email
        //     });
        Auth.currentSession().then(response=>{
          this.setState({token:response.getIdToken().getJwtToken()})
          console.log(this.state.token)
            //  const data={
            //   "id" : "3fa85f64-5717-4562-b3fc-2c963f66afa8",
            //   "name" : "Nick",
            //   "email" : "example@example1.com",
            //   "phoneNumber" : "+155555555551",
            //   "timeOfDay" : {
            //     "hours" : 10,
            //     "minutes" : 30
            //   },
            //   "careCircle" : [ {
            //     "name" : "j",
            //     "phoneNumber" : "+15555555554",
            //     "email" : "example2@example.com"
            //   } ],
            //   "userId" : "4fa81234-5717-4562-b3fc-2c963f66afa6"
            // }
            const data={
              // "id" : "3fa85f64-5717-4562-b3fc-2c963f66afa0",
              "name": this.state.name,
              
              "email":this.state.email,
              "phoneNumber":this.state.phno,
              
              "timeOfDay" : {
                "hours" : this.state.hours,
                "minutes" : this.state.minutes
              }
           
          }
          console.log(data)
            // alert("succesfully stored client details");
            // console.log(this.state.details);
            axios.post('https://staging.goodmorningcalls.com/api/clients',data,{
              headers:{
                authorization:this.state.token
              }
            } )
            .then(response=>{
              console.log(response)
            })
            .catch(error=>{
              console.log(error)
            })
            
            
            // return st;
            

        // })
        
        
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
          dataIndex: 'phoneNumber',
          key: 'phoneNumber',
          width: '20%',
          ...this.getColumnSearchProps('phoneNumber'),
        },
        {
          title: 'E-mail',
          dataIndex: 'email',
          key: 'email',
          ...this.getColumnSearchProps('email'),
        },
        {
          title: 'Time of Day',
          dataIndex: 'timeOfDay.hours',     //very useful fro mapping values from ui to server
          key: 'timeOfDay',
          // ...this.getColumnSearchProps('timeOfDay'), // to be checked while searching
        },
      ];
      
        return (
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
                                <Menu.Item key='home' onClick={(e) => this.setpagename("home")} > Home</Menu.Item>


                                <SubMenu key='calllog'
                                    title={
                                        <span>
                                            {/* <SvgIcon component={PhoneIcon} ></SvgIcon>  */}
                                            <span>Call</span>
                                        </span>
                                    }
                                >
                                  

                                    <Menu.Item key='History' onClick={(e) => this.setpagename("history")}>  History</Menu.Item>
                                    <Menu.Item key='upcomingcalls' onClick={(e) => this.setpagename("upcomingcalls")}>  Upcoming Calls</Menu.Item>


                                </SubMenu>
                                <SubMenu key='Clients'
                                    title={
                                        <span>
                                            <Icon type="people" />
                                            <span>Clients</span>
                                        </span>
                                    }
                                >

                                    <Menu.Item key='allclients' onClick={this.showClients } >Client list</Menu.Item>
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
                                                    <td>{this.state.details[0].careCircle[0].name}</td>
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
                                             <Table columns={columns} dataSource={this.state.details} onRowClick={this.showDrawer}>
                                  
                                       
                                               </Table>
                                               {this.state.visible?(   <Drawer
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
                                                       
                                           
        </Drawer>):(<></>)}
                                            
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
        <Input  onChange={this.handleChange1}/>
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
      <Form.Item
        label="Time of Day"
        name="timeOfDay"
        // rules={[
        //   {
        //     required: true,
        //     message: 'Please input the time!',
        //   },
        // ]}
      >
        <Form.Item
          name="hour"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input placeholder="Input hour" onChange={this.handleChange3}/>
        </Form.Item>
        <Form.Item
          name="minutes"
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
        >
          <Input placeholder="Input minutes" onChange={this.handleChange4}/>
        </Form.Item>
      </Form.Item>
        {/* <Input value={this.state.timeOfDay} onChange={this.handleChange3}/> */}
      {/* </Form.Item> */}

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
             </AmplifyAuthenticator>
        );
    }
}


// var details = [{
//     key:'1',
//     name: "Nancy",
//     phno: "9581004247",
//     email: "nancy@gmail.com"
// },
// {
//   key:'2',
//     name: "Dilip",
//     phno: "1232456789",
//     email: "Dilip@gmail.com"
// },
// {
//   key:'3',
//     name: "Blake",
//     phno: "12025312345",
//     email: "blake@gmail.com"
// },{
//   key:'4',
//   name: "Nancy",
//   phno: "9581004247",
//   email: "nancy@gmail.com"
// },
// {
// key:'5',
//   name: "Dilip",
//   phno: "1232456789",
//   email: "Dilip@gmail.com"
// },
// {
// key:'6',
//   name: "Blake",
//   phno: "12025312345",
//   email: "blake@gmail.com"
// },{
//   key:'7',
//   name: "Nancy",
//   phno: "9581004247",
//   email: "nancy@gmail.com"
// },
// {
// key:'8',
//   name: "Dilip",
//   phno: "1232456789",
//   email: "Dilip@gmail.com"
// },
// {
// key:'9',
//   name: "Blake",
//   phno: "12025312345",
//   email: "blake@gmail.com"
// }
// ]

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
  
  
// export class details1 extends React.Component {
// render()
// {
//   return(
//     <h1>hello</h1>
//   );
// }
// }