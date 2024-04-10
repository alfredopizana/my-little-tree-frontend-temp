import Navigation from "@/components/navigation";
import { Box, Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, SvgIcon, TextField, Typography } from "@mui/material";
import Chip from '@mui/material/Chip';
import ShareIcon from '@mui/icons-material/Share';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from "@mui/icons-material/Search";
import PlantIcon from "@/public/iconPlant.svg";
import Image from "next/image";


const HomePage = ()=>{
    return (<Container maxWidth="lg"> 
  
    <Grid container spacing={2} mt={2}>
        <Grid item xs={12}>
        <Box mb={5}>
     <form>
            <TextField
            id="search-bar"
            className="text"
            placeholder="Search posts, plant names, friends, etc..." 
            variant="standard"   
            sx={{                
                borderColor: '#EEF0E5',                
              }}          
            fullWidth     
            InputProps={{
                style: { background:"#EEF0E5", padding: '32px 18px', borderRadius: '24px'},
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit" aria-label="search">
                        <SearchIcon style={{ fill: "black" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />             
            
        </form>  
    </Box>

        </Grid>
        {
            Array(5).fill(1).map((a, index)=>(
                <Grid item xs={12} md={6} lg={4} key={"card"+ index}>
                    <Card sx={{background : '#F7F8F7'}}>
                        <CardMedia
                            component="img"
                            height="194"
                            image="https://picsum.photos/400/300"
                            alt="Paella dish" 
                        />
                    <CardContent>                    
                    <Grid container spacing={2}>
                        <Grid item xs={1}>
                        <Image
                            priority
                            src={PlantIcon}
                            alt="Plant Name"
                            /> 
                        </Grid> 
                        <Grid item xs={11}>
                            Limonsito
                        </Grid>                                          
                    </Grid>
                    <Typography variant="h5" color="text.primary" my={2}>
                        Thomas just added a new plant!
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                    </Typography>
                    <Typography variant="body2" color="text.secondary"> 3 days ago </Typography>
                    </CardContent>
                    <CardActions disableSpacing>                        
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