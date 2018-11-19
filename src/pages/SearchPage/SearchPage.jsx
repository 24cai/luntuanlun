import React, {Component} from 'react';
import axios from 'axios'
import './SearchPage.css'
import {message} from "antd/lib/index";
import Question from '../../components/HomeCom/Question'

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles:[]
        }
    }
    componentWillReceiveProps(nextProps){
        let pathChange = nextProps.location.pathname;
        this.getArticles(pathChange);
    }
    componentDidMount(){
        let path = this.props.location.pathname;
        this.getArticles(path)
    }
    getArticles(path){
        const title = path.substring(8);
        axios.get('/search/'+title).then(value=>{
            if (value.status === 200){
                if (value.data.success){
                    this.setState({
                        articles:value.data.articles
                    })
                }
            }
        }).catch(value=>{
            console.log(value)
        })
    }
    render() {
        if (!this.state.articles){
            return (
                <div className='search-page'>
                    <div className='SearchPage'>
                        <h1>没有搜索到相关结果</h1>
                    </div>
                </div>
            )
        }
        return (
            <div className='search-page'>
                <div className='SearchPage'>
                    <h1>这是搜索的结果</h1>
                    {
                        this.state.articles.map((item,ins)=>{
                            return (<Question article={item} key={ins}/>)
                        })
                    }
                </div>
            </div>
        )
    }
}

export default MyComponent