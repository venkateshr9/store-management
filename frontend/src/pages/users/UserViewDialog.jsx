import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
} from "@mui/material";

export default function UserViewDialog({
  open,
  onClose,
  user,
}) {

  if (!user) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>
        User Details
      </DialogTitle>

      <DialogContent>

        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >

            <Grid item xs={12} md={6}>
	    <Typography fontWeight={700}>
              Employee No
            </Typography>

            <Typography>
              {user.employee_no}
            </Typography>
          </Grid>

            <Grid item xs={12} md={6}>
	    <Typography fontWeight={700}>
              Username
            </Typography>

            <Typography>
              {user.username}
            </Typography>
          </Grid>

            <Grid item xs={12}>
	    <Typography fontWeight={700}>
              Full Name
            </Typography>

            <Typography>
              {user.full_name}
            </Typography>
          </Grid>

            <Grid item xs={12} md={6}>
	    <Typography fontWeight={700}>
              Email
            </Typography>

            <Typography>
              {user.email}
            </Typography>
          </Grid>

            <Grid item xs={12} md={6}>
	    <Typography fontWeight={700}>
              Mobile
            </Typography>

            <Typography>
              {user.mobile}
            </Typography>
          </Grid>

            <Grid item xs={12} md={6}>
	    <Typography fontWeight={700}>
              Status
            </Typography>

            <Typography>
              {user.is_active ? "Active" : "Inactive"}
            </Typography>
          </Grid>

            <Grid item xs={12}>
	    <Typography fontWeight={700}>
              Remarks
            </Typography>

            <Typography>
              {user.remarks}
            </Typography>
          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Close
        </Button>

      </DialogActions>

    </Dialog>
  );

}
