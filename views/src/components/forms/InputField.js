import React, { useState } from 'react';

const InputField = ({
  input,
  placeholder,
  type,
  icon,
  meta: { touched, error }
}) => {
  const [fileName, setFileName] = useState("");

  if (type === "file") {
    const handleOnChangeFile = async (e) => {
      const { onChange } = input;
      const targetFile = e.target.files[0];

      if (targetFile) {
        setFileName(targetFile.name);
        onChange(targetFile);
      } else {
        onChange(null)
      }
    }

    return (
      <div className="input-field">
        <label>
          <i className={icon} />
          Choose an image
          <input
            onChange={(e) => handleOnChangeFile(e)}
            accept='.jpg, .png, .jpeg'
            type="file"
          />
        </label>
        {
          fileName ?
            <p className="input-file-name">{fileName}</p>
            :
            <div />
        }
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
