// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import { Box } from '@mui/material'
import moment from 'moment/moment'

// Vars
const initialData = {
  company: '',
  country: '',
  contact: ''
}

const AddTestDrawer = props => {
  // Props
  const { open, handleClose, userData, setData, edit, updateUserData, addUserData } = props

  // States
  const [formData, setFormData] = useState(initialData)
  const [description, setDescription] = useState('')

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: edit ? userData?.fullName : '',
      description: edit ? userData?.username : '',
      type: edit ? userData?.email : 'evaluated'
    }
  })

  // const CustomQuill = styled(ReactQuill)`
  //   .ql-container {
  //     border-bottom-left-radius: 12px !important;
  //     border-bottom-right-radius: 12px !important;
  //   }
  //   .ql-toolbar {
  //     border-bottom: none !important;
  //     border-top-left-radius: 12px !important;
  //     border-top-right-radius: 12px !important;
  //   }
  // `

  const onSubmit = data => {
    const newUser = {
      id: (userData?.length && userData?.length + 1) || 1,

      // avatar: `/images/avatars/${Math.floor(Math.random() * 8) + 1}.png`,
      title: data.title,
      description: data.description,
      type: data.type,
      created_on: moment().format('YYYY-MM-DD HH:mm:ss'),

      // optional parameters
      created_by: 'ADJ20',
      status: '0'
    }

    if (edit) {
      updateUserData(userData?.id, newUser)
    } else {
      addUserData(newUser)
    }

    // return getNewUserData()

    // return res.json()

    // setData([...(userData ?? []), newUser])
    handleClose()
    setFormData(initialData)
    resetForm({ title: '', description: '', type: '' })
  }

  const handleReset = () => {
    handleClose()
    setFormData(initialData)
  }

  const modules = {
    toolbar: [
      // [{ header: '1' }, { header: '2' }, { font: [] }],
      // [{ size: [] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],

      // ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false
    }
  }

  const formats = [
    'header',

    // 'font',
    // 'size',
    'bold',
    'italic',

    'underline',

    // 'strike',
    // 'blockquote',
    'list',
    'bullet',
    'indent'

    // 'link',
    // 'image',
    // 'video'
  ]

  console.info(description)

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between pli-5 plb-4'>
        <Typography variant='h5'>Add Test</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='ri-close-line text-2xl' />
        </IconButton>
      </div>
      <Divider />
      <div className='p-5'>
        <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-5'>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            style={{
              height: '100vh'
            }}
          >
            <Box display='flex' flexDirection='column' justifyContent='space-around'>
              <Controller
                name='title'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Title'
                    placeholder='John Doe'
                    {...(errors.title && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
              <Box py={5}>
                {/* <CustomQuill
                  theme='snow'
                  modules={modules}
                  formats={formats}
                  placeholder='Description'
                  value={description}
                  onChange={setDescription}
                  style={{
                    height: 110,
                    marginBottom: 50
                  }}
                /> */}
              </Box>
              <FormControl fullWidth>
                <InputLabel id='country' error={Boolean(errors.role)}>
                  Select Type
                </InputLabel>
                <Controller
                  name='type'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select label='Select Type' {...field} error={Boolean(errors.type)}>
                      <MenuItem value='evaluated'>Evaluated</MenuItem>
                      <MenuItem value='price'>Price</MenuItem>
                      <MenuItem value='quiz'>Quiz</MenuItem>
                    </Select>
                  )}
                />
                {errors.type && <FormHelperText error>This field is required.</FormHelperText>}
              </FormControl>
            </Box>
            <Box>
              <div className='flex items-center gap-4'>
                <Button variant='contained' type='submit'>
                  Create
                </Button>
                <Button variant='outlined' color='error' type='reset' onClick={() => handleReset()}>
                  Cancel
                </Button>
              </div>
            </Box>
          </Box>
        </form>
      </div>
    </Drawer>
  )
}

export default AddTestDrawer
