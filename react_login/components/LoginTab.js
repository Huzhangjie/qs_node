import React from 'react'
import { Layout, Form, Icon, Input, Checkbox, Button, Message } from 'antd'
import 'whatwg-fetch'

const FormItem = Form.Item

class LoginTap extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault();
    let values = await this.getFormValues();
    if (values) {
      // console.log('表单ok')
      fetch('/home/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(values)
      }).then(res => {
        console.log(res)
        res.json().then(res => {
          console.log(res)
          Message.info(res.message)
          if(res.success) {
            location.href = '/main'
          }
        })
      })
    }
  }
  getFormValues() {
    return new Promise((resolve, reject) => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          resolve(values);
        } else {
          reject(false);
        }
      })
    }) 
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div style={{width: '280px', margin: "0 auto"}}>
        <Form onSubmit={this.handleSubmit}>  
          <FormItem>
            {
              getFieldDecorator('username', {
                rules: [{ required: true, message: "please input the username"}]
              })(
                <Input addonBefore={<Icon type="user" />} placeholder="input the username"/>
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('password', {
                rules: [{ required: true, message: "please input the password"}]
              })(
                <Input addonBefore={<Icon type="lock" />} type="password" placeholder="input the username"  />
              )
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Checkbox>remember me</Checkbox>
              )
            }
            <Button type="primary" htmlType="submit" style={{width: '100%'}}>Login</Button>
          </FormItem>
        </Form>  
      </div>
    )
  }
}

export default Form.create()(LoginTap)