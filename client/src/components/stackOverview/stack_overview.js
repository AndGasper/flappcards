import React, {Component} from 'react';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import StackViewStacks from './stackView_stacks';
import {getStackOverview} from '../../actions/index';
import {connect} from 'react-redux';

class Stacks extends Component {
    componentWillMount() {
    const { sid } = this.props.params; // To pull from the url
    this.props.getStackOverview(sid);
    }
    render() {
        return (
            <div>
                <FlashCardsAppBar/>
                <StackViewStacks/>
            </div>
        )
    }
}

export default connect(null,{getStackOverview})(Stacks);