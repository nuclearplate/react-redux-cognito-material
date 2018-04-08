"use strict";

import React from 'react';
import config from '../../config';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';

class RolesPage extends React.Component {
  
  async componentWillMount() {
    const opts = {
      headers: new Headers({
        'Rolecall-Customer-Id': 'asdfasdf',
        'Access-Control-Allow-Origin': config.api.url
      })
    };

    const roles = await fetch(`${config.api.url}/roles`, opts);

    this.setState({roles: await roles.json()});
  }

  render()  {
    if (!this.state || this.state.roles === undefined || this.state.roles.length === 0) {
      return (
        <PageBase
          title="Roles"
          navigation="Application / Roles"
        />
      );
    }

    const columns = {
      _key: {
        label: 'Id'
      },
      name: {
        label: 'Role Name'
      }
    };

    let columnStyles = {
      _key: {
        width: '20%'
      },
      name: {
        width: '40%'
      }
    };

    const firstRole = this.state.roles[0];

    for (let name in firstRole.privs) {
      columnStyles[name] = {
        width: '20%'
      };
    }

    const editStyle = {
      width: '10%'
    };

    const styles = {
      floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
      },
      editButton: {
        fill: grey500
      },
      columns: columnStyles
    };

    return (
      <PageBase title="Roles"
                navigation="Application / Roles">

        <div>
          <Link to="/createrole" >
            <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>

          <Table>
            <TableHeader>
              <TableRow>
                {Object.keys(styles.columns).map(name =>
                  <TableHeaderColumn 
                    key={name}
                    style={styles.columns[name]}>
                    {columns[name] && columns[name].label || name}
                  </TableHeaderColumn>
                )}
                <TableHeaderColumn 
                  key="edit"
                  style={editStyle}>
                  {'Edit'}
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.state.roles.map(role =>
                <TableRow key={role && role._key}>
                  {Object.keys(styles.columns).map(name =>
                    <TableRowColumn key={name} style={styles.columns[name]}>
                      {role && role.privs && role.privs[name] || role[name]}
                    </TableRowColumn>
                  )}

                  <TableRowColumn style={editStyle}>
                    <Link className="button" to={"roles/" + role._key}>
                      <FloatingActionButton zDepth={0}
                                            mini={true}
                                            backgroundColor={grey200}
                                            iconStyle={styles.editButton}>
                        <ContentCreate  />
                      </FloatingActionButton>
                    </Link>
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>    
        </div>
      </PageBase>
    );
  }
}

export default RolesPage;
