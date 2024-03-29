import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMyStackOverview, getStackOverview} from '../../actions/index'
import {Link} from 'react-router';
import DeleteStackConfirm from '../confirmActionModal/deleteStack'
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {subHeader, cardHeader, cardActions, cardText, stackSummaryDisplay} from '../utilities/stackSummaryStyle';
import IconButton from 'material-ui/IconButton';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import {green500} from 'material-ui/styles/colors';

import CircularProgress from 'material-ui/CircularProgress';

import {loadingIcon} from './../styles/myshelf.css';


class Stacks extends Component {

    componentWillMount(){
        this.props.getMyStackOverview();
    }

    render() {
        if(!this.props.stacks){
            return (
                <List>
                    <Subheader style={subHeader}>My Shelf</Subheader>
                    <div className = "loadingIcon" style={{fontFamily: "Roboto, sans-serif"}}>
                        <CircularProgress size={80} thickness={6} />
                    </div>
                </List>
            )
        }
        if (this.props.stacks.length === 0) {
            return (
                <List>
                    <Subheader style={subHeader}>My Shelf</Subheader>
                    <div className="emptyRecent" style={{fontFamily: "Roboto, sans-serif"}}>
                        Looks like your shelf is empty. <Link to="/createCards">Create a stack</Link> or <Link to="/search">search the available community content</Link>
                    </div>
                </List>
            )
        }

        const stacksList = this.props.stacks.map((item, index) => {
            return (
                <div key={index} className="cards">
                <Card style={{overflow: "hidden",background:"white"}} zDepth={2}>
                    <CardHeader
                        title={`Subject: ${item.subject}`}
                        titleStyle={{
                            fontSize: "1em",
                            fontWeight: "bold",
                            color: "white",
                            overflow: "hidden"}}
                        subtitleStyle={cardHeader}
                        subtitle={`Category: ${item.category}`}
                        avatar={<Avatar style={{float:"right",color:"black",background:"#797979",boxShadow:"rgba(0, 0, 0, 0.75) 0px 1px 6px, rgb(0, 0, 0) 0px 1px 4px"}}>{item.totalCards}</Avatar>}
                        style={cardHeader}
                    />
                    <CardActions style={cardActions}>
                        <IconButton containerElement={<Link to={`/stackOverview/${this.props.stacks[index].stack_id}`} name="stackOverview"/>}>
                            <RemoveRedEye hoverColor={green500}/>
                        </IconButton>
                        <DeleteStackConfirm stackID={this.props.stacks[index]}/>
                    </CardActions>
                    {/*<CardText style={cardText}>{`Rating: ${item.stackRating}`}</CardText>*/}
                    <CardText style={cardText}>{`Total Views: ${item.stackRating}`}</CardText>
                </Card>
                </div>
            )
        });
        return (
            <List style={{textAlign: "center"}}>
                <Subheader style={subHeader}>My Shelf</Subheader>
                    {stacksList}
            </List>
        );
    }
}
function mapStateToProps(state) {

    return {
        stacks: state.stack.stacks
    }
}

export default connect(mapStateToProps, {getMyStackOverview, getStackOverview})(Stacks);