import React, {Component} from 'react';
import './UserPage.css';
import {Card} from 'antd'
import logo from './logo.png'
import Registered from '../../components/UserCom/Registered';
import Login from '../../components/UserCom/Login'

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOk:false
        }
    }
    toggle(){
        this.setState({
            isOk: !this.state.isOk
        })
    }
    registCheck(val){
        this.setState({
            isOk:true
        })
    }
    render() {
        return (
            <div className='registered'>
                <Card
                    style={{ width: '432',height:'69%',position:'absolute',left:'38%',top:'15%' }}
                >
                    <img src={logo} alt=""/>
                    <h1>
                        <span>{this.state.isOk ? '注册':'登录'}</span>
                        知乎，发现更大的世界
                    </h1>
                    {
                        this.state.isOk ? <Registered registOk={this.registCheck.bind(this)}/> : <Login/>
                    }
                    <div className="toggle">
                        <p>
                            <span>{this.state.isOk ? '已':'没'}</span>
                            有账号?
                            <button onClick={this.toggle.bind(this)}>{this.state.isOk ? '登录':'注册'}</button>
                        </p>
                    </div>
                </Card>
            </div>
        )
    }
}

export default MyComponent