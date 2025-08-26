
import './App.css';
import Main from './Main';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import './i18n';


function App() {
  const Theme = createTheme({
    typography: {
      fontFamily: ["NotoNaskh"],
    }
  })
  return (
    <ThemeProvider theme={Theme} >
      <Main />
    </ThemeProvider>
  );
}

export default App;
