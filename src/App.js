import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import UsersForm from './UsersForm'
import schema from './validation/formSchema'
import User from './User'

const initialFormValues = {
  ///// TEXT INPUTS /////
  name: "",
  email: "",
  password: "",
  ///// CHECKBOXES /////
  tos: false,
};
const initialFormErrors = {
  name: "",
  email: "",
  password: "",
  tos: "",
};

const initialUsers = [];
const initialDisabled = true;

function App() {

  const [users, setUsers] = useState(initialUsers); // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues); // object
  const [formErrors, setFormErrors] = useState(initialFormErrors); // object
  const [disabled, setDisabled] = useState(initialDisabled); // boolean

  const getUsers = () => {
    axios
    .get('https://reqres.in/api/users')
    .then((res) => {
      setUsers(res.data.data)
    })
    .catch((err) => {
      console.log(err);
    });
  }
  

  const postNewUser = (newUser) => {
    axios
    .post('https://reqres.in/api/users',newUser)
    .then((res) => {
      setUsers([res.data.data, ...users]);
      setFormValues(initialFormValues);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const inputChange = (name, value) => {
   
    yup
      .reach(schema, name) 
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };


  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    }
    postNewUser(newUser)
  }

  useEffect(() => {
    getUsers();
  },[]);

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid)
    });
  },[formValues])

  return (
    <div className="App">
      <header className="App-header">
        <a>
          Learn React
        </a>
        <UsersForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}/>
      </header>
      {users.map((user) => {
        return <User key ={users.id} details = {users}/>;
      })}
    </div>
  );
}

export default App;
