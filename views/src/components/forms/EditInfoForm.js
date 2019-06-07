import React, { useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import InputField from './InputField';
import valid from './validate';

const EditInfoForm = (props) => {
  const { initialize } = props;
  
  useEffect(() => {
    if (initialize) {
      initialize({
        name: "Alex",
        birthday: "2018-02-02",
        job: "software engineer",
        home: "Singapore"
      });
    }
  }, [initialize])
  

  return (
    <div className="edit-form-container">
      <form onSubmit={props.handleSubmit(() => console.log(props.formValues))}>
        <div className="edit-name row">
          <div className="col-2">
            <p>Name</p>
          </div>
          <div className="col-10">
            <Field
              name="name"
              component={InputField}
              type="text"
              value={"Nick"}
              validate={valid.isNotNull}
            />
          </div>
        </div>
        <div className="edit-bday row">
          <div className="col-2">
            <p>Birthday</p>
          </div>
          <div className="col-10">
            <Field
              name="birthday"
              component={InputField}
              type="date"
              value={"2/2/2018"}
            />
          </div>
        </div>
        <div className="edit-job row">
          <div className="col-2">
            <p>Job</p>
          </div>
          <div className="col-10">
            <Field
              name="job"
              component={InputField}
              type="text"
              value={"Software developer"}
              validate={valid.isNotNull}
            />
          </div>
        </div>
        <div className="edit-home row">
          <div className="col-2">
            <p>Home</p>
          </div>
          <div className="col-10">
            <Field
              name="home"
              component={InputField}
              type="text"
              value={"Singapore"}
              validate={valid.isNotNull}
            />
          </div>
        </div>
        <div className="edit-form-btn">
          <button type="submit" className="btn-update">Update</button>
          <div
            className="btn-discard"
          >Discard</div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ form }) => {
  if (form.editInfoForm) {
    return {
      formValues: form.editInfoForm.values
    };
  }

  return {};
}

export default reduxForm({
  form: "editInfoForm"
})(
  connect(mapStateToProps)(EditInfoForm)
);
