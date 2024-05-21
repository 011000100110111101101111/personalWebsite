import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import CommonButton from '../CommonButton/CommonButton';


const BasicModal = ({ open, onClose, title, description, children, onSubmit }) => {
  const basicModalStyle = {
    wrapper: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '50%',
      maxWidth: '60em',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '*': {
        fontWeight: 700
      }
    },
    buttons: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '1em'
    }

  };

  return (
    <Modal
        open={open}
        onClose={onClose}
      >
        <Box sx={basicModalStyle.wrapper}>
          <Box sx={basicModalStyle.title}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
          {children}
          <Box sx={basicModalStyle.buttons}>
            <CommonButton
              style="contained"
              onClick={onSubmit}
            >
              Submit
            </CommonButton>
            <CommonButton
              style="contained"
              onClick={onClose}
            >
              Cancel
            </CommonButton>
          </Box>
        </Box>
      </Modal>
  )
}

export default BasicModal