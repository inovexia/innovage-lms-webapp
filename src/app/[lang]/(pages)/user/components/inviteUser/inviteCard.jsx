// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

// Component
const InviteCard = ({onInvite}) => {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const handleInvite = () => {
    if (email && role) {
      const date = new Date().toLocaleString() // Get current date and time
      onInvite({ email, role, date })
      setEmail('') // Reset email input
      setRole('') // Reset role input
    } else {
      console.log('Please fill all fields')
    }
  }

  return (
    <Card sx={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', padding: 2 }}>
      <CardHeader title='Invite User by Email' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <div className='flex flex-col gap-4'>
          <TextField
            size='small'
            placeholder='Email Address'
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: '548px' }}
          />
          <TextField
            size='small'
            select
            label='Role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            sx={{ width: '548px' }}
          >
            <MenuItem value='Teacher'>Teacher</MenuItem>
            <MenuItem value='Student'>Student</MenuItem>
          </TextField>
          <Button
            variant='contained'
            fullWidth
            onClick={handleInvite}

            sx={{  width: '125px' }}
          >
           Invite User
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


export default InviteCard



// onClick={()=>{router.push('/en/notification/notification')}}
