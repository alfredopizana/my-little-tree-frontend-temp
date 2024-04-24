import Navigation from "@/components/navigation";
import { Box, Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, SvgIcon, TextField, Typography } from "@mui/material";
import Chip from '@mui/material/Chip';
import ShareIcon from '@mui/icons-material/Share';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from "@mui/icons-material/Search";
import PlantIcon from "@/public/iconPlant.svg";
import Image from "next/image";
import PostCard from "@/components/PostCard";
import { auth } from "@clerk/nextjs";

async function getData(userId,token) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/posts/search?userId=${userId}`,{
          headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        // The return value is *not* serialized
        // You can return Date, Map, Set, etc.
       
        if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }
       
        return res.json()
    } catch (error) {
        console.log({error})
        throw new Error('Failed to fetch data')
    }
       
  }

const HomePage = async ()=>{
    
    const { userId,getToken } = auth();
    const token = await getToken()
    const response = await getData(userId,token);
    const posts = response?.data?.posts;
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
              {userId}
        </Grid>
            {
                posts && posts.map((post, index)=>(
                    <Grid item xs={12} md={6} lg={4} key={"card"+ index}>
                        <PostCard post={post} />
                    </Grid>
                ))
            }
        </Grid>
    </Container>
    )
}

export default HomePage;