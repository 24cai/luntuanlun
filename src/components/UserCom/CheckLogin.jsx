import {Component} from 'react';
import {withRouter} from 'react-router-dom';
import  axios from 'axios'


class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount(){
        let token=localStorage.getItem('token');
        axios.get('/checkLogin',{
            headers:{
                token:token
            }
        }).then(val=>{
            if (val.data.code === 0){

            } else {
                this.props.history.push('/user')
            }
        })
    }
    render() {
        return null;
    }
}

export default withRouter(MyComponent)