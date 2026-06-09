import { createTheme } from '@mui/material/styles';

// 黑白配：近黑背景 + 高对比白色文字与描边，单色调（grayscale）
export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#f4f4f5', light: '#ffffff', dark: '#c7c7cc', contrastText: '#0d0d0f' },
    secondary: { main: '#a1a1aa', light: '#d4d4d8', dark: '#71717a', contrastText: '#0d0d0f' },
    background: { default: '#0d0d0f', paper: '#18181b' },
    success: { main: '#e4e4e7' },
    error: { main: '#f87171' },
    text: { primary: '#f4f4f5', secondary: '#a1a1aa' },
    divider: 'rgba(255,255,255,0.14)',
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
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.4)',
        },
      },
    },
    MuiTextField: { defaultProps: { size: 'small', variant: 'outlined' } },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        // 防止按钮文字换行/被截断
        root: { whiteSpace: 'nowrap', flexShrink: 0 },
      },
    },
  },
});
