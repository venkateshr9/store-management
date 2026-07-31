import Grid from "@mui/material/Grid";
import { Paper, Typography } from "@mui/material";

export default function Dashboard() {
  const cards = [
    { title: "Products", value: 0 },
    { title: "Suppliers", value: 0 },
    { title: "Departments", value: 0 },
    { title: "Users", value: 0 },
  ];

  return (
    <>
      <Typography
        variant="h4"
        sx={{ mb: 3 }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid
  	    size={{ xs: 12, sm: 6, md: 3 }}
  	    key={card.title}
	  >
	      <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
              }}
            >
              <Typography variant="h6">
                {card.title}
              </Typography>

              <Typography
                variant="h3"
                color="primary"
              >
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
