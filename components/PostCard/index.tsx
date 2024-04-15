import { Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import Image from "next/image";
import PlantIcon from "@/public/iconPlant.svg";
import { Post } from "@/types/post.type";

type Props = {
    plant: Post
}
const PostCard = ({post}:Props)=> {
    const plant = post;
    return  <Card sx={{background : '#F7F8F7'}}>
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
                        {post.plantId.nickname}
                    </Grid>                                          
                </Grid>
                <Typography variant="h5" color="text.primary" my={2}>
                    {post.title}
                </Typography>
                <Typography variant="body1" color="text.primary">
                    {post.description}
                </Typography>
                <Typography variant="body2" color="text.secondary"> 3 days ago </Typography>
                </CardContent>
            <CardActions disableSpacing>                        
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
}

export default PostCard