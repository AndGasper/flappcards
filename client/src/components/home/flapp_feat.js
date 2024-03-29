import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {List} from 'material-ui';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import {subHeader} from '../utilities/stackSummaryStyle';
import StackSummary from '../utilities/renderStackSummary';
import {getFeaturedStackOverview} from '../../actions/index';

class FlappFeatured extends Component{
    componentWillMount(){
        this.props.getFeaturedStackOverview();
    }

    render(){
        if(this.props.featuredStacks){
            return(
                <div className="flappFeaturedParent">
                    <Paper className="flappFeatPaper">
                        <div>
                            <h1 className="featStackTitle">Our Featured Stacks</h1>
                        </div>
                        <StackSummary className="featStackSumm" cardStack={this.props.featuredStacks}/>
                        <div className="flappFeatContainer">
                            <div className="containerText">Find more of what you&apos;re looking for today!</div>
                            <RaisedButton
                                label="Search Stacks"
                                containerElement={<Link to={`/search`} className="featFlappSearch" name="search"/>}
                                className="featuredButton"
                                labelColor={"#ffffff"}
                                backgroundColor={"#1bb76e"}
                            />
                        </div>
                    </Paper>
                </div>
            )
        }else if(this.props.featuredErr){
            console.log('feat err is true');
            return(
                <List>
                    <Subheader style={subHeader}>Popular Stacks</Subheader>
                    <div className="emptyRecent" style={{fontFamily: "Roboto, sans-serif"}}>
                        There's tons of neat stacks to checkout. <Link to="/search">Search</Link> around the
                        community and checkout what&apos;s happening today!
                    </div>
                </List>
            )
        }else{
            console.log('null being returned from Featured');
            return null;
        }
    }
}

function mapStateToProps(state){
    return{
        featuredStacks: state.stack.featStack,
        featuredErr: state.stack.featErr,
    }
}

export default connect(mapStateToProps,{getFeaturedStackOverview})(FlappFeatured);