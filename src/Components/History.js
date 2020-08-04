import React from 'react';
import axios from 'axios';
import {Auth} from 'aws-amplify';
import { Form, Input, InputNumber, Table,  Checkbox , Popconfirm, Select} from 'antd';



export default class History extends React.Component{
    state={
        details:[],
        token:""
    }
    constructor(props){
        super(props)
        this.columns=  [
            {
              title: 'ClientId',
              dataIndex: 'clientId',
              key: 'clientId',
              width: '30%',
            },
            {
              title: 'Result',
              dataIndex: 'result',
              key: 'result',
              width: '20%',
            },
            {
              title: 'Message',
              dataIndex: 'message',
              key: 'message',
            },
           
           
          ];
    }
    componentDidMount=()=>{
        
        Auth.currentSession().then(response=>{
           this.setState({token:response.getIdToken().getJwtToken()})
           axios.get("https://staging.goodmorningcalls.com/api/loggedCalls",{
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
         .catch(error=>{
            console.log(error)
          })
         
         
    })
   }
    render(){
        return(
            <Table columns={this.columns} dataSource={this.state.details} >
            </Table>
           
        )
    }
}