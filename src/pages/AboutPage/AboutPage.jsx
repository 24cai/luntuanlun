import React, {Component} from 'react';
import './AboutPage.css'
class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className='about-page'>
                <div className="AboutPage">
                    <h1>这是关于我们页面</h1>
                </div>
            </div>
        )
    }
}

export default MyComponent