import React from 'react'
import styled from '@emotion/styled'
import {bpMaxSM} from '../../lib/breakpoints'
import CheckIcon from '../../images/check.svg'

const Li = styled.li`
  background: url(${CheckIcon}) no-repeat 0 2px transparent;
  list-style-type: none;
  vertical-align: middle;
  padding-left: 40px;
  ${bpMaxSM} {
    padding-left: 35px;
  }
  //padding-top: 5px;
`

const Check = ({children}) => {
  return <Li>{children}</Li>
}

export default Check
