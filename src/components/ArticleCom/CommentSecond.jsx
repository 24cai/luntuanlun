import React, {Component} from 'react';
import {Card,Button} from "antd";
const { Meta } = Card;
class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentsecond:{},
        }
    }
    componentDidMount(){
        this.setState({
            commentsecond:this.props.commentsecond
        })
    }
    render() {
        if (!this.state.commentsecond.content){
            return null
        }
        return (
            <div className=''>
                <Card style={{marginBottom:'1.5%',borderBottom:"1px solid rgba(26,26,26,.1)"}}  bordered={false}>
                    <Meta
                        title={this.state.commentsecond.author.username}
                        description="这个人很闲,什么也没留下"
                        style={{borderBottom:"1px solid #F5F5F5",marginBottom:"10px"}}
                    />
                    <p>260人赞同了该回答</p>
                    <p>{this.state.commentsecond.content}</p>
                    <p>发布于:{this.state.commentsecond.createTime}</p>
                    <p>
                        <Button style={{background:'#E5f2ff',color:'#0084ff',border:'none'}} type="primary" icon="caret-up"  onClick={this.enterUp}>
                            赞同
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button style={{background:'#E5f2ff',color:'#0084ff',border:'none'}} type="primary" icon="caret-down"  onClick={this.enterDown}>
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button  type="dashed" icon="message" >
                            添加评论
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                    </p>
                </Card>
            </div>
        )
    }
}

export default MyComponent