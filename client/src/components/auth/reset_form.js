import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {submitResetPw} from '../../actions/index';
import renderInputReg from '../utilities/renderInputReg';
import {resetForm, header, passwordInfo} from './../styles/resetPasswordForm.css';
import {Link} from 'react-router';

class ResetForm extends Component {

    static contextTypes = {
        router: PropTypes.object
    };
    handleReset(vals){
        const {p1,p2,p3}= this.props.token; //Pull from the url
        const token = `${p1}.${p2}.${p3}`;
        let data = {token: token, vals: vals};
        this.props.submitResetPw(data);
    }


    render(){
        const {handleSubmit, reset} = this.props;

        const passWordInfo = {
            fontSize: 10,
            marginTop: "1.3em"
        };

        const userError = {
            height: "1em"
        };
        const buttons = {
            // margin: "2em .6em .6em .6em",
             margin:"2em",
        };
        const subBtn = {
            margin: "5%",
        };
        const clearBtn={
            color:"rgb(0, 121, 107)",
            boxShadow:"0 0 0 1pt rgb(0, 121, 107)",
        };
        const resetContainer={
            backgroundColor:"white",
        };

        return (
            <div className="resetForm" style={resetContainer}>
                <h1 className="header">Reset Password</h1>
                <h3 className="header">Enter a new password for your account</h3>
                <h3 className="header">Afterwards, you will be redirected to the home page</h3>
                <div className="passwordInfo">
                    <p>Passwords must be at least 6 characters and contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character.</p>
                </div>
                <form onSubmit={handleSubmit((vals)=>{this.handleReset(vals)})}>
                    <div>
                        <Field name="resetPw" component={renderInputReg} label="New Password" type="password"/>
                    </div>
                    <div>
                        <Field name="passwordConfirm" component={renderInputReg} label="Confirm New Password" type="password"/>
                    </div>
                    <div style={userError} id="resetFail">
                        {this.props.error ?  <Link to="/login/forgotpassword"/>: null}
                    </div>
                    <div style={buttons}>
                        <RaisedButton style={subBtn} primary={true} type="submit" label="Submit"/>
                        <RaisedButton style={clearBtn} className="clearB" labelColor="rgb(0, 121, 107)"  backgroundColor="#f0f0f0" type="button" label="Clear" onClick={reset}/>
                    </div>
                </form>
            </div>
        )
    }
}

function validate(values){
    const errors={};
    const requiredFields =['resetPw','passwordConfirm'];
    requiredFields.forEach(field =>{
        if(!values[field]){
            errors[field] = 'Required'
        }
    });
    if (values.resetPw && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,15})/i.test(values.resetPw)) {
        errors.resetPw = 'Must be between 8 and 15 characters long'
    }
    if(values.resetPw && !/^(?=.*[a-z])/i.test(values.resetPw)){
        errors.resetPw = 'Must have lowercase letter'
    }
    if(values.resetPw && !/^(?=.*[A-Z])/i.test(values.resetPw)){
        errors.resetPw = 'Must have uppercase letter'
    }
    if(values.resetPw && !/^(?=.*[0-9])/i.test(values.resetPw)){
        errors.password = 'Must have number'
    }
    if(values.resetPw && !/^(?=.*[!@#\$%\^&\*])/i.test(values.resetPw)){
        errors.resetPw = 'Must have special character(!,@,#,$,%,\,^,&)'
    }
    if (values.resetPw !== values.passwordConfirm) {
        errors.passwordConfirm = 'Passwords must match'
    }
    return errors

}
function mapStateToProps(state){
    if(state.auth.authError === "This link has already expired.  Please try the password reset process again."){

        function appendUserError(el,str){
            var div = document.createElement('div');
            div.innerHTML='';
            el.innerHTML = '';
            div.innerHTML = str;
            el.appendChild(div.children[0]);
        }
        //uhh figure out how to add link to the resetpassword component bc the link has expired by now.
        var userError = '<div style="color: red;">The Reset Password Link Has Expired. Please Start The Process Over Again At: </div>'; //this should be error from axios call bc token time expired
        appendUserError(document.getElementById("resetFail"),userError);

        state.auth.authError = null; //Reset the authError to null so the user can try resetting again?? Prob need to fix this .

    }
    return{
        authenticated: state.auth.authenticated,
        error: state.auth.authError
    };
}

ResetForm = reduxForm({
    form: 'ResetForm',
    validate
})(ResetForm);

export default connect(mapStateToProps, {submitResetPw})(ResetForm)