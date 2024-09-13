import { useState } from 'react'
import InviteCard from './inviteCard'
import PendingUsers from './pendingUser'
import { Typography } from '@mui/material'
const InviteUser = () => {
  const [pendingUsers, setPendingUsers] = useState([])

  const handleInvite = (newUser) => {
    setPendingUsers([...pendingUsers, newUser])
  }

  const handleDelete = () => {
    const remainingUsers = pendingUsers.filter(user => !selectedUsers.includes(user.email))
    setPendingUsers(remainingUsers)
  }

  const handleResend = () => {
    console.log('Resend invite to:', selectedUsers)
    // Add resend logic here
  }

  return (
    <div className='flex flex-col gap-8'>
<Typography variant='h4'>Invite Users</Typography>
      <InviteCard onInvite={handleInvite} />
      <PendingUsers pendingUsers={pendingUsers} onDelete={handleDelete} onResend={handleResend} />
    </div>
  )
}

export default InviteUser
