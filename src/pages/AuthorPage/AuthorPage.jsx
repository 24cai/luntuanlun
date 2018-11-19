import React, {Component} from 'react';
import { Row, Col,Tabs, Card ,Icon,Button } from 'antd';

import UserSlider from '../../components/HomeCom/UserSlider'
import Question from '../../components/HomeCom/Question'
import './AuthorPage.css'
import axios from "axios/index";
import history from "../../history";
import {message} from "antd/lib/index";
import tou from '../../Images/kebi.png'

const TabPane = Tabs.TabPane;
class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author:{

            },
            authorArticles:[

            ],
            userShoucangs:[

            ]
        }
    }
    callback(key) {
        // console.log(key);
    }
    componentDidMount(){
        let path = this.props.history.location.pathname;
        this.getAuthor(path);
    }
    async getAuthor(path){
        let res=  await axios.get(path)
        let resDate = res.data;
        if (res.state === 400){
            message.warning('服务器错误')
            history.push('/*')
            return
        }
        if (resDate.success){
            this.setState({
                author:resDate.user,
                authorArticles:resDate.userArticles,
                userShoucangs:resDate.userShoucangs
            });
        }
    }
    render() {
        const  token = localStorage.getItem('token')
        if (!this.state.author.star) {
            return null
        }
        return (
            <div className='author-page'>
                <div className="AuthorTitle">
                    <div className="authorTitle" style={{position:'relative'}}>
                        <div style={{height:'132px'}}>

                        </div>
                        <div style={{position:'absolute',width:'168px',height:'168px',background:'#f6f6f6',top:'30%',left:'2%',zIndex:'3'}}>
                            <img style={{width:'100%',height:'100%',display:'inline-block'}} src={tou} alt=""/>
                        </div>
                        <Row style={{background:'#fff',paddingBottom:'15px'}}>
                            <Col  span={5}>

                            </Col>
                            <Col style={{padding:'1% 2%'}} span={19}>
                                <h1>
                                    <strong>
                                        {
                                            this.state.author.username
                                        }
                                    </strong>
                                </h1>
                                <p>男</p>
                                <p>详细资料</p>
                            </Col>
                            {
                                this.state.author.token === token ? (
                                    <Button style={{position:'absolute',bottom:'20%',right:'5%',zIndex:'3',color:'#0084ff',borderColor:'#0084ff'}} >编辑个人资料</Button>
                                ):null
                            }
                        </Row>
                    </div>
                </div>
                <div className="authorContent">
                    <Row >
                        <Col className='authorArticles'  span={16}>
                            <Tabs  animated={false} defaultActiveKey="1" onChange={this.callback(this)}>
                                <TabPane tab="动态" key="1">
                                    {
                                        this.state.authorArticles.map((item,ins)=>{
                                            return (<Question article={item} key={ins}/>)
                                        })
                                    }
                                </TabPane>
                                <TabPane tab="收藏" key="2">
                                    {
                                        this.state.userShoucangs.map((item,ins)=>{
                                            return (<Question article={item.article} key={ins}/>)
                                        })
                                    }
                                </TabPane>
                                <TabPane tab="提问" key="3">Content of Tab Pane 3</TabPane>
                                <TabPane tab="文章" key="4">Content of Tab Pane 1</TabPane>
                                <TabPane tab="专栏" key="5">Content of Tab Pane 2</TabPane>
                                <TabPane tab="想法" key="6">Content of Tab Pane 3</TabPane>
                                <TabPane tab="更多" key="7">Content of Tab Pane 3</TabPane>
                            </Tabs>
                        </Col>
                        <Col span={1}>

                        </Col>
                        <Col   span={7}>
                            <Card
                                title="个人足迹"
                                style={{ width: '100%',marginBottom:'3%',background:'#fff' }}
                            >
                                <p><Icon type="edit" />参与2次编辑</p>
                            </Card>
                            <Row style={{ background:'#fff',textAlign:'center',marginBottom:'3%' }}>
                                <Col style={{borderRight:'2px solid #f6f6f6'}} span={12}>
                                    <span style={{display:'block'}}>关注了</span>
                                    <strong>
                                        {this.state.author.star.length}
                                    </strong>
                                </Col>
                                <Col span={12}>
                                    <span style={{display:'block'}}>关注者</span>
                                    <strong>
                                        {this.state.author.fans.length}
                                    </strong>
                                </Col>
                            </Row>
                            <Row>
                                <UserSlider/>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default MyComponent