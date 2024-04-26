'use client'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, Stack, Typography} from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CircleIcon from '@mui/icons-material/Circle';
import EditIcon from '@mui/icons-material/Edit';
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";
import { getSession } from "../../actions/sessions";
import { Calendar } from "@/components/Calendar";
import dayjs from "dayjs";

async function getPlantInfo(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/plants/${id}`, )
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  } catch (error) {
    console.log({error})
    throw new Error('Failed to fetch data')
  }
}

async function getPostsByPlantId(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/posts/search?plantId=${id}`,{
      headers:{
        'Content-Type': 'application/json'
      }})
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  } catch (error) {
    console.log({error})
    throw new Error('Failed to fetch data')
  }
}

async function updateLastWatered(id: string, freq: number) {
  try {

    const date = new Date()
    const nextDate = new Date(date.getTime() + (freq*24*60*60*1000))

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/plants/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        lastWatered : date,
        nextWatering : nextDate
      })
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  } catch (error) {
    console.log({error})
    throw new Error('Failed to fetch data')
  }
}

async function updateLastFertilizer(id: string, freq: number) {
  try {

    const date = new Date()
    const nextDate = new Date(date.getTime() + (freq*24*60*60*1000))

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/plants/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        lastFertilizer : date,
        nextFertilizer : nextDate
      })
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
  } catch (error) {
    console.log({error})
    throw new Error('Failed to fetch data')
  }
}

const PlantPage = ({params}: {params: {id: string}}) => {

  const[plant, setPlant] = useState(undefined);
  const[posts, setPost] = useState(undefined);

  const[waterDaysLeft, setNextWatering] = useState(undefined);
  const[fertilizerDaysLeft, setNextFertilizer] = useState(undefined);
  const formatDate = (date) =>{
      if(dayjs(date).isValid())
          return dayjs(date).format("YYYY-MM-DD")
      return dayjs().format("YYYY-MM-DD")

  }  

  useEffect(() => {
    getPlantInfo(params.id).then((res) => {
      console.log(res)
      setPlant(res?.data?.plants)
      setNextWatering(Math.round((new Date(res?.data?.plants?.nextWatering).getTime() -  new Date().getTime()) / (1000 * 3600 * 24)));
      setNextFertilizer(Math.round((new Date(res?.data?.plants?.nextFertilizer).getTime() -  new Date().getTime()) / (1000 * 3600 * 24)));
    });  

    

    getPostsByPlantId(params.id).then((res) => {
      console.log(res)
      setPost(res?.data?.posts)
    });
  }, [])

  function updateWater() {
    updateLastWatered(params.id, plant.wateringFrequency).then((res) => {
      console.log(res)
      setPlant(res?.data?.plant)
      setNextWatering(Math.round((new Date(res?.data?.plant?.nextWatering).getTime() -  new Date().getTime()) / (1000 * 3600 * 24)));
    })
  }

  function updateFertilize() {
    updateLastFertilizer(params.id, plant.fertilizerFrequency).then((res) => {
      console.log(res);
      setPlant(res?.data?.plant);
      setNextFertilizer(Math.round((new Date(res?.data?.plant?.nextFertilizer).getTime() -  new Date().getTime()) / (1000 * 3600 * 24)));
    })
  }

  return plant &&  (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Container maxWidth="lg">  <Grid container spacing={2} mt={10}>
    <Box>
      <Grid container spacing={20}>
        <Grid item xs={6}>
          <div style={{borderRadius: '20px', overflow: 'hidden', width:"580px", height: "580px"}}>
            <CardMedia
              component="img"
              image={plant.imageUrl}
              alt="plant image"
            />
          </div>          
          <Grid container spacing={2} alignItems="center" marginTop="10px">
            <Grid item xs={6}>
                {/* <Button variant="contained" disabled>Edit Plant</Button> */}
                <Button variant='contained'
                href={`/new-publish/${params.id}`}
                  sx={{mr:4, 
                  backgroundColor:'#304D30',
                  ':hover': {
                    bgcolor: '#304D30', 
                    opacity: '.8',
                    color: 'white',
                  },}}>
                    New Post
            </Button>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Registered: {new Date(plant.createdAt).toDateString()}
                </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h2" >
            {plant.nickname}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Type: {plant.plantType}
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
                     {waterDaysLeft} days left
                    </Typography>
                    <CircleIcon style={{color:"#304D30"}}/>
                  </Stack>
                  <Typography variant="body2" display="block" >
                    every {plant.wateringFrequency} days
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
                      {fertilizerDaysLeft} days left
                    </Typography>
                    <CircleIcon style={{color:"#DB613A"}}/>
                  </Stack>
                  <Typography variant="body2" display="block" >
                    every {plant.fertilizerFrequency} days
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid> 
          <Typography variant="body1" align={"justify"} gutterBottom >
            {plant.description}
          </Typography>
          <Calendar days={[formatDate(plant.nextWatering)]} fDays={[formatDate(plant.nextFertilizer)]}></Calendar>
          <Stack 
            direction="row"
            justifyContent="space-around"
            alignItems="center">
            <Button variant="contained" style={{background:"#304D30", width: "120px"}} onClick={updateWater} type="button">Water</Button>
            <Button variant="contained" style={{background:"#DB613A", width: "120px"}} onClick={updateFertilize} type="button">Fertilize</Button> 
          </Stack>          
        </Grid>
      </Grid>
    </Box>

  </Grid>




    <Grid container spacing={2} mt={2}>
      {
        posts && posts.sort((a,b)=>{ 
          const first = dayjs(a.createdAt);
          const second = dayjs(b.createdAt);
          return first.isAfter(second)? -1:1}).map((post, index)=>(
          <Grid item xs={12} md={6} lg={4} key={"card"+ index}>
            <PostCard post={post} />
          </Grid>
        ))
      }
          
          
    </Grid>
    </Container>
    </LocalizationProvider>
    )
  
}

export default PlantPage;