import { Container, Grid } from "@mui/material";
import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (<Container maxWidth="lg">   
    <Grid container spacing={2} mt={5}>
        <Grid item xs={12} display='flex' justifyContent='center' >
          <SignIn />
        </Grid>
    </Grid>
  </Container>
      );
}