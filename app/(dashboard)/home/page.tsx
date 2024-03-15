import Navigation from "@/components/navigation";
import { Box, Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, TextField, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomButton from '@/components/CustomButton'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
const HomePage = ()=>{
    return (<Container maxWidth="lg"> 
    <Grid container spacing={2} mt={2}>
            
    <h1>Esto es home</h1>
            <CustomButton title="me gusta el pan dulce"/> 
            <AccessAlarmIcon />
        <Grid item xs={12}>
        <Box
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ border: '2px solid grey' }}
        >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <h1>Es un titulo</h1>
        <div style={{backgroundColor:"red",borderRadius: "4px", padding:"4px"}}>Custom Code </div>
    </Box>

        </Grid>
        {
            Array(5).fill(1).map((a)=>(
                <Grid item xs={12} md={6} lg={3}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="194"
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
                            <img src="/Watering.svg" style={{width:"40px", height: "40px"}}/>
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

export default HomePage;