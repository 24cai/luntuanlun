import React, {Component} from 'react';
import { Menu, Icon,Badge } from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {message} from "antd/lib/index";


class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouNum:0,
            guanNum:0
        }
    }
    handleClick = (e) => {
        console.log('click ', e);
    };
    componentDidMount(){
        let token = localStorage.getItem('token')
        this.getUserSliderDate(token)
    }
    async getUserSliderDate(token){
        let dee=  await axios.get('/userslider/'+token)
        let deeDate = dee.data;
        if (deeDate.success){
            this.setState({
                shouNum:deeDate.shouNum,
                guanNum:deeDate.guanNum
            })
        }
    }
    render() {
        return (
            <div className='UserSlider'>
                <Menu className="Menu-l" mode="vertical">
                    <Menu.Item>
                        <Link to=""><Icon type="star"   theme="outlined" />
                            <span>
                                我的收藏
                            </span>
                            <Badge count={this.state.shouNum} style={{ backgroundColor: '#52c41a',marginLeft:'70%'}} />
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to=""><Icon type="question" theme="outlined" />
                            <span>
                                我关注的问题
                            </span>
                            <Badge count={this.state.guanNum} style={{ backgroundColor: '#52c41a',marginLeft:'70%'}} />
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to=""><Icon type="usergroup-add" theme="outlined" />我的邀请</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to=""><Icon type="schedule" theme="outlined" />社区服务中心</Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to=""><Icon type="copyright" theme="outlined" />版权服务中心</Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default MyComponent