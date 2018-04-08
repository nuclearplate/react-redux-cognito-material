import Data from '../data';
import Header from '../components/Header';
import {connect} from 'react-redux';
import {Provider} from 'react-redux'
import LeftDrawer from '../components/LeftDrawer';
import ThemeDefault from '../theme-default';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, {PropTypes} from 'react';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {
    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <Provider store={this.props.store}>
          <div>
            <Header styles={styles.header}
                    handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

              <LeftDrawer navDrawerOpen={navDrawerOpen}
                          menus={Data.menus}
                          username="User Admin"/>

              <div style={styles.container}>
                {this.props.children}
              </div>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  width: PropTypes.number,
  store: PropTypes.object.isRequired,
  children: PropTypes.element
};

export default withWidth()(App);
