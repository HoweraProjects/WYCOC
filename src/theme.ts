import { createTheme } from '@mui/material/styles';

// 现代化 Material 主题，克苏鲁风格的暗青/赭金配色
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2f6f6a', light: '#5c9b95', dark: '#1d4a46' },
    secondary: { main: '#b07b2c', light: '#d9a44e', dark: '#7d5418' },
    background: { default: '#eef1f0', paper: '#ffffff' },
    success: { main: '#3c8a4e' },
    text: { primary: '#1f2a29', secondary: '#5a6b69' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily:
      '"Noto Sans SC","PingFang SC","Microsoft YaHei",Roboto,Helvetica,Arial,sans-serif',
    h6: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: '1px solid rgba(47,111,106,0.14)',
          boxShadow: '0 2px 10px rgba(31,42,41,0.05)',
        },
      },
    },
    MuiTextField: { defaultProps: { size: 'small', variant: 'outlined' } },
    MuiButton: { defaultProps: { disableElevation: true } },
  },
});
