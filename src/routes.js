import App from './containers/App';
import React from 'react';
import {connect} from 'react-redux';
import FormPage from './containers/FormPage';
import LoginPage from './containers/LoginPage';
import UsersPage from './containers/UsersPage';
import Dashboard from './containers/DashboardPage';
import ConfirmPage from './containers/ConfirmPage';
import EditRolePage from './containers/EditRole.js';
import RegisterPage from './containers/RegisterPage.js';
import NotFoundPage from './containers/NotFoundPage.js';
import SituationsPage from './containers/SituationsPage';
import CreateSituationPage from './containers/CreateSituation.js';
import { Route, IndexRoute } from 'react-router';

export const createRoutes = (store) => {
  const app = (
    <App />
  )

  return (
    <Route>
      <Route path="/" render={props => <App store={store} />}>
        <IndexRoute component={Dashboard}/>
        <Route path="login" component={LoginPage}/>
        <Route path="confirm" component={ConfirmPage}/>
        <Route path="register" component={RegisterPage}/>
        <Route path="dashboard" component={Dashboard}/>
        <Route path="situations" component={SituationsPage}/>
        <Route path="situations/:id" component={EditRolePage}/>
        <Route path="createsituation" component={CreateSituationPage}/>
        <Route path="*" component={NotFoundPage}/>
      </Route>
    </Route>
  );
}

export default createRoutes