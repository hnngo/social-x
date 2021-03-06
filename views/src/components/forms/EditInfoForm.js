import React, { useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import InputField from './InputField';
import valid from './validate';
import { updateProfileById } from '../../actions';

const EditInfoForm = (props) => {
  const {
    initialize,
    formValues,
    profile,
    auth
  } = props;

  useEffect(() => {
    // Format birthday
    let bday = "";

    if (profile.birthday) {
      bday = new Date(profile.birthday);
      let [bdayDay, bdayMonth, bdayYear] = bday.toLocaleDateString().split('/');

      bdayDay = +bdayDay < 10 ? "0" + (+bdayDay) : bdayDay;
      bdayMonth = +bdayMonth < 10 ? "0" + (+bdayMonth) : bdayMonth;

      bday = `${bdayYear}-${bdayMonth}-${bdayDay}`;
    }
    
    // Initialize value for form
    if (initialize) {
      initialize({
        name: profile.name,
        birthday: bday || "",
        job: profile.job || "",
        home: profile.home || ""
      });
    }
  }, [
      initialize,
      profile.name,
      profile.birthday,
      profile.home,
      profile.job
    ]
  );


  return (
    <div className="edit-form-container">
      <form
        onSubmit={
          props.handleSubmit(() => {
            props.updateProfileById(auth.user.id, formValues);
            props.OnUpdating();
          })
        }
      >
        <div className="edit-row row">
          <div className="col-2">
            <p>Name:</p>
          </div>
          <div className="col-10">
            <Field
              name="name"
              component={InputField}
              type="text"
              validate={valid.isNotNull}
              placeholder="Enter a Name"
            />
          </div>
        </div>
        <div className="edit-row row">
          <div className="col-2">
            <p>Birthday:</p>
          </div>
          <div className="col-10">
            <Field
              name="birthday"
              component={InputField}
              type="date"
              validate={valid.isSelectedDate}
            />
          </div>
        </div>
        <div className="edit-row row">
          <div className="col-2">
            <p>Job:</p>
          </div>
          <div className="col-10">
            <Field
              name="job"
              component={InputField}
              type="text"
              placeholder="Enter a Job"
            />
          </div>
        </div>
        <div className="edit-row row">
          <div className="col-2">
            <p>Home:</p>
          </div>
          <div className="col-10">
            <Field
              name="home"
              component={InputField}
              type="text"
              placeholder="Enter a Place"
            />
          </div>
        </div>
        <div className="edit-row row">
          <div className="col-2">
            <p>Avatar:</p>
          </div>
          <div className="col-10">
            <Field
              name="file"
              component={InputField}
              type="file"
              placeholder="Choose an image"
              icon="fas fa-images"
            />
          </div>
        </div>
        <div className="edit-form-btn">
          <button type="submit" className="btn-update">Update</button>
          <div
            className="btn-discard"
            onClick={() => props.discardEdit()}
          >Discard</div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ form, profile, auth }) => {
  if (form.editInfoForm) {
    return {
      formValues: form.editInfoForm.values,
      profile,
      auth
    };
  }

  return { profile, auth };
}

export default reduxForm({
  form: "editInfoForm"
})(
  connect(mapStateToProps, {
    updateProfileById
  })(EditInfoForm)
);
