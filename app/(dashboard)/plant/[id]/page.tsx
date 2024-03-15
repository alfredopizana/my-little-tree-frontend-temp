import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, Typography} from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CircleIcon from '@mui/icons-material/Circle';

const PlantPage = () => {

  return (<Container maxWidth="lg">  <Grid container spacing={2} mt={10}>
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div style={{borderRadius: '20px', overflow: 'hidden', width:"500px", height: "500px"}}>
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
            Plant Name 1
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
                  <Typography variant="body1" display="block" gutterBottom>
                    2 days left
                  </Typography>
                  <CircleIcon style={{color:"#304D30"}}/>
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
                  <Typography variant="body1" display="block" gutterBottom>
                    24 days left
                  </Typography>
                  <CircleIcon style={{color:"#DB613A"}}/>
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
          <Typography variant="body2" align={"left"} gutterBottom >
              February 2024
          </Typography>

          <Box>
            <Button variant="contained" style={{background:"#304D30", width: "120px"}}>Water</Button>
            <Button variant="contained" style={{background:"#DB613A", width: "120px"}}>Fertilize</Button> 
          </Box>          
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
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </CardActions>
                    </Card>
                </Grid>
            ))
        }
        
        
    </Grid>
    </Container>
    )
}



/*
export default function Page({params}) {
  return <p>Plant: {params.id}</p>
}*/

export default PlantPage;