import Typography from 'typography'
import '../fonts/fonts.css'

export const fontWeights = {
  // thin: 100,
  // extraLight: 200,
  light: 300,
  regular: 400,
  // medium: 500,
  semibold: 600,
  bold: 700,
  // extraBold: 800,
  black: 900,
}

const systemFontStack = [
  'system-ui',
  '-apple-system' /* macOS 10.11-10.12 */,
  '"Segoe UI"' /* Windows 6+ */,
  '"Roboto"' /* Android 4+ */,
  '"Ubuntu"' /* Ubuntu 10.10+ */,
  '"Cantarell"' /* Gnome 3+ */,
  '"Noto Sans"' /* KDE Plasma 5+ */,
  'sans-serif' /* fallback */,
  '"Apple Color Emoji"' /* macOS emoji */,
  '"Segoe UI Emoji"' /* Windows emoji */,
  '"Segoe UI Symbol"' /* Windows emoji */,
  '"Noto Color Emoji"' /* Linux emoji */,
]

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.55,
  headerLineHeight: 1.4,
  bodyFontFamily: ['Inter', ...systemFontStack],
  headerFontFamily: ['Inter', ...systemFontStack],
  headerWeight: fontWeights.light,
  headerColor: 'hsla(0,0%,0%,0.9)',
  bodyColor: 'hsla(0,0%,0%,0.8)',

  overrideStyles: ({rhythm}) => ({
    h1: {
      color: 'hsla(0,0%,0%,0.75)',
      fontWeight: fontWeights.light,
    },
    'h1 code, h2 code, h3 code, h4 code, h5 code, h6 code': {
      fontSize: 'inherit',
    },
    h2: {
      color: 'hsla(0,0%,0%,0.775)',
      fontWeight: fontWeights.semibold,
    },
    h3: {
      color: 'hsla(0,0%,0%,0.8)',
    },
    'h1,h2,h3,h4,h5,h6': {
      lineHeight: 1,
    },
    'h1,h2,h3,h4': {
      lineHeight: 1.25,
      marginTop: rhythm(1),
      marginBottom: rhythm(1 / 2),
      letterSpacing: '-0.04rem',
    },
  }),
})
// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
