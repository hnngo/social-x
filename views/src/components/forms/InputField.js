import React from 'react';

const InputField = ({
  input,
  placeholder,
  type,
  icon,
  meta: { touched, error }
}) => {
  if (type === "file") {
    const handleOnChangeFile = async (e) => {
      const { onChange } = input;
      const targetFile = e.target.files[0];

      if (targetFile) {
        onChange(targetFile)
      } else {
        onChange(null)
      }
    }

    return (
      <div className="input-field">
        <div>
          <i className={icon} />
          <input
            onChange={(e) => handleOnChangeFile(e)}
            accept='.jpg, .png, .jpeg'
            type="file"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="input-field">
      <div>
        <i className={icon} />
        <input
          {...input}
          placeholder={placeholder}
          type={type}
        />
        <div className="error-text">
          {touched &&
            ((error && <span>{error}</span>))}
        </div>
      </div>
    </div>
  );
}

export default InputField;
