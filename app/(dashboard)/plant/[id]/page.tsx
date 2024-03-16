"use client"
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, Stack, Typography} from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CircleIcon from '@mui/icons-material/Circle';
import EditIcon from '@mui/icons-material/Edit';
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

const PlantPage = ({params}) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Container maxWidth="lg">  <Grid container spacing={2} mt={10}>
    <Box>
      <Grid container spacing={20}>
        <Grid item xs={6}>
          <div style={{borderRadius: '20px', overflow: 'hidden', width:"580px", height: "580px"}}>
            <CardMedia
              component="img"
              image="https://picsum.photos/400/400"
              alt="plant image"
            />
          </div>          
          <Grid container spacing={2} alignItems="center" marginTop="10px">
            <Grid item xs={6}>
                <Button variant="contained">Edit Plant</Button>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Registered: August 8, 2024
                </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h2" >
            Plant Name {params.id}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Plant Type
          </Typography>
          <Grid container spacing={2} alignItems="center" marginBottom={"20px"}>
            <Grid item xs={6}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <img src="/iconWater.svg" style={{width:"80px", height: "80px"}}/>
                </Grid>
                <Grid item xs={8}>
                  <Stack 
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      spacing={2}>
                    <Typography variant="body1" display="block" gutterBottom>
                      2 days left
                    </Typography>
                    <CircleIcon style={{color:"#304D30"}}/>
                  </Stack>
                  <Typography variant="body2" display="block" >
                    once every 2 weeks
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <img src="/iconFertilizer.svg" style={{width:"60px", height: "60px"}}/>
                </Grid>
                <Grid item xs={8}>
                  <Stack 
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}>
                    <Typography variant="body1" display="block" gutterBottom>
                      24 days left
                    </Typography>
                    <CircleIcon style={{color:"#DB613A"}}/>
                  </Stack>
                  <Typography variant="body2" display="block" >
                    once every 2 months
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid> 
          <Typography variant="body1" align={"justify"} gutterBottom >
            Here we will add a short description about this specific plant and 
            any other extra comment we would like to have as part of the plant 
            information. 
          </Typography>
          
          <DemoContainer components={['DateCalendar']} sx={{alignItems: "center"}}>
            <DateCalendar views={['day']} readOnly />
          </DemoContainer>
          <Stack 
            direction="row"
            justifyContent="space-around"
            alignItems="center">
            <Button variant="contained" style={{background:"#304D30", width: "120px"}}>Water</Button>
            <Button variant="contained" style={{background:"#DB613A", width: "120px"}}>Fertilize</Button> 
          </Stack>          
        </Grid>
      </Grid>
    </Box>

  </Grid>




  <Grid container spacing={2} mt={2}>
    {
            Array(5).fill(1).map((a)=>(
                <Grid item xs={12} md={6} lg={3}>
                    <Card>
                        <CardMedia
                        component="img"
                        image="https://picsum.photos/400/300"
                        alt="Paella dish"
                    />
                      <CardContent>
                          <Typography variant="body2" color="text.secondary">
                          This paragraph is just the description of the image post I did linked to this specific plant.
                          </Typography>
                      </CardContent>
                        <CardActions >
                        <IconButton aria-label="add to favorites" size="small" >
                                <FavoriteIcon sx={{ height: 20, width: 20 }} />
                            </IconButton>
                            <IconButton aria-label="share" size="small" >
                                <ShareIcon sx={{ height: 20, width: 20 }}/>
                            </IconButton>
                            <IconButton aria-label="edit" size="small" >
                                <EditIcon sx={{ height: 20, width: 20 }} />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            ))
        }
        
        
    </Grid>
    </Container>
    </LocalizationProvider>
    )
}

export default PlantPage;