import React, {Component} from 'react';
import axios from 'axios'
import './HomePage.css'
import {Layout, Row, Col,Form,Input,Menu,Modal, Button,message} from 'antd'
import {Link} from 'react-router-dom'
import UserSlider from '../../components/HomeCom/UserSlider'
import ContentTag from '../../components/HomeCom/ContentTag'
const {TextArea} = Input;

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 23 },
        sm: { span: 2 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            asVisible:false,
            faVisible:false,
            faconfirmLoading: false,
            articels:[]
        }
    }
   componentDidMount(){
       this.getArticelData();
    }
    async getArticelData(){
       const res=  await axios.get('/getDate')
        const resDate = res.data;
       if (resDate.success){
           this.setState({
               articels:resDate.data
           });
       }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                axios.post('/article/fabu', values).then((value) => {
                    console.log(value.data.articles)
                    if (value.status === 200){
                        if (value.data.success){
                            message.success(value.data.message);
                            this.setState({
                                faVisible: false,
                                confirmLoading: false,
                                articels:value.data.articles
                            });
                        }
                    }
                }).catch(value=>{
                    console.log(2)
                })
            }

        });
    }

    ansModal = () => {
        this.setState({
            asVisible: true,
        });
    }
    aShandleOk = (e) => {
        console.log(e);
        this.setState({
            asVisible: false,
        });
    }
    ashandleCancel=(e)=>{
        console.log(e);
        this.setState({
            asVisible: false,
        });
    }
    fabuModal=()=>{
        this.setState({
            faVisible: true,
        });
    }

    fahandleCancel = (e) => {
        console.log(e);
        this.setState({
            faVisible: false,
        });
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="home-page" >
                <Layout className="HomePage">
                    <Row>
                        <Col span={16}>
                            <ContentTag  articles={this.state.articels}/>
                        </Col>
                        <Col span={1}>
                        </Col>
                        <Col className="H-sider" span={7}>
                            <Row className="H-sider-t">
                                <Col span={8}>
                                    <Button type="dashed" onClick={this.ansModal}>
                                        <i className="fa fa-file-text-o"></i>
                                        写回答
                                    </Button>
                                    <Modal
                                        title="Basic Modal"
                                        visible={this.state.asVisible}
                                        onOk={this.aShandleOk}
                                        onCancel={this.ashandleCancel}
                                    >
                                        <p>Some contents...</p>
                                        <p>Some contents...</p>
                                        <p>Some contents...</p>
                                    </Modal>
                                </Col>
                                <Col span={8}>
                                    <Button type="dashed" onClick={this.fabuModal}>
                                        <i className="fa fa-pencil-square-o"></i>
                                        写文章
                                    </Button>
                                    <Modal
                                        title="发布文章"
                                        visible={this.state.faVisible}
                                        footer={null}
                                        onCancel={this.fahandleCancel}
                                    >
                                        <Form onSubmit={this.handleSubmit} className="login-form"
                                              style={{width: "100%", margin: ' 0 auto'}}>
                                            <FormItem lable="标题一" style={{width:"30%",display: 'inline-block',marginRight:'5%'}}>
                                                {getFieldDecorator('tag1', {
                                                    rules: [{required: true, message: '请输入标签一!'}],
                                                })(
                                                    <Input addonBefore="标题"/>
                                                )}
                                            </FormItem>
                                            <FormItem lable="标题二" style={{width:"30%",display: 'inline-block',marginRight:'5%'}}>
                                                {getFieldDecorator('tag2', {
                                                    rules: [{required: true, message: '请输入标签二!'}],
                                                })(
                                                    <Input addonBefore="标题"/>
                                                )}
                                            </FormItem>
                                            <FormItem lable="标签三" style={{width:"30%",display: 'inline-block'}}>
                                                {getFieldDecorator('tag3', {
                                                    rules: [{required: true, message: '请输入标签三!'}],
                                                })(
                                                    <Input addonBefore="标题"/>
                                                )}
                                            </FormItem>
                                            <FormItem lable="标题">
                                                {getFieldDecorator('title', {
                                                    rules: [{required: true, message: '请输入标题!'}],
                                                })(
                                                    <Input addonBefore="标题"/>
                                                )}
                                            </FormItem>
                                            <FormItem lable="内容">
                                                {getFieldDecorator('content', {
                                                    rules: [{required: true, message: '请输入内容!'}],
                                                })(
                                                    <TextArea rows={4} style={{marginBottom: "10px", height: "300px"}}/>
                                                )}
                                            </FormItem>
                                            <FormItem>
                                                <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}}>
                                                    立即发布
                                                </Button>
                                            </FormItem>
                                        </Form>
                                    </Modal>
                                </Col>
                                <Col span={8}>
                                    <Button type="dashed" onClick={this.showModal}>
                                        <i className="fa fa-mortar-board"></i>
                                        写想法
                                    </Button>
                                    <Modal
                                        title="Basic Modal"
                                        visible={this.state.visible}
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}
                                    >
                                        <p>Some contents...</p>
                                        <p>Some contents...</p>
                                        <p>Some contents...</p>
                                    </Modal>
                                </Col>
                            </Row>
                            <Row className="H-sider-t">
                                <Menu className="Menu-r" mode="horizontal">
                                    <Menu.Item>
                                        <Link to="">
                                            <i style={{  color: 'yellow' }} className="fa fa-flash"></i>
                                            Live
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to="">
                                            <i style={{  color: 'green' }} className="fa fa-book"></i>
                                            书店
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to="">
                                            <i style={{  color: '#0084ff' }} className="fa fa-spinner"></i>
                                            圆桌
                                        </Link>
                                    </Menu.Item>
                                </Menu>
                                <Menu className="Menu-r" mode="horizontal">
                                    <Menu.Item>
                                        <Link to="">
                                            <i style={{  color: '#0084ff' }} className="fa fa-pencil"></i>
                                            专栏
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to="">
                                            <i style={{  color: '#0084ff' }} className="fa fa-cny "></i>
                                            付费咨询
                                        </Link>
                                    </Menu.Item>
                                </Menu>
                            </Row>
                            <Row className="H-sider-t">
                                <UserSlider/>
                            </Row>
                        </Col>
                    </Row>
                </Layout>
            </div>
        )
    }
}
const WrappedNormalLoginForm = Form.create()(MyComponent);
export default WrappedNormalLoginForm