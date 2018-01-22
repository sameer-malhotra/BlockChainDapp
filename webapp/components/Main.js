import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../assets/theme/application.theme';
import Navbar from './Navbar';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Navbar/>
          <div style={{marginTop:80}}>
            {React.cloneElement(this.props.children, this.props)}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
