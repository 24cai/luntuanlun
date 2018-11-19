import React, {Component} from 'react';
import { Tabs,Row, Col,Button } from 'antd';
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Msg.css'

const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}
class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newNews:[],
            oldNews:[],
            allnews:[]
        }
    }
    componentDidMount(){
        const userId = localStorage.getItem('userId');
        this.getMsgDate(userId)

    }
    getMsgDate(Id){
        axios.get('/msg/'+Id+'/page').then(val=>{
            if (val.data.success){
                this.setState({
                    newNews:val.data.newNews,
                    oldNews:val.data.oldNews,
                    allnews:val.data.allnews
                })
            }
        }).catch(val=>{
            console.log(val)
        })
    }
    selectedBtn(e){
        let msgId = e.target.value;
        axios.post('/msg/'+msgId+'/change').then(val=>{
            if (val.data.success){
                this.setState({
                    newNews:val.data.newNews,
                    oldNews:val.data.oldNews,
                    allnews:val.data.allnews
                })
            }
        }).catch(val=>{
            console.log(val)
        })
    }
    render() {
        if (this.state.allnews.length === 0){
            return (
                <div className='msg-page'>
                    <div className='MsgPage'>
                        <h1>没有消息</h1>
                    </div>
                </div>
            )
        }
        return (
            <div className='msg-page'>
                <div className='MsgPage'>
                    <Tabs animated={false} defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="未读消息" key="1">
                            <div className='newContent'>
                                {
                                    this.state.newNews.map((item,ins)=>{
                                        if (!item){
                                            return null
                                        }
                                        return (
                                            <div key={ins}>
                                                <Row>
                                                    <Col span={18}>
                                                        <b>{item.createTime}</b>
                                                        <p>
                                                            <Link to={"/author/" + item.sender._id}>
                                                                {item.sender.username}
                                                            </Link>
                                                            <span>回答了</span>
                                                            <Link to={"/article/" + item.article._id}>
                                                                {item.article.title}
                                                            </Link>
                                                            <span>这个问题</span>
                                                        </p>
                                                    </Col>
                                                    <Col span={2}>
                                                    </Col>
                                                    <Col span={4}>
                                                        <Button className='yidubtn' value={item._id} type="primary" ghost onClick={(e) => this.selectedBtn(e)}>点击已读</Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </TabPane>
                        <TabPane tab="已读消息" key="2">
                            {
                                this.state.oldNews.map((item,ins)=>{
                                    if (!item){
                                        return null
                                    }
                                    return (
                                        <div key={ins}>
                                            <b>{item.createTime}</b>
                                            <Link to={"/author/" + item.sender._id}>
                                                {item.sender.username}
                                            </Link>
                                            <span>回答了</span>
                                            <Link to={"/article/" + item.article._id}>
                                                {item.article.title}
                                            </Link>
                                            <span>这个问题</span>
                                        </div>
                                    )
                                })
                            }
                        </TabPane>
                        <TabPane tab="全部消息" key="3">
                            <div className='newContent'>
                                {
                                    this.state.allnews.map((item,ins)=>{
                                        if (!item){
                                            return null
                                        }
                                        return (
                                            <div key={ins}>
                                                <b>{item.createTime}</b>
                                                <Link to={"/author/" + item.sender._id}>
                                                    {item.sender.username}
                                                </Link>
                                                <span>回答了</span>
                                                <Link to={"/article/" + item.article._id}>
                                                    {item.article.title}
                                                </Link>
                                                <span>这个问题</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </TabPane>
                    </Tabs>,
                </div>
            </div>
        )
    }
}

export default MyComponent