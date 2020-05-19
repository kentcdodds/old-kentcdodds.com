/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'
import IconHomework from '../../images/icons/homework.svg'
import theme from '../../../config/theme'

function Homework({children = [], ...props}) {
  const [homeworks, setHomeworks] = React.useState(
    typeof window === 'undefined'
      ? []
      : JSON.parse(localStorage.getItem('completed-homeworks')) || [],
  )

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('completed-homeworks', JSON.stringify(homeworks))
    }
  }, [homeworks, setHomeworks])

  function handleChange(e) {
    if (e.target.checked && homeworks) {
      setHomeworks([...homeworks, e.target.name])
    } else {
      const removeHomework =
        homeworks && homeworks.filter(item => item !== e.target.name)
      setHomeworks(removeHomework)
    }
  }

  return (
    <li
      css={{
        margin: 0,
        listStyle: 'none',
        padding: '1rem 1.25rem',
      }}
      {...props}
    >
      <label className="container">
        <input
          type="checkbox"
          onClick={handleChange}
          name={
            Array.isArray(children.props.children)
              ? children.props.children[0]
              : children.props.children
          }
          defaultChecked={
            homeworks &&
            homeworks.includes(
              Array.isArray(children.props.children)
                ? children.props.children[0]
                : children.props.children,
            )
          }
        />{' '}
        <span className="checkmark" />
        {children.props.children}
      </label>
    </li>
  )
}

function Homeworks({children = []}) {
  return (
    <div
      css={{
        margin: '1rem 0 2rem 0',
        '.container': {
          display: 'block',
          position: 'relative',
          paddingLeft: '35px',
          cursor: 'pointer',
          userSelect: 'none',
          input: {
            position: 'absolute',
            opacity: 0,
            cursor: 'pointer',
            height: 0,
            width: 0,
          },
        },
        '.checkmark': {
          position: 'absolute',
          top: 0,
          left: 0,
          height: '25px',
          width: '25px',
          border: '1px solid #E0E0E0',
          backgroundColor: '#fff',
          borderRadius: '50%',
        },
        /* On hover */
        '.container:hover input ~ .checkmark': {
          backgroundColor: '#DDF3EB',
          border: '1px solid #DDF3EB',
        },

        /* When the checkbox is checked */
        '.container input:checked ~ .checkmark': {
          backgroundColor: theme.colors.green,
          border: `1px solid ${theme.colors.green}`,
        },

        /* Create the checkmark/indicator (hidden when not checked) */
        '.checkmark:after': {
          content: '""',
          position: 'absolute',
          display: 'none',
        },

        /* Show the checkmark when checked */
        '.container input:checked ~ .checkmark:after': {
          display: 'block',
          border: 'solid white',
          borderWidth: '0 3px 3px 0',
        },
        '.container:hover input ~ .checkmark:after': {
          content: '""',
          position: 'absolute',
          display: 'block',
          border: `solid ${theme.colors.green}`,
          borderWidth: '0 3px 3px 0',
        },
        '.container:hover input:checked ~ .checkmark:after': {
          content: '""',
          position: 'absolute',
          display: 'block',
          border: 'solid white',
          borderWidth: '0 3px 3px 0',
        },
        '.container input ~ .checkmark:after': {
          content: '""',
          position: 'absolute',
          display: 'block',
          border: 'solid #D4D4D4',
          borderWidth: '0 3px 3px 0',
        },
        /* Style the checkmark/indicator */
        '.container .checkmark:after': {
          left: '8px',
          top: '5px',
          width: '7px',
          height: '12px',
          border: 'solid white',
          borderWidth: '0 3px 3px 0',
          transform: 'rotate(45deg)',
        },
      }}
    >
      <h3
        css={{
          display: 'flex',
          alignItems: 'center',
          margin: '0 0 1rem 0',
        }}
      >
        <img src={IconHomework} css={{margin: '0 0.5rem 0 0'}} alt="" />
        <span>Homework{children.length > 0 && 's'}</span>
      </h3>
      <div
        css={{
          background: '#FFFFFF',
          boxShadow:
            '0 0 50px -10px rgba(0,0,0,0.0), 0 4px 8px 0 rgba(0,0,0,0.05)',
          ':hover': {
            boxShadow:
              '0 0 50px -10px rgba(0,0,0,0.06), 0 4px 8px 0 rgba(0,0,0,0.05)',
          },
          borderRadius: '5px',
          border: '1px solid #fafafa',
        }}
      >
        {children.length > 0 ? (
          children.map(ch => (
            <Homework
              css={{':not(:last-child)': {borderBottom: '1px solid #f1f1f1'}}}
              key={ch.props.children}
              children={ch}
            />
          ))
        ) : (
          <Homework children={children} />
        )}
      </div>
    </div>
  )
}

export default Homeworks
