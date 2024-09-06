// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Card, CardHeader, InputAdornment, TextField, Typography } from '@mui/material'

const AddQuestion = () => {
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')

  return (
    <Grid container item xs={12}>
      <Grid item xs={12} py={5}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: 18
          }}
        >
          Add Question
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Question Type' />
          <CardContent>
            <Grid container spacing={5} xs={12}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='type-select'>Filter by type</InputLabel>
                  <Select
                    fullWidth
                    size='medium'
                    id='select-type'
                    value={type}
                    onChange={e => setType(e.target.value)}
                    label='Filter by type'
                    labelId='type-select'
                    inputProps={{ placeholder: 'Filter by type' }}
                  >
                    <MenuItem value='evaluated'>Evaluated</MenuItem>
                    <MenuItem value='practice'>Practice</MenuItem>
                    <MenuItem value='quiz'>Quiz</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Filter by status</InputLabel>
                  <Select
                    fullWidth
                    id='select-status'
                    label='Filter by status'
                    size='medium'
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
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AddQuestion
