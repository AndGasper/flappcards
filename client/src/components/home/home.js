import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import Recent from './recent_stacks'
import Community from './community_stacks'
import {Link} from 'react-router'
import RaisedButton from './../../../../node_modules/material-ui/RaisedButton';
import Create from './../../../../node_modules/material-ui/svg-icons/content/create';
class Home extends Component {
    render(){
        return(
            <div>
                <FlashCardsAppBar/>
                <div className="mdl-grid">
                    <ul>
                        <Recent/>
                    </ul>
                </div>
                <div>Here is Some Aggregated Content To Get Your Attention</div>
                <div className="mdl-grid">
                    <ul className="demo-list-three mdl-list mdl-cell mdl-cell--center">
                        <Community/>
                    </ul>
                </div>
                <div className="mdl-grid">
                    <Link to="createCards" name="Create Cards">
                    <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-cell--10-offset mdl-cell--middle">
                        <i className="material-icons">create</i>
                    </button>
                    </Link>
                    {/*<RaisedButton label="Create cards" primary={true} icon={Create}/>*/}
                </div>
            </div>
        )
    }
}

export default Home