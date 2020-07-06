import React from 'react';
import { Field, reduxForm } from 'redux-form';
import styled from 'styled-components';


const TextArea = styled.textarea`
    width: 60%;
    height: 100px;
    border: 2px solid;
`;

const Button = styled.button`
    border: 1px solid;
    border-radius: 2px;
`;

const Form = styled.form`
    margin: 1%;
`;

const ErrorSpan = styled.span`
    color: red;
`;

const renderInput = ({ input, label, meta }) => {
    return (
       <div >
           <div><label>{label} : </label></div>
           <div><TextArea {...input}  maxLength="400"/></div>
           {renderError(meta)}
       </div>
    );
};

const renderError = ({error, touched}) => {
    if(error && touched) {
        return (
            <ErrorSpan>{error}</ErrorSpan>
        );
    }
};

const ReviewForm = (props) => {
    

    const onSubmit = (formValues) => {            
        props.onSubmit(formValues, props.reset);
        props.reset();
    };

    return (
        <Form onSubmit={props.handleSubmit(onSubmit)} onChange={(event) => event.preventDefault()} >
            <Field name="review" component={renderInput}  label="Review"/>
            <Button type="submit" >Add</Button>
        </Form>
    );

}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.review) {
        errors.review = "Please enter review";
    }
    return errors;
};



export default reduxForm({ form : 'reviewForm', validate : validate, touchOnBlur:false })(ReviewForm);