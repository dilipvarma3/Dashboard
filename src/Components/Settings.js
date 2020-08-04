import React from 'react';
import {Auth} from 'aws-amplify';
import { Form, Input, InputNumber,Button, Table,  Checkbox , Alert, Popconfirm, Select, message} from 'antd';
import {CognitoUserPool} from 'amazon-cognito-identity-js'


export default class Settings extends React.Component{
    state={
        token:"",
        oldpass:"",
        conpass:"",
        pass:""
    }
    componentDidMount=()=>{
        Auth.currentSession().then(response=>{
           this.setState({token:response.getIdToken().getJwtToken()}) 
        
    })
    
}
handleChange=(event)=> { 
  this.setState({oldpass:event.target.value})
}
handleChange1=(event)=> { 
  this.setState({pass:event.target.value})
}
handleChange2=(event)=> { 
  this.setState({conpass:event.target.value})
}
save=()=>{
  
    if (this.setState.conpass==this.setState.pass)
    {
      Auth.currentAuthenticatedUser()
    .then(user => {
        return Auth.changePassword(user, this.state.oldpass, this.state.pass);
    })
    .then(data => {
      console.log(data)
      
    this.setState(
      {
        oldpass:"",
        conpass:"",
        pass:""
      }
      
    )
    message.success("Password Changed Successfully")
  }
    )
    .catch(err => 
      {
        console.log(err)
        message.error("Failed to change password")
      }
        );
  }
}
   
    render(){
        return(
            <>
            <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
           
          >
      <Form.Item
      label="Old Password"
      name="oldpassword"
      rules={[
        {
          required: true,
          message: 'Please input your old password!',
        },
      ]}
    >
      <Input.Password value={this.state.oldpass} onChange={this.handleChange} />
    </Form.Item>

    <Form.Item
      label="New Password"
      name="newpassword"
      rules={[
        {
          required: true,
          message: 'Please input your new password!',
        },
      ]}
    >
      <Input.Password value={this.state.pass} onChange={this.handleChange1} />
    </Form.Item>
    <Form.Item
      label="Confirm New Password"
      name="confirmpassword"
      rules={[
        {
          required: true,
          message: 'Please confirm your new password!',
        },
      ]}
    >
      <Input.Password value={this.state.conpass} onChange={this.handleChange2} />
    </Form.Item>
    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit" onClick={(e)=>
          this.save()}>
        Save
      </Button>
     
    </Form.Item>
  </Form>
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