
import config from '../../config'
import {browserHistory} from 'react-router';

import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js'

export const LOG_OUT = 'LOG_OUT'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const CONFIRM_FAILED = 'CONFIRM_FAILED'
export const CONFIRM_CODE_FAIL = 'CONFIRM_CODE_FAIL'
export const CONFIRM_EMAIL_START = 'CONFIRM_EMAIL_START'
export const CONFIRM_CODE_SUCCESS = 'CONFIRM_CODE_SUCCESS'
export const CONFIRM_SUCCESS = 'CONFIRM_SUCCESS'
export const CONFIRM_DIALOG_OPENED = 'CONFIRM_DIALOG_OPENED'
export const CONFIRM_DIALOG_CLOSED = 'CONFIRM_DIALOG_CLOSED'
export const CONFIRM_SEND_SUCCESS = 'CONFIRM_SEND_SUCCESS'

export const REGISTER_FAILED = 'REGISTER_FAILED'
export const REGISTER_EXISTS = 'REGISTER_USER_EXISTS'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

export function signOut () {
  return () => {
    return null
  }
}

// ------------------------------------
// Actions
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_SUCCESS]: (state, action) => {
    console.log("HANDLE LOGIN SUCCESS", state, action)
    return action.results || state
  }
}

export function confirmError(error) {
  console.log("CONFIRM FAILED", error)
  return { error, type: CONFIRM_FAILED }
}

export function confirmSuccess(results) {
  return dispatch => {
    dispatch({results: results, type: CONFIRM_SUCCESS})
  }
}

export function getUserPool(values, shouldAuth) {
  const poolData = {
    ClientId: config.userPool.clientId,
    UserPoolId: config.userPool.poolId,
  }

  const userPool = new CognitoUserPool(poolData)
  return userPool
}

export function getUser(values) {
  const userData = {
    Pool: getUserPool(),
    Username: values.username || values.email,
  }

  const authDetails = new AuthenticationDetails({
    Username: values.email,
    Password: values.password,
  })

  console.log("CREATING USER", userData, values)

  const cognitoUser = new CognitoUser(userData)
  return cognitoUser
}

export function confirmAttribute(attribute, values, userPool) {
  return dispatch => {
    const cognitoUser = getUser(values)
    console.log("GOT COGNITO USER", cognitoUser, attribute)
    cognitoUser.getAttributeVerificationCode(attribute, {
      onSuccess: results => {
        console.log("CONFIRMATION RESULTS", results)
        dispatch(confirmSuccess(results))
      },
      onFailure: err => {
        dispatch(confirmError(err))
      },
      inputVerificationCode: () => {
        console.log("INPUT VERIFICATION CODE", arguments)
        const verificationCode = prompt('Please input verification code: ' ,'');
        cognitoUser.verifyAttribute(attribute, verificationCode, this);
      }
    })
  }
}

export function sendRegister(values) {
  return (dispatch, getState) => {
    const userPool = getUserPool()
    const attributeList = []

    const dataEmail = {
      Name: 'email',
      Value: values.email
    }

    const attributeEmail = new CognitoUserAttribute(dataEmail)

    attributeList.push(attributeEmail)

    userPool.signUp(values.username, values.password, attributeList, null, function(err, results) {
      console.log("SIGN UP RESULTS", err, results)
      
      if (err) {
        if (err.name === 'UsernameExistsException') {
          dispatch({error: err, type: REGISTER_EXISTS})
        } else {
          dispatch({error: err, type: REGISTER_FAILED})
        }
      } else {
        dispatch({results: results, type: REGISTER_SUCCESS})
        dispatch(confirmAttribute('email', values, userPool))
      }
    })
  }
}

export function submitConfirmCode(values) {
  return (dispatch, getState) => {
    const cognitoUser = getUser(values)

    cognitoUser.confirmRegistration(values.code, true, (err, results) => {
      if (err) {
        console.log("DISPATCHING ERR", err.message)
        dispatch({type: CONFIRM_CODE_FAIL, results: err})
      } else {
        dispatch({type: CONFIRM_CODE_SUCCESS})
      }
    })
  }
}

export function sendLogin(values) {
  return (dispatch, getValues) => {
    console.log("STATE IS", values)
    const cognitoUser = getUser(values)
    const authenticationDetails = new AuthenticationDetails({
      Username: values.username || values.email,
      Password: values.password
    })

    console.log("SENDING AUTH", values)
    let didSucceed = false
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (results) => {
        console.log("AUTH RESULTS", results)
        didSucceed = true
        dispatch({type: LOGIN_SUCCESS,
          results: {
            user: cognitoUser,
            session: results
          }
        })
        browserHistory.push('/')
      },
      onFailure: (err) => {
        if (!didSucceed) {
          console.log("AUTH ERR", err)
          dispatch({type: LOGIN_FAILED, results: err})
        }
      }
    })
  }
}

export const actions = {
  sendLogin,
  sendRegister,
  submitConfirmCode
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export const reducers = function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  const final = handler ? handler(state, action) : state
  return final
}