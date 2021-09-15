import React, { Component } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

class Login extends Component {
    emailValidationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    passwordValidationRegex = /^(?=.{,15}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;
    userNameLength = {
        min : 6,
        max : 20
    };
    passwordMaxLength = 8;
    errors = {
        required : 'Please enter the {fieldName}',
        userName: `UserName must be ${userNameLength.min} to ${userNameLength.max} characters`,
        email: 'Please enter valid Email Id',
        password: 'Password must contain Uppercase, lowercase ,number and special character with maximum 15 characters',
        confirmPassword : 'Password and Confirm Password must be same',
        phone: 'Please enter a {length} digit phone number'
    }
  countries = [
    { label: "+91", value: 1 },
    { label: "+86", value: 2 },
    { label: "+15", value: 3 },
  ];
  constructor(props) {
    super(props);
    this.state = {
        fields: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      countryCode: "",
      phone: ""
        },
      errors: {
        userName: false,
        email: false,
        password: false,
        confirmPassword: false,
        countryCode: false,
        phone: false,
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChangeFunc = this.onChangeFunc.bind(this);
    console.log(this.state);
  }

  handleChange(e) {
    const {fields} = this.state;
    fields[e.target.name] = e.target.value;
    this.setState({fields
    });
  }

  onChangeFunc(optionSelected) {
    const {fields} = this.state;
    fields[selectedCountryObj] = optionSelected,
    fields[countryCode] = optionSelected.label,
    this.setState(
      {
        fields
      },
      () => console.log(this.state)
    );
  }

  validateForm(fieldName) {
      const errord = {};
    const {fields} = this.state.fields;
    const val =  this.fields[fieldName];
    let valid =  true;
    switch(fieldName) {
        case 'userName' : {
           if(!val) {
           errors[fieldName] = this.errors['empty'].replace('fieldName',fieldName);
           valid =  false;
           }
           else if(val.length < this.userNameLength.min || val.length > this.userName.max) {
               errors[fieldName] =  this.errors[fieldName];
               valid = false;
           }
           break;
        }
        case 'email' : {
            if(!val) {
                errors[fieldName] = this.errors['empty'].replace('fieldName',fieldName);
                valid =  false;
                }
                else if(!emailValidationRegex.test(val)) {
                    errors[fieldName] =  this.errors[fieldName];
                    valid = false;
                }
        }
        case 'password' : {
          if(!val) {
              errors[fieldName] = this.errors['empty'].replace('fieldName',fieldName);
              valid =  false;
              }
              else if(!this.passwordValidationRegex.test(val)) {
                  errors[fieldName] =  this.errors[fieldName];
                  valid = false;
              }
      }
      case 'confirmPassword' : {
        if(!val) {
          errors[fieldName] = this.errors['empty'].replace('fieldName',fieldName);
          valid =  false;
          }
          else if(val !== fields['password']) {
              errors[fieldName] =  this.errors[fieldName];
              valid = false;
          }
      }

      case 'phone' : {
        if(!val) {
          errors[fieldName] = this.errors['empty'].replace('fieldName',fieldName);
          valid =  false;
          }
          else if(val !== fields['password']) {
              errors[fieldName] =  this.errors[fieldName];
              valid = false;
          }
      }
    }



}

  ValidateRegister() {}

  render() {
    return (
      <div>
        <h1>Register Here!!</h1>
        <form onSubmit={this.ValidateRegister()}>
          <label>User Name:</label>
          <input name="userName" onChange={this.handleChange} />
          <br />
          <label>Email:</label>
          <input name="email" onChange={this.handleChange} />
          <br />
          <label>Password:</label>
          <input name="password" onChange={this.handleChange} />
          <br />
          <label>Confim Password:</label>
          <input name="confirmPassword" onChange={this.handleChange} />
          <br />
          <label> Phone: </label>
          <span>
            <div className="col-md-1">
              <Select
                name="countryCode"
                options={this.countries}
                defaultValue={this.countries[0]}
                onChange={this.onChangeFunc}
              />
            </div>
          </span>
          <span>
            <input name="phone" onChange={this.handleChange} />
          </span>
          <br />
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}
export default Login;
