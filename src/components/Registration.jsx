import React, { Component } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Registration.css";

class Registration extends Component {
  emailValidationRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  passwordValidationRegex =
    /^(?=.{8,15}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/;
  phoneValidationRegex = /^\d+$/;
  userNameValidationRegex = /^.{6,20}$/;
  errors = {
    userName: {
      required: "Please enter the User Name",
      pattern: "UserName must be 6 to 20 characters",
    },
    email: {
      required: "Please enter the Email ID",
      pattern: "Please enter valid Email ID",
    },
    password: {
      required: "Please enter the Password",
      pattern:
        "Password must contain Uppercase,lowercase,number and special character with 8 to 15 characters",
    },
    confirmPassword: {
      required: "Please enter the confirmPassword",
      pattern: "Password and Confirm Password must be same",
    },
    phone: {
      required: "Please enter the Phone Number",
      pattern: "Please enter a valid {length} digit Phone Number",
    },
  };

  // label: countrycode, value: mobile number length
  countries = [
    { label: "+91", value: 10 },
    { label: "+61", value: 9 },
    { label: "+55", value: 11 },
  ];

  constructor(props) {
    super(props);
    this.initializeState = this.initializeState.bind(this);
    this.state = this.initializeState();
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.isvalidRegistration = this.isvalidRegistration.bind(this);
    this.reset = this.reset.bind(this);
    this.register = this.register.bind(this);
  }

  /**
   * Initialize the state values
   */

  initializeState() {
    return {
      fields: {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        phoneNumberLength: this.countries[0].value,
        countryObj: this.countries[0],
      },
      errors: {
        userName: true,
        email: true,
        password: true,
        confirmPassword: true,
        phone: true,
      },
      isvalidRegistration: false,
    };
  }

  /**
   * To Reset the form values
   */
  reset() {
    this.setState(this.initializeState);
  }

  /**
   * To check the form is valid or not( enable register button based on this method)
   * @param {any} object
   * @returns {boolean}
   */
  isvalidRegistration(object) {
    return Object.values(object).every((x) => x === false);
  }

  /**
   * Handles every form field input change event and validate the input value
   * @param {SyntheticEvent} e
   */
  handleFieldChange(e) {
    const { fields } = this.state;
    fields[e.target.name] = e.target.value;
    this.setState({ fields }, () => this.validateForm(e.target.name));
  }

  /**
   * Handles the country code drop down change
   * @param {any} optionSelected
   */
  handleCountryChange(optionSelected) {
    const { fields } = this.state;
    fields["countryObj"] = optionSelected;
    this.setState(
      {
        fields,
      },
      () => this.validateForm("phone")
    );
  }

  /**
   * Validates the respective form fields based on field name
   * @param {String} fieldName
   */
  validateForm(fieldName) {
    const { fields, errors } = this.state;
    const val = fields[fieldName];
    let valid = true;
    switch (fieldName) {
      case "userName": {
        if (!val) {
          errors[fieldName] = this.errors[fieldName].required;
          valid = false;
        } else if (!this.userNameValidationRegex.test(val)) {
          errors[fieldName] = this.errors[fieldName].pattern;
          valid = false;
        }
        break;
      }
      case "email": {
        if (!val) {
          errors[fieldName] = this.errors[fieldName].required;
          valid = false;
        } else if (!this.emailValidationRegex.test(val)) {
          errors[fieldName] = this.errors[fieldName].pattern;
          valid = false;
        }
        break;
      }
      case "password": {
        if (!val) {
          errors[fieldName] = this.errors[fieldName].required;
          valid = false;
        } else if (!this.passwordValidationRegex.test(val)) {
          errors[fieldName] = this.errors[fieldName].pattern;
          valid = false;
        }
        break;
      }
      case "confirmPassword": {
        if (!val) {
          errors[fieldName] = this.errors[fieldName].required;
          valid = false;
        } else if (val !== fields["password"]) {
          errors[fieldName] = this.errors[fieldName].pattern;
          valid = false;
        }
        break;
      }
      case "phone": {
        if (!val) {
          errors[fieldName] = this.errors[fieldName].required;
          valid = false;
        } else if (
          !this.phoneValidationRegex.test(val) ||
          val.length !== fields["countryObj"].value
        ) {
          errors[fieldName] = this.errors[fieldName].pattern.replace(
            "{length}",
            fields["countryObj"].value
          );
          valid = false;
        }
        break;
      }
    }
    if (valid) errors[fieldName] = false;

    this.setState({
      errors,
      isvalidRegistration: this.isvalidRegistration(errors),
    });
  }

  /**
   * To regsiter the details
   * @param {SyntheticEvent} e 
   */
  register(e) {
    e.preventDefault();
    alert("Registered Successfully!!!!!!");
    this.reset();
  }

  render() {
    const { errors, fields, isvalidRegistration } = this.state;
    return (
      <div id="register">
        <h3>Registration</h3>
        <form onSubmit={this.register}>
          <label>User Name:</label>
          <input
            name="userName"
            onChange={this.handleFieldChange}
            value={fields["userName"]}
          />
          {errors.userName && (
            <div className="error-msg">{errors.userName}</div>
          )}

          <label>Email ID:</label>
          <input
            name="email"
            onChange={this.handleFieldChange}
            value={fields["email"]}
          />
          {errors.email && <div className="error-msg">{errors.email}</div>}

          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={this.handleFieldChange}
            value={fields["password"]}
          />
          {errors.password && (
            <div className="error-msg">{errors.password}</div>
          )}

          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={this.handleFieldChange}
            value={fields["confirmPassword"]}
          />
          {errors.confirmPassword && (
            <div className="error-msg">{errors.confirmPassword}</div>
          )}

          <label> Country Code: </label>
          <span>
            <div className="drop-down">
              <Select
                name="countryCode"
                options={this.countries}
                defaultValue={this.countries[0]}
                onChange={this.handleCountryChange}
                value={fields["obj"]}
              />
            </div>
          </span>
          <label> Phone: </label>
          <span>
            <input
              name="phone"
              onChange={this.handleFieldChange}
              value={fields["phone"]}
            />
          </span>

          {errors.phone && <div className="error-msg">{errors.phone}</div>}

          <button disabled={!isvalidRegistration} type="submit">
            Register
          </button>

          <button onClick={this.reset}>Reset</button>
        </form>
      </div>
    );
  }
}
export default Registration;
