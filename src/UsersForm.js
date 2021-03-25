import React from "react";

export default function UsersForm(props) {
    const {values,change,submit,disabled,errors} = props;

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
      };

      const onChange = (evt) => {
        /* 🔥 FIX THIS SO IT ALSO WORKS WITH CHECKBOXES */
        const { name, value, type, checked } = evt.target;
        const valueToUse = type === "checkbox" ? checked : value;
        change(name, valueToUse);
      };
    

    return (
      <form className = 'formContainer' onSubmit={onSubmit}>
          <div className = 'formGroupSubmit'>
          <div className="errors">
          {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
        </div>
              <h1>Add a User</h1>
              <div className= 'nameContainer'>
                <label>
                    name&nbsp;
                    <input
                        value={values.name}
                        onChange={onChange}
                        name="name"
                        type="text"
                    />
                </label>
              </div>
              <div className= 'emailContainer'>
              <label>
                    email&nbsp;
                    <input
                        value={values.email}
                        onChange={onChange}
                        name="email"
                        type="email"
                    />
                </label>
              </div>
              <div className= 'passwordContainer'>
              <label>
                    password&nbsp;
                    <input
                        value={values.password}
                        onChange={onChange}
                        name="password"
                        type="text"
                    />
                </label>
              </div>
              <div className = 'tosContainer'>
                <label>
                    Terms of Service
                    <input
                        type="checkbox"
                        name="tos"
                        checked={values.tos}
                        onChange={onChange}
                    />
                </label>
              </div>
          </div>
          <button disabled={disabled}>submit</button>
      </form>
    );
  }
  
