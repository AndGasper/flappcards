import React,{Component} from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import ResetForm from './reset_form';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {isRouteValid} from '../../actions/index';
// import ReactDom from 'react-dom';
// import renderInput from '../utilities/renderInputReg';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';


const style={
    header: {
        backgroundColor: "teal",
        color: "white",
        fontFamily: "Roboto, sans-serif"
    },
    resetContainer:{
        margin:'2em',
    },
};


class Reset extends Component{
    static contextTypes = {
        router: PropTypes.object
    };
    state={ token:"" };

    componentWillMount(){
        const {p1,p2,p3}= this.props.location.query; //Pull from the url
        const token = `${p1}.${p2}.${p3}`;
        this.setState=({ token: token});
        this.props.isRouteValid(token);
        document.body.style.backgroundColor = "#f0f0f0";
        //document.getElementsByClassName("clearB")[0].style.color="rgb(0, 121, 107)";

    }

    componentWillUnmount(){
        document.body.style.backgroundColor = null;
    //   document.getElementsByClassName("clearB")[0].style.color="null";

    }



    render(){
        return (
            <div>
                <Toolbar style={style.header}>
                    <ToolbarTitle text="FlappCards"/>
                    <ToolbarGroup>
                        <RaisedButton backgroundColor="#f0f0f0" labelColor="rgb(0, 121, 107)" label="Home" containerElement={<Link to="/"/>}/>
                    </ToolbarGroup>
                </Toolbar>
                <div style={style.resetContainer}>
                    <ResetForm token={this.props.location.query}/>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        token: state.token,
    };
}
// export default connect(mapStateToProps,{isRouteValid, submitResetPw})(Reset);

// export default Reset;
export default connect(mapStateToProps,{isRouteValid})(Reset)