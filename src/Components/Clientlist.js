
import React from 'react';
import '../App.css';
import {Drawer, Button, Row, Col, Divider } from 'antd';
import { Form, Input, InputNumber, Table,  Checkbox , Popconfirm, Select} from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';
import axios from 'axios';
import {Auth} from 'aws-amplify';

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);
export default class Clientlist extends React.Component{
    state={
        details:[],
        token:"",
        visible:false,
        visible1:false,
        data:[],
    }
    
    constructor(props){
        super(props)
        this.columns=  [
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
              title: 'Call Time',
              dataIndex: 'timeOfDay',     
              key: 'timeOfDay',
              render:(text,record)=>
                <div>
                  <p>{record.timeOfDay.hours}:{record.timeOfDay.minutes} UTC</p>
                </div>
              
            },
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text, record) =>
                 
                  this.state.details.length >= 1 ? (
                    
                     <div>
                         <a onClick={()=>this.setState({data:record},this.handleEdit)}>Edit</a>||
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record)}>
                      <a>Delete</a>
                    </Popconfirm>||
                    <a onClick={()=>this.setState({data:record},this.handledetails)}>More details</a>
                    </div>

                    
                  ) : null,
              },
          ];
    }
    

    handleChange=(event)=>{
      this.setState((prevstate)=>{
        let st=prevstate
        st.data.name=event.target.value
        return st
      })
    }
    handleChange1=(event)=> { 
      this.setState({data:{...this.state.data,phoneNumber: event.target.value}})
     }
     handleChange2=(event)=> { 
      this.setState({data:{...this.state.data,email: event.target.value}})
     }
     handleChange3=(event)=> { 
      this.setState({data:{...this.state.data,timeOfDay:{...this.state.data.timeOfDay,hours: event.target.value}}})
     }
     handleChange4=(event)=> { 
      this.setState({data:{...this.state.data,timeOfDay:{...this.state.data.timeOfDay,minutes: event.target.value}}})
     }
     handleChange5=(event,i)=>{
      this.setState((prevstate)=>{
        let st=prevstate
        st.data.care_circle[i].name=event.target.value
        return st
      })
     }
     handleChange6=(event,i)=>{
      this.setState((prevstate)=>{
        let st=prevstate
        st.data.care_circle[i].email=event.target.value
        return st
      })
     }
     handleChange7=(event,i)=>{
      this.setState((prevstate)=>{
        let st=prevstate
        st.data.care_circle[i].phoneNumber=event.target.value
        return st
      })
     }

    
    handledetails=()=>{
    
      this.setState({visible:true});
      console.log(this.state.data)
    
      console.log(this.state.data)
      console.log(this.state.data.timeOfDay)
    }
    handleEdit=()=>{
           
            this.setState({visible1:true});
            console.log(this.state.data)
            console.log("True")
    }
    onClose = () => {
      this.setState({
        visible: false,
        visible1:false
      });
    };
    handleDelete = key => {
        console.log(key)
        console.log(this.state.details.length)
        console.log(this.state.details)
        console.log(this.state.token)
        const data=key._id
        console.log(data)
        
        axios.delete(`https://staging.goodmorningcalls.com/api/clients/${data}`,{
            headers:{
            authorization: this.state.token}
          }
        )
        .then(response=>{
            console.log(response)
            console.log(this.state.details)
          })
          .catch(error=>{
            console.log(error)
          })
          axios.get("https://staging.goodmorningcalls.com/api/clients",{
            headers:{
            authorization: this.state.token}
          }
        )
          .then((res)=>{
            console.log(res);
          const repos=res.data.data;
          this.setState({details:repos});
          console.log(this.state.details);
          
          })
        
      };
     componentDidMount=()=>{
         Auth.currentSession().then(response=>{
            this.setState({token:response.getIdToken().getJwtToken()})
             console.log(this.state.token)
             
            axios.get("https://staging.goodmorningcalls.com/api/clients",{
            headers:{
            authorization: this.state.token}
          }
        )
          .then((res)=>{
            console.log(res);
          const repos=res.data.data;
          this.setState({details:repos});
          console.log(this.state.details);
          
          })
          .catch((err=>console.log(err)))
     })
    }
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
      saveclient=()=>{
        console.log(this.state.token)
        const data=this.state.data._id
        console.log(data)
        const data1={
          "name": this.state.data.name,
          
          "email":this.state.data.email,
          "phoneNumber":this.state.data.phno,
          
          "timeOfDay" : {
            "hours" : this.state.data.timeOfDay.hours,
            "minutes" : this.state.data.timeOfDay.minutes
          },
          "careCircle": [
            {
                "name": this.state.data.careCircle[0].name,
                "email": this.state.data.careCircle[0].email,
                "phoneNumber": this.state.data.careCircle[0].phoneNumber
            }
        ]
       
      }
        axios.put(`https://staging.goodmorningcalls.com/api/clients/${data}`,data1,{
          headers:{
          authorization: this.state.token}
        }
      )
      .then(response=>{
          console.log(response)
          alert("success")
        })
        .catch(error=>{
          console.log(error)
        })
        axios.get("https://staging.goodmorningcalls.com/api/clients",{
          headers:{
          authorization: this.state.token}
        }
      )
        .then((res)=>{
          console.log(res);
        const repos=res.data.data;
        this.setState({details:repos});
        console.log(this.state.details);
        
        })
      }
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
    showDrawer=()=>{
        this.setState({visible:true})
    }
    render(){
    
        return(
            <>
       
            <Table columns={this.columns} dataSource={this.state.details} >
                                  
                                       
            </Table>
            {this.state.visible?(<Drawer
                                                    title="User Details"
                                                    width="450"
                                                    placement="right"
                                                    closable={true}
                                                    onClose={this.onClose}
                                                    visible={this.state.visible}
                                                    getContainer={false}
                                                    style={{ position: 'absolute' }}
                                                     >
                                
                                
          <Row>
            <Col span={120}>
              <DescriptionItem title="Name" content={this.state.data.name} />
            </Col>
            
          </Row>
          <Row>
          <Col span={120}>
              <DescriptionItem title="E-mail Address" content={this.state.data.email} />
            </Col>
            
          </Row>
          <Row>
            <Col span={120}>
              <DescriptionItem title="Phone Number" content={this.state.data.phoneNumber} />
            </Col>
            
          </Row>
          <Row>
            <Col span={120}>
           
            <p className="site-description-item-profile-p-label">Time Of Day:{this.state.data.timeOfDay.hours}:{this.state.data.timeOfDay.minutes} UTC</p>
          
            </Col>
            
          </Row>
          <Divider />
          <p className="site-description-item-profile-p">Care Circle Details</p>
          {
            this.state.data.care_circle.map(person=>(
             
                <div key={person.name}>
                  <Row>
                  
                  <Col span={12}>
                    <DescriptionItem title="Name" content={person.name} />
                  </Col>
                  
                </Row>
                <Row>
                  <Col span={12}>
                    <DescriptionItem title="E-mail" content={person.email} />
                  </Col>
                  <Col span={12}>
                    <DescriptionItem title="Phone Number" content={person.phoneNumber} />
                  </Col>
                </Row>
                </div>
            )
              
              )
          }

          
          
                                            
                                           
              </Drawer>):(<></>)}
        {this.state.visible1?(<Drawer
                                                    title="User Details"
                                                    width="650"
                                                    placement="right"
                                                    closable={true}
                                                    onClose={this.onClose}
                                                    visible={this.state.visible1}
                                                    getContainer={false}
                                                    style={{ position: 'absolute' }}
                                                     >
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
      <Input type="text" value={this.state.data.name} onChange={this.handleChange}/>
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
      <Input  value={this.state.data.phoneNumber} onChange={this.handleChange1}/>
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
      <Input value={this.state.data.email} onChange={this.handleChange2}/>
    </Form.Item>
    <Form.Item
      label="Time of Day"
      name="timeOfDay"
    >
      <Form.Item
        name="hour"
        rules={[{ required: true }]}
        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
      >
        <Input placeholder="Input hour(In UTC)" value={this.state.data.timeOfDay.hours} onChange={this.handleChange3}/>
      </Form.Item>
      <Form.Item
        name="minutes"
        rules={[{ required: true }]}
        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
      >
        <Input placeholder="Input minutes(in UTC)" value={this.state.data.timeOfDay.minutes} onChange={this.handleChange4}/>
      </Form.Item>
    </Form.Item>
    <Divider/>
    
     <h4>Care Circle Details</h4>
     {
       this.state.data.care_circle.map((person,index)=>{
         return (
           <div key={"carecircleupdate"+index}>
           <Form.Item
      label="Name"
        name="name"
        rules={[{ required: true }]}
       
      >
        
        <Input  value={person.name} onChange={(e)=>this.handleChange5(e,index)}/>
      </Form.Item>
      <Form.Item
      label="E-mail"
        name="email"
        rules={[{ required: true }]}
      >
        <Input  value={person.email} onChange={(e)=>this.handleChange6(e,index)}/>
      </Form.Item>
      <Form.Item
      label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true }]}
      >
        <Input  value={person.phoneNumber} onChange={(e)=>this.handleChange7(e,index)}/>
      </Form.Item>
           </div>
         )

       }

       )
       
     }
    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit" onClick={(e)=>
          this.saveclient()}>
        Save
      </Button>
    </Form.Item>
  </Form>
        </Drawer>):(<></>)}
</>
        )
    }
}
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
