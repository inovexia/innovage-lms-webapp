'use client'

// React Imports
import { useRef, useState } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import { Checkbox } from '@mui/material'

import { useSettings } from '@core/hooks/useSettings'

const IconButtonWrapper = props => {
  // Props
  const { tooltipProps, children } = props

  return tooltipProps?.title ? <Tooltip {...tooltipProps}>{children}</Tooltip> : children
}

const MenuItemWrapper = ({ children, option }) => {
  if (option.href) {
    return (
      <Box component={Link} href={option.href} {...option.linkProps}>
        {children}
      </Box>
    )
  } else {
    return <>{children}</>
  }
}

const TestOptionMenu = props => {
  // Props
  const { tooltipProps, icon, iconClassName, options, leftAlignMenu, iconButtonProps, rowSelection } = props

  // States
  const [open, setOpen] = useState(false)

  // Refs
  const anchorRef = useRef(null)

  // Hooks
  const { settings } = useSettings()

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  return (
    <>
      <IconButtonWrapper tooltipProps={tooltipProps}>
        {/* <Box
          border={`2px solid ${Object.keys(rowSelection)?.length ? '#808080' : '#E7E7E7'}`}

          // pl={2}
          // pr={2}
          // pt={2}
          // pb={1}
        > */}
        <IconButton
          ref={anchorRef}
          size='small'
          onClick={handleToggle}
          {...iconButtonProps}
          disableRipple={true}
          disabled={!Object.keys(rowSelection)?.length}
          sx={{
            border: `1px solid ${Object.keys(rowSelection)?.length ? '#808080' : '#E7E7E7'}`,
            borderRadius: 0
          }}
        >
          <i
            class='ri-checkbox-circle-line'
            color={Object.keys(rowSelection)?.length ? '#B5B8FA' : '#808080'}
            style={{
              width: 20,
              height: 20,
              ...(Object.keys(rowSelection)?.length
                ? {
                    color: '#B5B8FA'
                  }
                : { color: '#808080' })
            }}
          ></i>
        </IconButton>
        {/* </Box> */}
      </IconButtonWrapper>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement={leftAlignMenu ? 'bottom-end' : 'bottom-end'}
        transition
        disablePortal
        sx={{ zIndex: 1 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open}>
                  {options.map((option, index) => {
                    return (
                      <MenuItem
                        key={index}
                        {...option.menuItemProps}
                        {...(option.href && { className: 'p-0' })}
                        onClick={e => {
                          handleClose(e)
                          option.menuItemProps && option.menuItemProps.onClick ? option.menuItemProps.onClick(e) : null
                        }}
                      >
                        <MenuItemWrapper option={option}>
                          {/* {(typeof option.icon === 'string' ? <i className={option.icon} /> : option.icon) || null} */}
                          <Checkbox
                            //   checked={checked}
                            //   onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                          {option.text}
                        </MenuItemWrapper>
                      </MenuItem>
                    )
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default TestOptionMenu
