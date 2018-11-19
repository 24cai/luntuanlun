import React, {Component} from 'react';
import { Row, Col,Button, Card, Avatar,Modal } from 'antd';
import {Link} from 'react-router-dom'
import './ArticlePage.css'
import {Form, Input, message} from "antd/lib/index";
import axios from "axios/index";
import history from '../../history';
import Comment from '../../components/ArticleCom/Comment'
import UserSlider from '../../components/HomeCom/UserSlider'

const {TextArea} = Input;
const FormItem = Form.Item;
const { Meta } = Card;
class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articel:{},
            comMan:'',
            Aswer:false,
            comments:[],
            articleByAuthor:[],
            commentByAuthor:[],
            foceLoading:false,
            ArticleLoding:false,
            isGuanAuthor:true,
            isGuanArticle:true,
            articleAuthor:{},
            faVisible:false
        }
    }
    async Tag1(id){
        // this.setState({
        //     isGuanArticle:!this.state.isGuanArticle
        // })
        this.setState({
            ArticleLoding:!this.state.ArticleLoding
        })
        let dee=  await axios.get('/user/'+id+'/article')
        let deeDate = dee.data;
        if (deeDate.success){
            message.success(deeDate.message);
            this.setState({
                ArticleLoding:!this.state.ArticleLoding,
                isGuanArticle:!this.state.isGuanArticle,
                articel:deeDate.ArticleStar
            });
        }
    }
    async cancelTag1(id){
        this.setState({
            ArticleLoding:!this.state.ArticleLoding
        })
        let offDee=  await axios.get('/user/'+id+'/article/cancle')
        let offDeeDate = offDee.data;
        if (offDeeDate.success){
            message.success(offDeeDate.message);
            this.setState({
                ArticleLoding:!this.state.ArticleLoding,
                isGuanArticle:!this.state.isGuanArticle,
                articel:offDeeDate.ArticleStar,
            });
        }
    }
    async UnguanzhuLoading(authorId){
        this.setState({
            foceLoading:!this.state.foceLoading
        })
        let unguan=  await axios.get('/user/'+authorId+'/unguanzhu')
        let unguanDate = unguan.data;
        if (unguanDate.success){
            message.success(unguanDate.message);
            this.setState({
                foceLoading:!this.state.foceLoading,
                isGuanAuthor:!this.state.isGuanAuthor,
                articleAuthor:unguanDate.userStar
            });
        }
    }
    async guanzhuLoading(authorId){
        this.setState({
            foceLoading:!this.state.foceLoading
        })
        let guan=  await axios.get('/user/'+authorId+'/guanzhu')
        let guanDate = guan.data;
        if (guanDate.success){
            message.success(guanDate.message);
            this.setState({
                foceLoading:!this.state.foceLoading,
                isGuanAuthor:!this.state.isGuanAuthor,
                articleAuthor:guanDate.userStar,
            });
        }
    }
    Tag2(){

    }
    Tag3(){

    }
    componentDidMount(){
        let path = this.props.history.location.pathname;
        this.getArticel(path);
    }
    async getArticel(path){
        let res=  await axios.get(path)
        let resDate = res.data;
        if (res.state === 400){
            message.warning('服务器错误')
            history.push('/*')
            return
        }
        if (resDate.success){
            this.setState({
                articel:resDate.data,
                comMan:resDate.comMan,
                comments:resDate.comments,
                articleByAuthor:resDate.articleByAuthor,
                commentByAuthor:resDate.commentByAuthor,
                articleAuthor:resDate.data.author,
                isGuanArticle:resDate.isguanArticle,
                isGuanAuthor:resDate.isguanAuthor
            });
        }
    }
    updateSubmit=(e)=>{
        e.preventDefault();
        let articleid = this.state.articel._id;
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {

            }
            axios.post('/article/'+articleid+'/update', values).then((value) => {
                if (value.status === 200){
                    if (value.data.success){
                        message.success(value.data.message);
                        this.setState({
                            faVisible:!this.state.faVisible,
                            articel:value.data.article
                        })
                    }

                }
            }).catch(value=>{
                console.log(2)
            })
        });
    }
    fahandleCancel(){
        this.setState({
            faVisible:!this.state.faVisible
        })
    }
    update(){
        this.setState({
            faVisible:!this.state.faVisible
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {

            }
            if (!values.content){
                message.success('内容不能为空');
                return
            }
            let Id = this.state.articel._id;
            axios.post('/article/'+Id+'/comment', values).then((value) => {
                if (value.status === 200){
                    if (value.data.success){
                        message.success(value.data.message);
                        this.setState({
                            Aswer:false,
                            articel:value.data.article,
                            comments:value.data.comments,
                        })
                    }

                }
            }).catch(value=>{
                console.log(2)
            })


        });
    }
    isAswer(){
       this.setState({
           Aswer:!this.state.Aswer
       })
    }
    deleteArticle(){
        let articleid = this.state.articel._id;
        axios.post('/article/'+articleid+'/delete').then((value) => {
            if (value.status === 200){
                if (value.data.success){
                    message.success(value.data.message);
                    history.push('/')
                }
            }
        }).catch(value=>{
            console.log(2)
        })
    }
    render() {
        const {getFieldDecorator} = this.props.form;
        if (!this.state.articel.tags){
            return null
        }
        const UserToken = localStorage.getItem('token');
        const ArticleToken = this.state.articel.author.token;
        return (
            <div className='article-page'>
                <div className="ArticleTitle">
                    <div className="articleTitle">
                        <Row>
                            <Col style={{ marginLeft:'1.3%',marginTop:'2.5%'}} span={16}>
                                <p>
                                    <Button style={{background:'#E5f2ff',color:'#0084ff', border:'none',marginRight:'5px'}} type="primary"   onClick={this.TagUp1}>
                                        {this.state.articel.tags[0]}
                                    </Button>
                                    <Button style={{background:'#E5f2ff',color:'#0084ff',border:'none',marginRight:'5px'}} type="primary"  onClick={this.TagUp2}>
                                        {this.state.articel.tags[1]}
                                    </Button>
                                    <Button style={{background:'#E5f2ff',color:'#0084ff',border:'none',marginRight:'5px'}} type="primary"  onClick={this.TagUp3}>
                                        {this.state.articel.tags[2]}
                                    </Button>
                                </p>
                                <h1 style={{fontWeight:'bolder',fontSize:'20px',margin:'19px 0'}}>
                                    {this.state.articel.title}
                                    {
                                        ArticleToken === UserToken ? (
                                            <span>
                                                <Button icon="edit" onClick={this.update.bind(this)} type="dashed">
                                                    修改文章
                                                </Button >
                                                <Button icon="exclamation" onClick={this.deleteArticle.bind(this)} type="dashed">
                                                    删除文章
                                                </Button >
                                            </span>
                                        ):null
                                    }
                                </h1>
                                <Modal
                                    title="修改文章"
                                    visible={this.state.faVisible}
                                    footer={null}
                                    onCancel={this.fahandleCancel.bind(this)}
                                >
                                    <Form onSubmit={this.updateSubmit} className="update-form"
                                          style={{width: "100%", margin: ' 0 auto'}}>
                                        <FormItem lable="标题一" style={{width:"30%",display: 'inline-block',marginRight:'5%'}}>
                                            {getFieldDecorator('tag1',{
                                                initialValue:this.state.articel.tags[0]
                                            }, {
                                                rules: [{required: true, message: '请输入标签一!'}],
                                            })(
                                                <Input addonBefore="标题"/>
                                            )}
                                        </FormItem>
                                        <FormItem lable="标题二" style={{width:"30%",display: 'inline-block',marginRight:'5%'}}>
                                            {getFieldDecorator('tag2',{
                                                initialValue:this.state.articel.tags[1]
                                            },  {
                                                rules: [{required: true, message: '请输入标签二!'}],
                                            })(
                                                <Input addonBefore="标题"/>
                                            )}
                                        </FormItem>
                                        <FormItem lable="标签三" style={{width:"30%",display: 'inline-block'}}>
                                            {getFieldDecorator('tag3',{
                                                initialValue:this.state.articel.tags[2]
                                            },  {
                                                rules: [{required: true, message: '请输入标签三!'}],
                                            })(
                                                <Input addonBefore="标题"/>
                                            )}
                                        </FormItem>
                                        <FormItem lable="标题">
                                            {getFieldDecorator('title',{
                                                initialValue:this.state.articel.title
                                            },  {
                                                rules: [{required: true, message: '请输入标题!'}],
                                            })(
                                                <Input addonBefore="标题"/>
                                            )}
                                        </FormItem>
                                        <FormItem lable="内容">
                                            {getFieldDecorator('content', {
                                                initialValue:this.state.articel.content
                                            }, {
                                                rules: [{required: true, message: '请输入内容!'}],
                                            })(
                                                <TextArea rows={4} style={{marginBottom: "10px", height: "300px"}}/>
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:"100%"}}>
                                                修改文章
                                            </Button>
                                        </FormItem>
                                    </Form>
                                </Modal>
                                <p>
                                    {this.state.articel.content}
                                </p>
                                <p>
                                    {
                                        this.state.isGuanArticle ? (
                                            <Button style={{border:'none',marginRight:'2.5%'}} type="primary" loading={this.state.ArticleLoding}   onClick={this.Tag1.bind(this,this.state.articel._id)}>
                                                关注问题
                                            </Button>
                                        ):(
                                            <Button style={{border:'none',marginRight:'2.5%'}} type="primary" loading={this.state.ArticleLoding}   onClick={this.cancelTag1.bind(this,this.state.articel._id)}>
                                                取消关注
                                            </Button>
                                        )
                                    }
                                    {/*<Button style={{border:'none',marginRight:'2.5%'}} type="primary" loading={this.state.ArticleLoding}   onClick={this.Tag1.bind(this,this.state.articel._id)}>*/}
                                        {/*关注问题*/}
                                    {/*</Button>*/}
                                    <Button style={{border:'1px solid #1890ff',marginRight:'2.5%'}} icon="edit"  onClick={()=>this.isAswer()}>
                                        写回答
                                    </Button>
                                    <Button style={{border:'1px solid gray',marginRight:'2.5%'}} icon="usergroup-add"  onClick={this.TagUp1}>
                                        邀请回答
                                    </Button>
                                    <Button type="dashed" size="small" icon="message"  onClick={this.share}>
                                        {this.state.articel.comments.length == 0 ? '':this.state.comments.length}条评论
                                    </Button>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button type="dashed" size="small" icon="twitter"  onClick={this.collection}>
                                        分享
                                    </Button>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button type="dashed" size="small" icon="flag"  onClick={this.heart}>
                                        举报
                                    </Button>
                                </p>
                            </Col>
                            <Col style={{ overflow:'hidden'}} span={4}>

                            </Col>
                            <Col style={{ marginRight:'1.3%',marginTop:'2.5%'}}  span={3}>
                                <Row >
                                    <Col span={12} style={{textAlign:'center'}}>
                                        <span style={{display:'block'}}>关注者</span>
                                        <span style={{fontWeight:'bolder',fontSize:'20px'}}>
                                            {this.state.articel.articleFocus.length}
                                        </span>
                                    </Col>
                                    <Col span={12} style={{textAlign:'center'}}>
                                        <span style={{display:'block'}}>评论</span>
                                        <span style={{fontWeight:'bolder',fontSize:'20px'}}>
                                            {this.state.comments.length}
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="ArticleCotent">
                    <Col span={16}>
                        {
                            this.state.Aswer ? (<Card style={{marginBottom:'1.5%'}}  bordered={false}>
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={this.state.comMan}
                                    description="This is the description"
                                    style={{borderBottom:"1px solid rgba(26,26,26,.1)",marginBottom:"10px"}}
                                />
                                <Form onSubmit={this.handleSubmit} className="login-form"
                                      style={{width: "100%", margin: ' 0 auto'}}>
                                    <FormItem style={{marginBottom:'0'}} lable="内容">
                                        {getFieldDecorator('content1',{
                                            initialValue:''
                                        }, {
                                            rules: [{required: true, message: '请输入内容!'}],
                                        })(
                                            <TextArea rows={4} style={{border:'none'}}/>
                                        )}
                                    </FormItem>
                                    <FormItem style={{marginBottom:'0'}}>
                                        <Button type="primary" htmlType="submit" className="login-form-button" style={{float:'right'}}>
                                            立即回复
                                        </Button>
                                    </FormItem>
                                </Form>
                            </Card>):null
                        }
                        <div style={{background:'#fff'}}>
                            {
                                this.state.comments.map((item,ins)=>{
                                    return (<Comment comment={item} key={ins}/>)
                                })
                            }

                        </div>
                    </Col>
                    <Col span={1}>
                    </Col>
                    <Col span={6}>
                        {
                            UserToken != ArticleToken ? (
                                <Card style={{marginBottom:'1.5%',boxShadow:'0 1px 3px rgba(26,26,26,.1)' }}  bordered={false}>
                                    <Meta
                                        title={<strong style={{marginBottom:'4%',display:'block'}}>关于作者</strong>}
                                        style={{borderBottom:"1px solid rgba(26,26,26,.1)",marginBottom:"10px"}}
                                    />
                                    <div>
                                        <Row style={{padding:'5% 0',borderBottom:'1px solid rgba(26,26,26,.1) '}}>
                                            <Col span={9}>
                                                <img style={{display:'inline-block'}} src="https://pic1.zhimg.com/da8e974dc_im.jpg" alt=""/>
                                            </Col>
                                            <Col span={8}>
                                                <Link to={"/author/"+ this.state.articleAuthor._id}>
                                                    <strong style={{display:'block',fontSize:'20px'}}>
                                                        {this.state.articleAuthor.username}
                                                    </strong>
                                                </Link>
                                                汉语用家
                                            </Col>
                                            <Col span={7}>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row style={{textAlign:'center',padding:'4% 0'}}>
                                        <Col span={8}>
                                            <div>回答</div>
                                            <strong style={{display:'inline-block',fontSize:'18px',color:'#1a1a1a',fontWeight:'600'}}>
                                                {
                                                    this.state.commentByAuthor.length
                                                }
                                            </strong>
                                        </Col>
                                        <Col span={8}>
                                            <div>文章</div>
                                            <strong style={{display:'inline-block',fontSize:'18px',color:'#1a1a1a',fontWeight:'600'}}>
                                                {this.state.articleByAuthor.length}
                                            </strong>
                                        </Col>
                                        <Col span={8}>
                                            <div>关注者</div>
                                            <strong style={{display:'inline-block',fontSize:'18px',color:'#1a1a1a',fontWeight:'600'}}>
                                                {this.state.articleAuthor.fans.length}
                                            </strong>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={11}>
                                            {
                                                this.state.isGuanAuthor ? (
                                                    <Button icon="plus" style={{width:'100%'}} onClick={this.guanzhuLoading.bind(this,this.state.articel.author._id)} loading={this.state.foceLoading} type="primary">关注</Button>
                                                ) : (
                                                    <Button icon="plus" style={{width:'100%'}} onClick={this.UnguanzhuLoading.bind(this,this.state.articel.author._id)} loading={this.state.foceLoading} type="primary">取消关注</Button>
                                                )
                                            }
                                        </Col>
                                        <Col span={2}>

                                        </Col>
                                        <Col span={11}>
                                            <Button icon="wechat" style={{width:'100%'}} type="primary">发私信</Button>
                                        </Col>
                                    </Row>
                                </Card>
                            ) :null
                        }
                        <div>
                            <UserSlider/>
                        </div>
                    </Col>
                </div>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create()(MyComponent);
export default WrappedNormalLoginForm