import { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Card, CardHeader, Button, Typography } from '@mui/material'

const PendingUsers = ({ pendingUsers, onDelete, onResend }) => {
  const [selectedUsers, setSelectedUsers] = useState([])

  const handleSelectUser = (email) => {
    if (selectedUsers.includes(email)) {
      setSelectedUsers(selectedUsers.filter(user => user !== email))
    } else {
      setSelectedUsers([...selectedUsers, email])
    }
  }

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedUsers(pendingUsers.map(user => user.email))
    } else {
      setSelectedUsers([])
    }
  }

  const isUserSelected = (email) => selectedUsers.includes(email)

  return (
    <Card sx={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', padding: 2 }}>
      <div className='flex justify-between items-center mb-4'>

      <CardHeader title='Pending Users' titleTypographyProps={{ variant: 'h6' }} />
        <div className='flex gap-2'>


          <Button
            variant='contained'
            color='error'
            onClick={onDelete}
            disabled={selectedUsers.length === 0}
          >
            Delete
          </Button>
          <Button
            variant='contained'
            onClick={onResend}
            disabled={selectedUsers.length === 0}
          >
            Resend
          </Button>
        </div>




      </div>


      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  onChange={handleSelectAll}
                  checked={selectedUsers.length === pendingUsers.length && pendingUsers.length > 0}
                  indeterminate={selectedUsers.length > 0 && selectedUsers.length < pendingUsers.length}
                />
              </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Date and Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingUsers.map((user) => (
              <TableRow key={user.email} selected={isUserSelected(user.email)}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isUserSelected(user.email)}
                    onChange={() => handleSelectUser(user.email)}
                  />
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default PendingUsers
