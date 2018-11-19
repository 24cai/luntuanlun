import React, {Component} from 'react';
import history from './history';
import {Router, Route} from 'react-router-dom'
import 'antd/dist/antd.css';

import {Provider} from 'react-redux'
import {applyMiddleware,compose,createStore} from 'redux';
import thunk from 'redux-thunk'
import reduxs from './redux';

import HeaderNav from './components/HeaderCom/HeaderNav'
import HomePage from './pages/HomePage/HomePage'
import UserPage from './pages/UserPage/UserPage'
import ContactPage from './pages/ContactPage/ContactPage'
import AboutPage from './pages/AboutPage/AboutPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import CheckLogin from './components/UserCom/CheckLogin'
import ArticlePage from './pages/ArticlePage/ArticlePage'
import AuthorPage from './pages/AuthorPage/AuthorPage'
import SearchPage from './pages/SearchPage/SearchPage'
import MsgPage from './pages/MsgPage/MsgPage'
import './App.css'


let store = createStore(
    reduxs,
    compose(
        applyMiddleware(thunk)
    )
);

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            srollNav:true,
        }
    }
    scrollFunc = function (e) {
        e = e || window.event;
        if (e.wheelDelta) {
            if (e.wheelDelta > 0) {
                this.setState({
                    srollNav:true
                })
            }
            if (e.wheelDelta < 0) {
                this.setState({
                    srollNav:false
                })
            }
        }
    }
    componentDidMount(){
        window.onmousewheel=document.onmousewheel = this.scrollFunc.bind(this);
    }
    render() {
        return (
            <div className='myApp'>
                <Provider store={store}>
                    <Router history={history} >
                        <div>
                            <CheckLogin/>
                            <HeaderNav srollNav={this.state.srollNav} />
                            <Route exact path="/" component={HomePage}/>
                            <Route path="/about" component={AboutPage}/>
                            <Route path="/contact" component={ContactPage}/>
                            <Route path="/*" component={ErrorPage}/>
                            <Route path="/user/out" component={UserPage}/>
                            <Route path="/user" component={UserPage}/>
                            <Route path="/article/:id" component={ArticlePage}/>
                            <Route path="/author/:userId" component={AuthorPage}/>
                            <Route path="/search/:value" component={SearchPage}/>
                            <Route path="/msg/:id" component={MsgPage}/>
                        </div>
                    </Router>
                </Provider>
            </div>
        )
    }
}

export default MyComponent