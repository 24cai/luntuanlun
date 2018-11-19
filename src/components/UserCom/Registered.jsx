import React, {Component} from 'react';
import { Form, Input, Icon, Button } from 'antd';
import axios  from 'axios';
import {message} from "antd/lib/index";

const FormItem = Form.Item;


class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            veriNum:'',
            num:'',
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ');
                console.log(values)
                let data = {username:values.username,password:values.password,email:values.email};
                axios.post('/user/zhuce',data).then((val)=>{
                    if (val.status === 200){
                        if (val.data.success){
                            return   message.success(val.data.message)
                        }
                        return message.warning(val.data.message)
                    }
                    // this.props.registOk(true)
                }).catch(val=>{
                    console.log(val)
                    message.error(val.data.message);
                })
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        if(e.target.type ==='email'){
            this.setState({
                num:e.target.value
            })
        }
        if(e.target.name ==='verify'){
            this.setState({
                veriNum:e.target.value
            })
        }
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    getVerify=()=>{
        let num = this.state.num;
        axios.get('/zhuce/getNum',{
            params:num
        }).then((val)=>{
            if(val.data.success){
                message.success(val.data.message);
                this.setState({
                    veriNum:val.data.verifyNum
                })
            }

        }).catch((err)=>{
            console.log(err);
        })
    };
    verify=(rule, value, callback)=>{
        if(value!==this.state.veriNum){
            callback('验证码输入错误');
        }else{
            callback();
        }
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <div className='Registered'>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem
                        {...formItemLayout}
                        label="邮箱"
                        hasFeedback
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: '请输入正确的邮箱号!',whitespace: true
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input type='email' name='email'  onBlur={this.handleConfirmBlur} prefix={<Icon type="twitter" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='请输入邮箱号'/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='用户名'
                        hasFeedback
                    >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入您的用户名!', whitespace: true },{min:2, message:'长度不在范围内'},
                                {pattern:new RegExp('^[\u4E00-\u9FA5A-Za-z]+$','g'), message:'用户名必须为英文字母或者中文'}],
                        })(
                            <Input name='username'  onBlur={this.handleConfirmBlur} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='请输入用户名'/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                        hasFeedback
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请输入密码!',whitespace: true
                            }, {
                                validator: this.validateToNextPassword,
                            },{pattern:new RegExp('^[a-zA-Z][a-zA-Z0-9_]{5,15}$','g'), message:'以字母开头，长度在6~18之间，只能包含字母、数字和下划线'}],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} name='password' placeholder='请输入密码' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="再次输入密码"
                        hasFeedback
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请再次输入密码!',whitespace: true
                            }, {
                                validator: this.compareToFirstPassword,
                            },{pattern:new RegExp('^[a-zA-Z][a-zA-Z0-9_]{5,15}$','g'), message:'以字母开头，长度在6~18之间，只能包含字母、数字和下划线'}],
                        })(
                            <Input type="password"  placeholder='请确认密码' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                        )}
                    </FormItem>
                    <FormItem{...formItemLayout} label="验证码">
                        {getFieldDecorator('verify', {
                            rules: [
                                {required: true, message: '不能为空', whitespace: true},
                                {validator:this.verify.bind(this)}
                            ],
                        })(
                            <Input type="text"  style={{width: '40%',display:'inline-block'}} name='verify'
                                   placeholder='请输入验证码' onBlur={this.handleConfirmBlur} />
                        )}
                        <Button onClick={this.getVerify}>获取验证码</Button>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button style={{width:'300px',borderRadius:'20px',background:'rgb(52,115,225)',color:'#ffffff'}} htmlType="submit">注册</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
const WrappedRegistrationForm = Form.create()(MyComponent);

export default WrappedRegistrationForm