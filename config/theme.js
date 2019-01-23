import { darken, lighten } from 'polished'
import { fonts } from '../src/lib/typography'

const brand = {
  primary: '#1ABC9C',
  primary: '#E74C3C',
  primary: '#E67E22',
  primary: '#3498DB',
  //primary: '#9B59B6',
  //primary: '#6420E5',
  secondary: '#EEF4F2',
}

const colors = {
  grey: `${lighten(0.4, brand.primary)}`,
  black: '#000',
  white: '#fff',
  bg_color: '#fff',
  body_color: 'rgba(0,0,0,0.85)',
  link_color: brand.primary,
  link_color_hover: `${darken(0.15, brand.primary)}`,
}

const theme = {
  colors,
  fonts,
  brand,
  breakpoints: {
    xs: '400px',
    s: '600px',
    m: '900px',
    l: '1200px',
  },
  container: {
    base: '100rem',
    text: '55rem',
  },
  spacer: {
    horizontal: '2rem',
    vertical: '3rem',
  },
}

export default theme
