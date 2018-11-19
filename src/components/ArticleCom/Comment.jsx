import React, {Component} from 'react';
import {Card,Avatar,Button,Form, Input} from "antd";
import axios from "axios";
import {message} from "antd/lib/index";
import CommentSecond from '../../components/ArticleCom/CommentSecond'
const { Meta } = Card;
const {TextArea} = Input;
const FormItem = Form.Item;
class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment:{},
            Aswer:false,
            comments:[]
        }
    }
    componentDidMount(){
        this.setState({
            comment:this.props.comment
        })
        const id = this.props.comment._id;
        this.getAllComments(id)
    }
    getAllComments(commentid){
        axios.get('/comment/'+commentid+'/comments').then((value) => {
            if (value.status === 200){
                if (value.data.success){
                    this.setState({
                        comments:value.data.comments
                    })
                }

            }
        }).catch(value=>{
            console.log(2)
        })
    }
    comment(){
        this.setState({
            Aswer:!this.state.Aswer
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let commentId = this.state.comment._id;
        this.props.form.validateFields((err, values) => {
            if (!err) {

            }
            if (!values.content){
                message.success('内容不能为空');
                return
            }
            axios.post('/comment/'+commentId+'/commentsecond', values).then((value) => {
                if (value.status === 200){
                    if (value.data.success){
                        message.success(value.data.message);
                        this.setState({
                            Aswer:false,
                            comments:value.data.comments
                        })
                    }

                }
            }).catch(value=>{
                console.log(2)
            })

        });
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        if (!this.state.comment.content){
            return null
        }
        return (
            <div className=''>
                <Card style={{marginBottom:'1.5%',borderBottom:"1px solid rgba(26,26,26,.1)"}}  bordered={false}>
                    <Meta
                        avatar={<Avatar src="https://pic1.zhimg.com/da8e974dc_im.jpg" />}
                        title={this.state.comment.author.username}
                        description="这个人很闲,什么也没留下"
                        style={{borderBottom:"1px solid #F5F5F5",marginBottom:"10px"}}
                    />
                    <p>260人赞同了该回答</p>
                    <p>{this.state.comment.content}</p>
                    <p>发布于:{this.state.comment.createTime}</p>
                    <p>
                        <Button style={{background:'#E5f2ff',color:'#0084ff',border:'none'}} type="primary" icon="caret-up"  onClick={this.enterUp}>
                            赞同
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button style={{background:'#E5f2ff',color:'#0084ff',border:'none'}} type="primary" icon="caret-down"  onClick={this.enterDown}>
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button  type="dashed" icon="message"  onClick={this.comment.bind(this)}>
                            添加评论
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="dashed" icon="twitter"  onClick={this.share}>
                            分享
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="dashed" icon="star"  onClick={this.collection}>
                            收藏
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button type="dashed" icon="heart"  onClick={this.heart}>
                            感谢
                        </Button>
                    </p>
                    <div>
                        {
                            this.state.Aswer ? (<Card style={{marginBottom:'1.5%'}}  bordered={false}>
                                <Meta
                                    // title={this.state.comMan}
                                    description="This is the description"
                                    style={{borderBottom:"1px solid rgba(26,26,26,.1)",marginBottom:"10px"}}
                                />
                                <Form onSubmit={this.handleSubmit} className="login-form"
                                      style={{width: "100%", margin: ' 0 auto'}}>
                                    <FormItem style={{marginBottom:'0'}} lable="内容">
                                        {getFieldDecorator('content', {
                                            rules: [{required: true, message: '请输入内容!'}],
                                        })(
                                            <TextArea rows={4} style={{border:'none'}}/>
                                        )}
                                    </FormItem>
                                    <FormItem style={{marginBottom:'0'}}>
                                        <Button type="primary" htmlType="submit" className="login-form-button" style={{float:'right'}}>
                                            跟回复
                                        </Button>
                                    </FormItem>
                                </Form>
                            </Card>):null
                        }
                    </div>

                            <div style={{background:'#fff'}}>
                                {
                                    this.state.comments.map((item,ins)=>{
                                        return (<CommentSecond commentsecond={item} key={ins}/>)
                                    })
                                }
                            </div>
                </Card>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create()(MyComponent);
export default WrappedNormalLoginForm