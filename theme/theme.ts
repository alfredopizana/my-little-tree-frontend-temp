'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { colors } from "./globalVariables";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

let theme = createTheme()

theme = createTheme(theme,{
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
    },
    error: {
      main: colors.error,
      light: colors.errorSecondary
    },
    info: {
      main: colors.info
    },
    warning: {
      main: colors.warning
    }
  },
  overrides: {

  },
  components: {
    MuiToolbar:{
      
    }
  }
});

export default theme;