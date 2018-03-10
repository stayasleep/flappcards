import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import EditMode from 'material-ui/svg-icons/editor/mode-edit';
import renderInput from '../../components/utilities/renderInputStackOV';

import { editStackHeaders } from '../../actions/index';

class StackHeaders extends Component {
    constructor(props){
        super(props);
        this.state={
            enableEditSubj: false,
            enableEditCat: false,
            hoverSubj: false,
            hoverCat: false,
        };
        this.mouseEnterCat = this.mouseEnterCat.bind(this);
        this.mouseEnterSubj = this.mouseEnterSubj.bind(this);
        this.mouseLeaveCat = this.mouseLeaveCat.bind(this);
        this.mouseLeaveSubj = this.mouseLeaveSubj.bind(this);
    }

    handleEnableEdit(str){
        if(str === "subject") {
            this.setState({enableEditSubj: !this.state.enableEditSubj});
        }else{
            this.setState({enableEditCat: !this.state.enableEditCat});
        }
    }

    handleEditCancel(str){
        if(str === "subject"){
            this.setState({enableEditSubj: !this.state.enableEditSubj});
        }else{
            this.setState({enableEditCat: !this.state.enableEditCat});
        }
        this.props.reset("stackHeaders"); //if both are being edited and you close one...you lose info on other.
    }

    handleFormSubmit(values){
        values.subject = values.subject.trim();
        values.category = values.category.trim();
        let headers = {...values, stackID:this.props.stackID};
        this.props.editStackHeaders(headers);
        this.setState({enableEditSubj: false, enableEditCat: false});

    }

    mouseEnterCat(){
        this.setState({hoverCat: true});
    }
    mouseEnterSubj(){
        this.setState({hoverSubj: true});
    }
    mouseLeaveCat(){
        this.setState({hoverCat: false});
    }
    mouseLeaveSubj(){
        this.setState({hoverSubj: false});
    }

    render(){
        const {handleSubmit} = this.props;
        let displayEditSubj = "none";
        let displayEditCat = "none";

        if(this.state.hoverSubj){
            displayEditSubj = "inline-block";
        } else if(this.state.hoverCat){
            displayEditCat = "inline-block";
        }


        return(
            <div className="edit-headers-container" style={{textAlign:"center", margin:"0 auto"}}>
                {!this.state.enableEditSubj ? (
                <div className="isOwnedSubject" onMouseEnter={this.mouseEnterSubj} onMouseLeave={this.mouseLeaveSubj} onClick={this.handleEnableEdit.bind(this,"subject")}>{`Subject: ${this.props.stackSubj}`}<EditMode style={{display: displayEditSubj}}/></div>
                ) : (
                <div className="form-box">
                    <form className="header-form" onSubmit={handleSubmit((values)=> this.handleFormSubmit(values))}>
                        <Field className="editSubj" name="subject" component={renderInput}/>
                        <button className="editbtn btn btn-main" type="submit">Save</button>
                        <button className="editbtn btn btn-secondary" type="button" onClick={(str) => this.handleEditCancel.bind(this)("subject")}>Cancel</button>
                    </form>
                </div>
                )}

                {!this.state.enableEditCat ? (
                <div className="isOwnedCat" onMouseEnter={this.mouseEnterCat} onMouseLeave={this.mouseLeaveCat} onClick={this.handleEnableEdit.bind(this,"category")}>{`Category: ${this.props.stackCat}`}<EditMode style={{display: displayEditCat}} /></div>
                ) : (
                <div className="form-box">
                    <form className="header-form" onSubmit={handleSubmit((values) => {this.handleFormSubmit(values)})} >
                        <Field className="editCat" name="category" component={renderInput} />
                        <button className="editbtn btn btn-main" type="submit">Save</button>
                        <button className="editbtn btn btn-secondary" type="button" onClick={(str)=>this.handleEditCancel.bind(this)("category")}>Cancel</button>
                    </form>
                </div>
                )}
            </div>
        )
    }
}

function validate(values){
    const errors ={};

    const requiredFields = [ 'subject', 'category'];
    requiredFields.forEach((field) => {
        if (!values[ field ]) {
            errors[ field ] = 'Required';
        }else if(/^\s+$/.test(values[field])){
            errors[ field ] = "Field Must Contain Characters";
        }else if(values[field].length >40) {
            errors[ field ] = "Field must 40 characters or fewer";
        }
    });


    return errors;
}

StackHeaders =reduxForm({
    form: 'stackHeaders',
    enableReinitialize: true,
    validate
})(StackHeaders);

export default connect(null,{editStackHeaders})(StackHeaders);