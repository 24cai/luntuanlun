import React, {Component} from 'react';
import './HeaderNav.css';
import zhiHu from '../../Images/zhihu.png'
import { Layout, Menu ,Dropdown,  Row, Col,Input,message,Badge,Button } from 'antd';
import {Link} from 'react-router-dom'
import axios from "axios/index";
import  history from '../../history'

import {connect} from 'react-redux'
import userAction from '../../action/userAction'

const {Header} =Layout;


const Search = Input.Search;
class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused:false,
            user:{},
            noReadCount:0,
        }
    }
    handleFocue(){
        this.setState({
            focused:true
        })
    }
    handleBlur(){
        this.setState({
            focused:false
        })
    }
    userOut(e){
        e.preventDefault();
        axios.post('/user/out',).then((val)=>{
            if (val.data.success){
                message.success(val.data.message);
                localStorage.setItem('token',val.data.token);
                localStorage.setItem('userId',val.data.userId);
                localStorage.setItem('isOk',false)
                this.setState({
                    user:null,
                    noReadCount:0,
                });
                this.props.login(false);
                history.push('/user')
            }else{
                message.warning(val.data.message)
            }

        }).catch(val=>{
            message.error('退出失败')
        })
    }
    search(value){
        let path = '/search/'+value;
        history.push(path)
    }
    getMsg(userid){
        axios.get('/msg/'+userid).then((val)=>{
            let count = val.data.news.length;
            this.setState({
                noReadCount:count,
                ok:false
            })
            this.props.login(false);
        }).catch(val=>{
            console.log(val)
        })
    }
    changeNum(){
        let userid = localStorage.getItem('userId');
        this.setState({
            noReadCount:0,
        })
    }
    render() {
        let isLoginuser = this.props.user.isLogin;
        const token = localStorage.getItem('token');
        const userId =localStorage.getItem('userId');
        const isOk =localStorage.getItem('isOk');
        if (isLoginuser){
            this.getMsg(userId);
        }
        const menuDown = (
            <Menu>
                <Menu.Item key="0">
                    <Link to={"/author/"+ userId}>我的主页</Link>
                </Menu.Item>
                <Menu.Item key="1">
                    <Link to="">设置</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link onClick={this.userOut.bind(this)} to="">退出</Link>
                </Menu.Item>
            </Menu>
        );
        return (
            <div>
                {
                    !token? null :(
                        <Header className="header-nav">
                            <div>
                                {
                                    this.props.srollNav ? (
                                        <div className="header-content header-top">
                                            <Row>
                                                <Col span={2}>
                                                    <img src={zhiHu} alt=""/>
                                                </Col>
                                                <Col span={6}>
                                                    <Menu className="Menu-l" mode="horizontal">
                                                        <Menu.Item>
                                                            <Link to="/">首页</Link>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <Link to="/contact">发现</Link>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <Link to="/about">话题</Link>
                                                        </Menu.Item>
                                                    </Menu>
                                                </Col>
                                                <Col span={9}>
                                                    <Row>
                                                        <Search
                                                            className = {this.state.focused ? 'focused':''}
                                                            placeholder="input search text"
                                                            onSearch={this.search.bind(this)}
                                                            enterButton
                                                        />
                                                    </Row>
                                                </Col>
                                                <Col span={2}>

                                                </Col>
                                                <Col span={5}>
                                                    <Menu className="Menu-r" mode="horizontal">
                                                        <Menu.Item>
                                                            <Link to={'/msg/'+userId}>
                                                                <Button type='dashed' onClick={this.changeNum.bind(this)}>
                                                                    <i className="fa fa-bell"></i>
                                                                    <Badge count={this.state.noReadCount} style={{ boxShadow: '0 0 0 1px #d9d9d9 inset' }} />
                                                                </Button>
                                                            </Link>
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            <Link to=""><i className="fa fa-comments"></i></Link>
                                                        </Menu.Item>
                                                        <Dropdown overlay={menuDown} trigger={['click']}>
                                                            <a className="ant-dropdown-link" href="https://www.baidu.com/">
                                                                <i className="fa fa-user-o"></i>
                                                            </a>
                                                        </Dropdown>
                                                    </Menu>
                                                </Col>
                                            </Row>
                                        </div>
                                    ) :(<div className="header-content header-bottom">
                                        <Row>
                                            <Col span={2}>
                                                <img src={zhiHu} alt=""/>
                                            </Col>
                                            <Col span={6}>
                                                <Menu className="Menu-l" mode="horizontal">
                                                    <Menu.Item>
                                                        <Link to="/">推荐</Link>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <Link to="/contact">关注</Link>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <Link to="/about">热榜</Link>
                                                    </Menu.Item>
                                                </Menu>
                                            </Col>
                                            <Col span={9}>

                                            </Col>
                                            <Col span={2}>

                                            </Col>
                                            <Col span={5}>
                                                <Row>
                                                    <Search
                                                        placeholder="input search text"
                                                        onSearch={value => console.log(value)}
                                                        enterButton
                                                    />
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>)
                                }
                            </div>
                        </Header>
                    )
                }
            </div>
        )
    }
}
const mapDispatch = (dispatch)=>({
    login(data){
        dispatch(userAction.outSuccess(data))
    }
});
const mapStateToProps=(state)=>{
    return {
        user:state.userCrol
    }
}

export default connect(mapStateToProps,mapDispatch)(MyComponent)