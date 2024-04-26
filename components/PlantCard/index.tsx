import { Card, CardActions, CardContent, CardMedia, Grid, Link, IconButton, Typography } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';
import Image from "next/image";
import PlantIcon from "@/public/iconPlant.svg";
import { Plant } from "@/types/plant.type";

type Props = {
    plant: Plant
}

const PlantCard = ({plant}:Props)=> {
    const {
        _id,
        nickname,
        plantType,
        description,
        wateringFrequency,
        lastWatered,
        nextWatering,
        dismissedWatering,
        fertilizerFrequency,
        lastFertitlizer,
        nextFertilizer,
        dismissedFertilizer,
        imageUrl,
        userId} = plant;
        const nextWateringCount = (Math.round((new Date(nextWatering).getTime() -  new Date().getTime()) / (1000 * 3600 * 24)));
        const nextFertilizerCount = (Math.round((new Date(nextFertilizer).getTime() -  new Date().getTime()) / (1000 * 3600 * 24)));    

    return  <Link href={`/my-plants/${_id}`}>
            <Card sx={{ minWidth: 180 }} >
                <CardMedia
                component="img"
                height="180"
                image={imageUrl || "https://picsum.photos/400/300"}
                alt="Paella dish"
                />
                <CardContent>
                    <Typography sx={{ fontSize: 24 }} color="#304D30">
                    {nickname}
                    </Typography>
                    <Typography sx={{ fontSize: 16 }} color="#304D30">
                    {plantType}
                    </Typography>
                    <Typography sx={{ fontSize: 13 }} color="#304D30">
                    {description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="watering">
                        <img src="/iconWater.svg" style={{width:"33px", height: "33px"}}/>
                    </IconButton>
                    <Typography sx={{ fontSize: 11 }} color="#304D30">
                    {nextWateringCount}d left
                    </Typography>
                    <IconButton aria-label="fertilize">
                        <img src="/iconFertilizer.svg" style={{width:"23px", height: "23px"}}/>
                    </IconButton>
                    <Typography sx={{ fontSize: 11 }} color="#304D30">
                    {nextFertilizerCount}d left
                    </Typography>
                </CardActions>
            </Card>
        </Link>
}

export default PlantCard