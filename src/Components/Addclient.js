
import React from 'react';
import '../App.css';
import {Button} from 'antd';
import { Form, Input, InputNumber, Table,  Checkbox } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import {Auth} from 'aws-amplify';


export default class Addclient extends React.Component{
    state={
        name:"",
        email:"",
        phno:"",
        hours:0,
        minutes:0

    }
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

    addclient = () => {
        Auth.currentSession().then(response=>{
          this.setState({token:response.getIdToken().getJwtToken()})
          console.log(this.state.token)
            const data={
              "name": this.state.name,
              
              "email":this.state.email,
              "phoneNumber":this.state.phno,
              
              "timeOfDay" : {
                "hours" : this.state.hours,
                "minutes" : this.state.minutes
              },
              "careCircle": [
                {
                    "name": '',
                    "email": '',
                    "phoneNumber": ''
                }
            ]
           
          }
          console.log(data)
            axios.post('https://staging.goodmorningcalls.com/api/clients',data,{
              headers:{
                authorization:this.state.token
              }
            } )
            .then(response=>{
              console.log(response)
              alert("succesfully stored client details")
              
            })
            .catch(error=>{
              console.log(error)
            })
    })
  }
    render(){
        return(
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
      <Input  value={this.state.phno} onChange={this.handleChange1}/>
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