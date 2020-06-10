const defaultTheme: Theme = {
  palette: {
    default: '#e0e0e0',
    primary: '#00ac51',
    secondary: '#f88400',
    error: '#f44336',
    warning: '#ff9800',
    info: '#2196f3',
    success: '#4caf50',
    background: '#ffffff',
    statusBar: '#ffffff',
  },
  typography: {
    fontSize: 12,
    headerFontSize: 20,
    primaryColor: '#818181',
    secondaryColor: '#ffffff',
    iconSize: 20,
  },
  borderRadius: 4,
  spacing: 4,
};

export interface Palette {
  default: string;
  primary: string;
  secondary: string;
  error: string;
  warning: string;
  info: string;
  success: string;
  background: string;
  statusBar: string;
}

export interface Typography {
  fontSize: number;
  headerFontSize: number;
  primaryColor: string;
  secondaryColor: string;
  iconSize: number;
}

export interface Theme {
  palette: Palette;
  typography: Typography;
  borderRadius: number;
  spacing: number;
}

export default defaultTheme;
