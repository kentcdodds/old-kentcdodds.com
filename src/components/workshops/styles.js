import {css} from '@emotion/core'
import CalendarIcon from '../../images/icons/calendar.svg'
import LocationIcon from '../../images/icons/location.svg'
import {fonts} from '../../lib/typography'
import theme from '../../../config/theme'

const styles = css`
  margin-bottom: 20px;
        background: ${theme.colors.white};
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        padding: 40px;
  h1 {
    margin-top: 0;
    font-family: ${fonts.bold}, sans-serif;
    font-size: 26px;
  }
  time {
    margin-left: 22px;
    margin-bottom: 0;
    ::before {
      content: '';
      width: 16px;
      height: 16px;
      position: absolute;
      background-size: 16px 16px;
      background: url(${CalendarIcon}) no-repeat 0 0 transparent;
      margin-left: -22px;
      margin-top: 5px;
    }
  }
  address {
    font-style: normal;
    margin-bottom: 0;
    ::before {
      content: '';
      width: 13px;
      height: 17px;
      position: absolute;
      background-size: 13px 17px;
      background: url(${LocationIcon}) no-repeat 0 0 transparent;
      margin-left: -20px;
      margin-top: 5px;
    }
  }
  .button {
    font-size: 16px;
    padding: 15px 20px;
    background-image: linear-gradient(-180deg, #8161FF 0%, #5B36D0 100%);
    //background: ${theme.brand.primary};
    text-align: center;
    border: 1px solid transparent;
    color: white;
    border-radius: 5px;
    :hover {
        background-image: linear-gradient(-180deg, #4054F4 0%, #3647CE 100%);
      border: 1px solid transparent;
    }
  }
`
export default styles
