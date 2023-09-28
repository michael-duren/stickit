import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './ReferenceSheet.css';


const sizing = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 1000,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

function ReferenceSheet() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant='outlined' size='small' sx={{
        color: '#005e83',
        '&:hover': { color: '#00384f' }
      }} onClick={handleOpen}>Reference Sheet <InsertDriveFileIcon /> </Button>
      <Modal
        className='pdf-modal'
        open={open}
        onClose={handleClose} 
        sx={sizing}>

        <Box className='pdf-box'  >
          <iframe src='../../pdf/drum-lessons-feet-control.pdf' style={"width:600px; height:500px;"} />
        </Box>

      </Modal>
    </div>
  );
}

export default ReferenceSheet;