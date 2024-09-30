// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import LinearProgress from '@mui/material/LinearProgress'

// Component Imports
import ConfirmationDialog from '@components/dialogs/confirmation-dialog'
import UpgradePlan from '@components/dialogs/upgrade-plan'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

const CurrentPlan = ({ data }) => {
  const buttonProps = (children, color, variant) => ({
    children,
    variant,
    color
  })

  return (
    <Card>
      <CardHeader title='Current Plan' className='pbe-6' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} className='flex flex-col gap-6'>
            <div className='flex flex-col gap-1'>
              <Typography className='font-medium' color='text.primary'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
              <Typography>Lorem ipsum dolor sit amet.</Typography>
            </div>
            <div className='flex flex-col gap-1'>
              <Typography className='font-medium' color='text.primary'>
                Active Date
              </Typography>
              <Typography> a notification upon Subscription expiration</Typography>
            </div>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center gap-2'>
                <Typography className='font-medium' color='text.primary'>
                  $199 Per Month
                </Typography>
                <Chip variant='tonal' color='primary' label='Popular' size='small' />
              </div>
              <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6} className='flex flex-col gap-6'>
            <Alert severity='warning'>
              <AlertTitle></AlertTitle>
              Your plan requires update
            </Alert>
            <div className='flex flex-col gap-1'>
              <div className='flex items-center justify-between'>
                <Typography className='font-medium' color='text.primary'>
                  Days
                </Typography>
                <Typography className='font-medium' color='text.primary'>
                  12 of 30 Days
                </Typography>
              </div>
              <LinearProgress variant='determinate' value={40} />
              <Typography variant='body2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            </div>
          </Grid>
          <Grid item xs={12} className='flex gap-4 flex-wrap'>
            <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps('Upgrade Plan', 'primary', 'contained')}
              dialog={UpgradePlan}
              dialogProps={{ data: data }}
            />
            <OpenDialogOnElementClick
              element={Button}
              elementProps={buttonProps('Cancel Subscription', 'error', 'outlined')}
              dialog={ConfirmationDialog}
              dialogProps={{ type: 'unsubscribe' }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CurrentPlan
