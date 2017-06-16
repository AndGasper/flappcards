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
    }
};

class Reset extends Component{
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount(){
        console.log('reset comp', this.props);
        const {p1,p2,p3}= this.props.location.query; //Pull from the url
        console.log('token get ',[p1,p2,p3]);
        const token = `${p1}.${p2}.${p3}`;
        this.props.isRouteValid(token);
    }


    render(){
        return (
            <div>
                <Toolbar style={style.header}>
                    <ToolbarTitle text="FlappCards"/>
                    <ToolbarGroup>
                        <RaisedButton label="Home" containerElement={<Link to="/"/>}/>
                    </ToolbarGroup>
                </Toolbar>
                <div>
                    <ResetForm/>
                </div>


            </div>
        )
    }
}

// export default connect(mapStateToProps,{isRouteValid, submitResetPw})(Reset);

// export default Reset;
export default connect(null,{isRouteValid})(Reset)