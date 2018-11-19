import React, {Component} from 'react';
import {Button,message} from 'antd'
import {Link} from 'react-router-dom'
import axios from "axios/index";
class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article:{},
            isZanUp:true,
            isZanDown:true,
            isCollection:true,
            collectionid:''
        }
    }
    async zanUp(articleId){
        let dee=  await axios.get('/article/'+articleId+'/zanup')
        let deeDate = dee.data;
        if (deeDate.success){
            message.success(deeDate.message);
            this.setState({
                isZanUp:!this.state.isZanUp,
                article:deeDate.article
            });
        }
    }
    async noUp(articleId){
        let dee=  await axios.get('/article/'+articleId+'/noup')
        let deeDate = dee.data;
        if (deeDate.success){
            message.success(deeDate.message);
            this.setState({
                isZanUp:!this.state.isZanUp,
                article:deeDate.article
            });
        }
    }
    async zanDown(articleId){
        let dee=  await axios.get('/article/'+articleId+'/zandown')
        let deeDate = dee.data;
        if (deeDate.success){
            message.success(deeDate.message);
            this.setState({
                isZanDown:!this.state.isZanDown,
                article:deeDate.article
            });
        }
    }
    async noDown(articleId){
        let dee=  await axios.get('/article/'+articleId+'/nodown')
        let deeDate = dee.data;
        if (deeDate.success){
            message.success(deeDate.message);
            this.setState({
                isZanDown:!this.state.isZanDown,
                article:deeDate.article
            });
        }
    }
    comment(){

    }
    share(){

    }
    async collection(articleId){
        let dee=  await axios.get('/article/'+articleId+'/noshoucang')
        let deeDate = dee.data;
        if (deeDate.success){
            message.success(deeDate.message);
            this.setState({
                isCollection:!this.state.isCollection,
                collectionid:deeDate.collection
            });
        }
    }
    async nocollection(articleId){
        let dee=  await axios.get('/article/'+articleId+'/shoucang')
        let deeDate = dee.data;
        if (deeDate.success){
            message.success(deeDate.message);
            this.setState({
                isCollection:!this.state.isCollection,
                collectionid:deeDate.collection
            });
        }
    }
    heart(){

    }
    componentDidMount(){
        this.setState({
            article:this.props.article
        })
        this.getDateById(this.props.article._id)
    }
    async getDateById(articleId){
        let dee=  await axios.get('/article/'+articleId+'/isdownUp')
        let deeDate = dee.data;
        if (deeDate.success){
            this.setState({
                isZanDown:!deeDate.isMie,
                isZanUp:!deeDate.isZan,
                isCollection:!deeDate.isShou,
                collectionid:deeDate.collection
            });
        }
    }
    render() {
        return (
            <div style={{borderBottom:'1px solid #f0f2f7'}} className=''>
                <Link to={"/article/" + this.state.article._id}><h3><strong>{this.state.article.title}</strong></h3></Link>
                <p style={{textOverflow: 'ellipsis',overflow: 'hidden',height:'60px'}}>
                    {
                        this.state.article.author ? <strong>{this.state.article.author.username}:</strong> :null
                    }
                    {this.state.article.content}
                </p>
                <p>
                    {
                        this.state.isZanUp ? (
                            <Button style={{background:'#E5f2ff',color:'#0084ff',border:'none'}} type="primary" icon="caret-up"  onClick={this.zanUp.bind(this,this.state.article._id)}>
                                赞同 {this.state.article.up}
                            </Button>
                        ):(
                            <Button style={{background:'#E5f2ff',color:'#0084ff',border:'none'}} type="primary" icon="caret-up"  onClick={this.noUp.bind(this,this.state.article._id)}>
                                已赞同
                            </Button>
                        )
                    }
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {
                        this.state.isZanDown ?(
                            <Button style={{background:'#E5f2ff',color:'#0084ff',border:'none'}} type="primary" icon="caret-down"  onClick={this.zanDown.bind(this,this.state.article._id)}>
                            </Button>
                        ):(
                            <Button  type="primary" icon="caret-down"  onClick={this.noDown.bind(this,this.state.article._id)}>
                            </Button>
                        )
                    }
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button  type="dashed" icon="message"  onClick={this.comment}>
                        添加评论
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button type="dashed" icon="twitter"  onClick={this.share}>
                        分享
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    {
                        this.state.isCollection ? (
                            <Button type="dashed" icon="star"  onClick={this.nocollection.bind(this,this.state.article._id)}>
                                收藏
                            </Button>
                        ):(
                            <Button type="primary" icon="star"  onClick={this.collection.bind(this,this.state.collectionid)}>
                                已收藏
                            </Button>
                        )
                    }
                    &nbsp;&nbsp;&nbsp;
                    <Button type="dashed" icon="heart"  onClick={this.heart}>
                        感谢
                    </Button>
                </p>
            </div>
        )
    }
}

export default MyComponent