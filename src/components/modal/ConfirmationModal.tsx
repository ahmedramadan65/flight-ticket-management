import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

interface ConfirmationModalProps {
  handleConfirm: (e: React.MouseEvent<HTMLElement>) => void;
  handleClose: (e: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
  content: string;
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ConfirmationModal(props: ConfirmationModalProps) {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
          {props.content}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <Button variant="contained" type="button" color="primary" onClick={props.handleConfirm} sx={{ flexGrow: 1 }}>
            Confirm
          </Button>
          <Button variant="contained" type="button" color="secondary" onClick={props.handleClose} sx={{ flexGrow: 1 }}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
