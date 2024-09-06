// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { InputAdornment, TextField } from '@mui/material'

const TableFilters = ({ setData, tableData, globalFilter, setGlobalFilter, type, setType, status, setStatus }) => {
  // States

  console.info(tableData)
  useEffect(() => {
    const filteredData = tableData?.filter(user => {
      if (type && user.type !== type) return false
      if (status && user.status !== status) return false

      return true
    })

    setData(filteredData || [])
  }, [type, status, tableData, setData])

  const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
    // States
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value)
      }, debounce)

      return () => clearTimeout(timeout)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return (
      <TextField
        {...props}
        size='small'
        value={value}
        onChange={e => setValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <i
              class='ri-search-line'
              style={{
                color: '#B3B5BD'
              }}
            ></i>
          )
        }}
      />
    )
  }

  return (
    <CardContent>
      <Grid container spacing={5} xs={12} display='flex' alignItems='center' pr={0}>
        <Grid item xs={12} sm={3.5}>
          <FormControl fullWidth>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search Test'
              className='max-sm:is-full'
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3.5}>
          <FormControl
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                height: '40px',
                minHeight: 'auto'
              },
              '& .MuiInputLabel-root': {
                top: '-7px'
              }
            }}
          >
            <InputLabel id='type-select'>Filter by type</InputLabel>
            <Select
              fullWidth
              size='small'
              id='select-type'
              value={type}
              onChange={e => setType(e.target.value)}
              label='Filter by type'
              labelId='type-select'

              // inputProps={{ placeholder: 'Filter by type' }}
            >
              <MenuItem value='evaluated'>Evaluated</MenuItem>
              <MenuItem value='practice'>Practice</MenuItem>
              <MenuItem value='quiz'>Quiz</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3.5}>
          <FormControl
            fullWidth
            sx={{
              '& .MuiInputBase-root': {
                height: '40px',
                minHeight: 'auto'
              },
              '& .MuiInputLabel-root': {
                top: '-7px'
              }
            }}
          >
            <InputLabel id='status-select'>Filter by status</InputLabel>
            <Select
              fullWidth
              id='select-status'
              label='Filter by status'
              size='small'
              value={status}
              onChange={e => setStatus(e.target.value)}
              labelId='status-select'

              // inputProps={{ placeholder: 'Select Status' }}
            >
              <MenuItem value='1'>Published</MenuItem>
              <MenuItem value='0'>Unpublished</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={1.5} display='flex' justifyContent='flex-end'>
          <a
            style={{
              cursor: 'pointer',
              color: '#FF4D49',
              textDecoration: 'underline',
              fontWeight: 500,
              fontSize: 15,
              textUnderlineOffset: 3
            }}
            onClick={() => {
              setType('')
              setStatus('')
              setGlobalFilter('')
            }}
          >
            {/* <Button
            size='large'
            color='error'
            fullWidth
            variant='text'
           
            sx={{
              textDecoration: 'underline'
            }}
            className='max-sm:is-full'
          >
         
          </Button> */}
            Reset Filter
          </a>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
