import { useState, useEffect } from 'react'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import { CardHeader, Typography } from '@mui/material'

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, onChange, debounce])

  return <TextField {...props} value={value} onChange={e => setValue(e.target.value)} size='small' />
}

const TableFilters = ({ setData, tableData }) => {
  const [roles, setRoles] = useState([])
  const [statuses, setStatuses] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')

  const roleOptions = ['admin', 'teacher', 'student']
  const statusOptions = ['pending', 'active', 'inactive']

  useEffect(() => {
    const filteredData = tableData?.filter(user => {
      if (roles.length > 0 && !roles.includes(user.role)) return false
      if (statuses.length > 0 && !statuses.includes(user.status)) return false
      if (globalFilter && !user.first_name.toLowerCase().includes(globalFilter.toLowerCase())) return false
      return true
    })

    setData(filteredData)
  }, [roles, statuses, globalFilter, tableData, setData])

  const handleRoleChange = event => {
    const {
      target: { value }
    } = event
    setRoles(typeof value === 'string' ? value.split(',') : value)
  }

  const handleStatusChange = event => {
    const {
      target: { value }
    } = event
    setStatuses(typeof value === 'string' ? value.split(',') : value)
  }

  const handleReset = () => {
    setRoles([])
    setStatuses([])
    setGlobalFilter('')
  }

  return (
    <CardContent style={{ paddingBottom: '5px' }}>
      <Grid container spacing={5} alignItems='center'>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth sx={{ marginBottom: '10px' }}>
            <CardHeader title='Filter' />
          </FormControl>
        </Grid>
        <Grid item xs={3} sm={3}>
          <FormControl fullWidth sx={{ paddingLeft: '15px' }}>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search User'
            />
          </FormControl>
        </Grid>
        <Grid item xs={3} sm={3}>
          <FormControl
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                height: '40px',
                minHeight: 'auto'
              },
              '& .MuiInputLabel-root': {
                top: '-5px'
              }
            }}
          >
            <InputLabel id='role-select-label'>Select Role</InputLabel>
            <Select
              labelId='role-select-label'
              id='select-role'
              multiple
              value={roles}
              onChange={handleRoleChange}
              renderValue={selected => selected.join(', ')}
            >
              {roleOptions.map(role => (
                <MenuItem key={role} value={role}>
                  <Checkbox checked={roles.indexOf(role) > -1} />
                  <ListItemText primary={role.charAt(0).toUpperCase() + role.slice(1)} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3} sm={3}>
          <FormControl
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                height: '40px',
                minHeight: 'auto'
              },
              '& .MuiInputLabel-root': {
                top: '-5px'
              }
            }}
          >
            <InputLabel id='status-select-label'>Select Status</InputLabel>
            <Select
              labelId='status-select-label'
              id='select-status'
              multiple
              value={statuses}
              onChange={handleStatusChange}
              renderValue={selected => selected.join(', ')}
            >
              {statusOptions.map(status => (
                <MenuItem key={status} value={status}>
                  <Checkbox checked={statuses.indexOf(status) > -1} />
                  <ListItemText primary={status.charAt(0).toUpperCase() + status.slice(1)} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1} sm={1}></Grid>
        <Grid item xs={2} sm={2}>
          <Typography
            style={{ color: '#FF4D49', textDecoration: 'underline', cursor: 'pointer' }}
            onClick={handleReset}
          >
            Reset Filter
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
