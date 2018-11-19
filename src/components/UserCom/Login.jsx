import React, {Component} from 'react';
import { Form, Input,  Icon, Row, Col, Button,message} from 'antd';
import axios from 'axios'
import history from '../../history'

import {connect} from 'react-redux'
import userAction from '../../action/userAction'

const FormItem = Form.Item;


class LoginSection extends Component{
    constructor(props) {
        super(props);
        this.state={
            confirmDirty: false,
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                // console.log(this.props.login)
                axios.post('/user/login',values).then((val)=>{
                    if (val.data.success){
                        message.success(val.data.message);
                        localStorage.setItem('token',val.data.token);
                        localStorage.setItem('userId',val.data.userId);
                        localStorage.setItem('isOk',true)
                        this.props.login(true)
                        history.push('/')
                    }else{
                        message.warning(val.data.message)
                    }
                }).catch(val=>{
                    message.error('登录失败')
                })
            }
        });
    };
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: false });
        }
        callback();
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div className='login'>
                <Row>
                    <Form  onSubmit={this.handleSubmit.bind(this)}>
                        <Col>
                            <FormItem
                                {...formItemLayout}
                                label="用户名"
                                hasFeedback
                            >
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入你的名字', whitespace: true },
                                        {min:2, message:'长度不在范围内'},
                                        {pattern:new RegExp('^[\u4E00-\u9FA5A-Za-z]+$','g'), message:'用户名必须为英文字母或者中文'}],
                                })(
                                    <Input name='username'  placeholder='请输入姓名' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                )}
                                </FormItem>
                        </Col>
                        <Col>
                            <FormItem{...formItemLayout} label="密码"
                                     hasFeedback
                            >
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: '请输入密码!'},
                                        {validator: this.validateToNextPassword},
                                        {pattern:new RegExp('^[a-zA-Z][a-zA-Z0-9_]{5,15}$','g'), message:'以字母开头，长度在6~18之间，只能包含字母、数字和下划线'}
                                        ],
                                })(
                                    <Input type="password" placeholder='请输入密码' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                                )}
                                </FormItem>
                        </Col>
                        <Col>
                            <FormItem>
                                <Button style={{width:'300px',borderRadius:'20px',background:'rgb(52,115,225)',color:'#ffffff'}} htmlType="submit">登陆</Button>
                            </FormItem>
                        </Col>
                    </Form>
                </Row>
            </div>
        );

    }
}
const mapDispatch = (dispatch)=>({
    login(data){
        dispatch(userAction.loginSuccess(data))
    }
});
const mapStateToProps=(state)=>{
    return {
        user:state.userCrol
    }
}
LoginSection = Form.create({})(connect(mapStateToProps,mapDispatch)(LoginSection))
export default LoginSection

