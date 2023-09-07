import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars( {snucbar, setSnucbarpen, snucbarauthorization,  setSnucbarauthorization}) {


  const handleCloseSnuc = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnucbarpen(false);
  };
  const handleCloseSnuc2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnucbarauthorization(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={snucbar} autoHideDuration={4000} onClose={handleCloseSnuc}>
        <Alert onClose={handleCloseSnuc} severity="success" sx={{ width: '100%' }}>
          Siz muvaffaqiyatli ro'yxatdan o'tdingiz!
        </Alert>
      </Snackbar>
      <Snackbar open={snucbarauthorization} autoHideDuration={4000} onClose={handleCloseSnuc2}>
        <Alert onClose={handleCloseSnuc2} severity="success" sx={{ width: '100%' }}>
          Siz muvaffaqiyatli kirdingiz!
        </Alert>
      </Snackbar>
    </Stack>
  );
}
