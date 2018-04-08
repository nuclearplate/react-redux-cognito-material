import React from 'react';
import config from '../../config';
import {Link} from 'react-router';
import PageBase from '../components/PageBase';
import TextField from 'material-ui/TextField';
import {grey400} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

class EditRolePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      _key: props.params.id,
      name: '',
      privs: {}
    };
  }

  async componentWillMount() {
    const opts = {
      headers: new Headers({
        'Rolecall-Customer-Id': 'asdfasdf',
        'Access-Control-Allow-Origin': config.api.url
      })
    };

    const roles = await fetch(`${config.api.url}/roles/${this.state._key}`, opts);

    this.setState(await roles.json());
  }

  async handleSubmit(event) {
    event.preventDefault();

    const opts = {
      body: JSON.stringify(this.state),
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Rolecall-Customer-Id': 'asdfasdf',
        'Access-Control-Allow-Origin': config.api.url
      })
    };

    console.log("PUTTING", opts, this.state)

    await fetch(`${config.api.url}/roles/${this.state._key}`, opts);
  }

  onChange(event) {
    let state = {};
    state[event.target.name] =  event.target.value;

    console.log("NEW STATE", state);
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
      <PageBase title="Edit Role"
                navigation="Application / Edit Role">
        <form onSubmit={this.handleSubmit.bind(this)}>

          <TextField
            name="name"
            value={this.state.name}
            hintText="Role Name"
            onChange={this.onChange.bind(this)}
            fullWidth={true}
            floatingLabelText="Role Name"
          />

          <div style={styles.buttons}>
            <Link to="/roles">
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

EditRolePage.propTypes = {
  params: React.PropTypes.object
};

export default EditRolePage;
