import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField';
import validate from './validate'
import RaisedButton from 'material-ui/RaisedButton';

class CardCreation extends Component {

    componentDidUpdate(){

    }

    renderInput({input, label, meta: {touched, error}}){
        return (
            <TextField hintText={label}
                       floatingLabelText={label}
                       errorText={touched && error}
                       {...input}
            />
        )
    }
    createNewCard(style){
        var number = document.body.children.root.firstElementChild.lastChild.children["0"].childNodes["0"].childNodes["0"].childNodes[2].value;
        var container = document.getElementById("fields");
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }
        for (var i=0;i<number;i++){
            container.appendChild(document.createTextNode("Question " + (i+1)));
            var input = document.createElement("input");
            container.appendChild(input);
            container.appendChild(document.createElement("br"));
            container.appendChild(document.createTextNode("Answer " + (i+1)));
            var input2 = document.createElement("input");
            input2.type = "text";
            container.appendChild(input2);
            container.appendChild(document.createElement("br"));
        }
    }
    render() {
        const {handleSubmit, previousPage} = this.props;
        return (
            <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <Field component={this.renderInput} id="number" name="Number" label="Number"/>
                    <RaisedButton type="button" onClick={() => {this.createNewCard(this.renderInput)}} className="addCard" label="Add Card"/>
                </div>
                <div id="fields">

                </div>
                <div>
                    <RaisedButton type="button" className="previous" onClick={previousPage}>Previous</RaisedButton>
                    <RaisedButton type="submit" className="next">Next</RaisedButton>
                </div>
            </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'stackCreate',              // <------ same form name
    destroyOnUnmount: false,     // <------ preserve form data
    validate
})(CardCreation)