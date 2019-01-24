import { darken, lighten } from 'polished'
import { fonts } from '../src/lib/typography'

const brand = {
  primary: '#5348FF',
  //primary: '#0078CC',
  //primary: '#1ABC9C',
  //primary: '#D42210',
  //primary: '#D96E0E',
  //primary: '#9B59B6',
  //primary: '#6420E5',
  secondary: '#EEF4F2',
}

const colors = {
  primary_light: `${lighten(0.33, brand.primary)}`,
  gray: '#D3D3D3',
  black: '#000',
  white: '#fff',
  bg_color: '#fafafa',
  body_color: 'rgba(0,0,0,0.85)',
  link_color: brand.primary,
  link_color_hover: `${darken(0.07, brand.primary)}`,
  red: '#E74C3C',
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
  transition: {
    ease: 'all 200ms ease',
  },
}

export default theme
