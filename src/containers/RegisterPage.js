import Help from 'material-ui/svg-icons/action/help';
import React from 'react';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router';
import Checkbox from 'material-ui/Checkbox';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import {actions} from '../store/auth'
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import FlatButton from 'material-ui/FlatButton';
import ThemeDefault from '../theme-default';
import {SchemaForm} from "react-schema-form";
import RaisedButton from 'material-ui/RaisedButton';
import {grey500, white} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  registerContainer: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto'
  },
  paper: {
    padding: 20,
    overflow: 'auto'
  },
  buttonsDiv: {
    textAlign: 'center',
    padding: 10
  },
  flatButton: {
    color: grey500
  },
  checkRemember: {
    style: {
      float: 'left',
      maxWidth: 180,
      paddingTop: 5
    },
    labelStyle: {
      color: grey500
    },
    iconStyle: {
      color: grey500,
      borderColor: grey500,
      fill: grey500
    }
  },
  registerBtn: {
    float: 'right'
  },
  btn: {
    background: '#4f81e9',
    color: white,
    padding: 7,
    borderRadius: 2,
    margin: 2,
    fontSize: 13
  },
  btnFacebook: {
    background: '#6ecadc'
  },
  btnSpan: {
    marginLeft: 5
  },
};

const schema = {
  title: "Todo",
  type: "object",
  required: ['name', 'email', 'password'],
  properties: {
    name: {
      type: "string",
      title: "Full Name"
    },
    email: {
      type: "string",
      title: "Email"
    },
    password: {
      type: "string",
      format: "password",
      title: "Password"
    },
  }
};

const form = []

for (let key in schema.properties) {
  const defs = schema.properties[key]
  // form.push(key)
  form.push({
    key: key,
    type: defs.format
  })
}

const model = {}

class RegisterPage extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      formData: {}
    }
  }

  onModelChange(key, val, type) {
    let current = this.state.formData

    for (let iItem in key) {
      const item = key[iItem]
      if (iItem == key.length - 1) {
        current[key[key.length - 1]] = val
      } else {
        current = current[item]
      }
    }
  }

  onSubmit(values) {
    console.log("ON SUBMIT", this.state.formData, this.props)
    this.props.dispatch(actions.sendRegister({
      name: this.state.formData.name,
      email: this.state.formData.email,
      username: this.state.formData.email,
      password: this.state.formData.password,
    }))
  }

  render() {
    const register = values => {
      console.log("REGISTER", this.state.formData)
    }

    const onValidate = () => {
      console.log("ON VALIDATE", this.state.formData)
    }

    console.log("THIS IS", this)

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.registerContainer}>

            <Paper style={styles.paper}>
              <h1>Join StackDown Today.</h1>

              <SchemaForm 
                schema={schema} 
                form={form} 
                model={model} 
                onModelChange={this.onModelChange.bind(this)} />
              <div>
                  <RaisedButton
                    style={styles.registerBtn}
                    primary={true}
                    label="Register"
                    onTouchTap={this.onSubmit.bind(this)} />
                  <pre>{}</pre>
              </div>
            </Paper>

            <div style={styles.buttonsDiv}>
              <FlatButton
                onClick={register}
                label="Login"
                href="/login"
                style={styles.flatButton}
                icon={<PersonAdd />}
              />
              <FlatButton
                label="Confirm"
                href="/confirm"
                style={styles.flatButton}
                icon={<PersonAdd />}
              />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect()(RegisterPage);
