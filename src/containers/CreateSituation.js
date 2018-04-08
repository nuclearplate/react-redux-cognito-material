import React from 'react';
import config from '../../config';
import {Link} from 'react-router';
import PageBase from '../components/PageBase';
import TextField from 'material-ui/TextField';
import {grey400} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

class CreateRolePage extends React.Component {

  async handleSubmit(event) {
    event.preventDefault();

    const opts = {
      method: 'POST',
      headers: new Headers({
        'Rolecall-Customer-Id': 'asdfasdf',
        'Access-Control-Allow-Origin': config.api.url
      })
    };

    const roles = await fetch(`${config.api.url}/situations`, opts);

    this.setState({roles: await roles.json()});
  }

  onChange(event) {
    let state = {};
    state[event.target.name] =  event.target.value && event.target.value.trim();
    this.setState(state);
  }

  render() {
    const styles = {
      toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
      },
      toggleLabel: {
        color: grey400,
        fontWeight: 100
      },
      buttons: {
        marginTop: 30,
        float: 'right'
      },
      saveButton: {
        marginLeft: 5
      }
    };

    return (
      <PageBase title="Create Role"
                navigation="Application / Create Role">
        <form onSubmit={this.handleSubmit.bind(this)}>

          <TextField
            hintText="Role Name"
            floatingLabelText="Role Name"
            fullWidth={true}
            onChange={this.onChange.bind(this)}
            name="name"
          />

          <div style={styles.buttons}>
            <Link to="/">
              <RaisedButton label="Cancel"/>
            </Link>

            <RaisedButton 
              label="Save"
              style={styles.saveButton}
              type="submit"
              primary={true}
            />
          </div>
        </form>
      </PageBase>
    );
  }
}

CreateRolePage.defaultProps = {
  name: '',
  privs: {}
};

export default CreateRolePage;
