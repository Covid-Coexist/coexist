import React from 'react';
import TopNav from './TopNav';
import Welcome from './Welcome';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import StickiesContainer from '../containers/StickiesContainer';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundImage:
            'url(https://images.pexels.com/photos/1931143/pexels-photo-1931143.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)',
        },
      },
    },
  },
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className='top-nav'>
        <TopNav />
        <StickiesContainer />
        <Welcome />
      </div>
    </MuiThemeProvider>
  );
}
