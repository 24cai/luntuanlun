import React, {Component} from 'react';
import { Row} from 'antd';
import { Tabs } from 'antd';
import Question from './Question'

const TabPane = Tabs.TabPane;
class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Articles:[]
        }
    }
    callback(key) {
        // console.log(key);
    }
    componentWillReceiveProps(nextProps){
         this.setState({
             Articles:nextProps.articles
        })
    }
    componentDidMount(){
        // this.setState({
        //     Articles:this.props.articles
        // })
    }
    render() {
        return (
            <div className=''>
                <Row className="H-content">
                    <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                        <TabPane tab="推荐" key="1">
                            {
                                this.state.Articles.map((item,ins)=>{
                                    return (<Question article={item} key={ins}/>)
                                })
                            }
                        </TabPane>
                        <TabPane tab="关注" key="2">
                            {
                                this.state.Articles.map((item,ins)=>{
                                    return (<Question article={item} key={ins}/>)
                                })
                            }
                        </TabPane>
                        <TabPane tab="热榜" key="3">
                            {
                                this.state.Articles.map((item,ins)=>{
                                    return (<Question article={item} key={ins}/>)
                                })
                            }
                        </TabPane>
                    </Tabs>
                </Row>
            </div>
        )
    }
}

export default MyComponent