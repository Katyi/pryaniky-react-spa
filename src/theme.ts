import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      light: '#d0e0e3', // морская волна темнее
      main: '#76a5af', // морская волна
      dark: '#45818e', // морская волна темнее
      contrastText: '#fff',
    },
    secondary: {
      main: '#606060',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // Outlined
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#fff',
            color: '#134f5c',
            fontFamily: 'Roboto',
            fontWeight: 700,
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            },
            '&:hover:not(.Mui-focused)': {
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
                backGroundColor: '#fff',
              },
              '&:before': {
                borderColor: '#2e2e2e',
                borderWidth: '2px',
              },
              '&:after': {
                borderColor: 'secondary.main',
                borderWidth: '3px',
              },
            },
          },
          // Filled
          '& .MuiFilledInput-root': {
            color: '#134f5c',
            fontFamily: 'Roboto',
            fontWeight: 700,
            backgroundColor: '#fff',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
            disableUnderline: true,
            '&:before': {
              border: 'none',
            },
            '&:after': {
              border: 'none',
            },
            ':hover:not(.Mui-focused)': {
              backgroundColor: '#fff',
            },
            '&.Mui-focused': {
              backgroundColor: '#fff',
            },
          },
          '& .MuiInputLabel-filled': {
            color: '#a2c4c9',
            '&.Mui-focused': {
              color: '#a2c4c9',
            },
          },
        },
      },
    },
  },
});
