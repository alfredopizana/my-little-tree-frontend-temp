//"use client"
import Navigation from "@/components/navigation";
import { styled } from '@mui/material/styles';
import { Box, Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, TextField, Typography, Button, Chip, Autocomplete, Paper, Avatar } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DateCalendar } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import PlantCard from "@/components/PlantCard";
import { PostAddSharp } from "@mui/icons-material";
import { auth } from "@clerk/nextjs";

async function getData(userId){
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/plants/search?userId=${userId}`)

        if (!res.ok){
            throw new Error('Failed to fetch data')
        }

        return res.json()
    } catch(error){
        console.log({error})
        throw new Error('Failed to fetch data')
    }
}
// async function getData() {
//     const res = await fetch('http://localhost:8080/plants')
//     // The return value is *not* serialized
//     // You can return Date, Map, Set, etc.
   
//     if (!res.ok) {
//       // This will activate the closest `error.js` Error Boundary
//       throw new Error('Failed to fetch data')
//     }
   
//     return res.json()
// }

const My_Plants = async ()=>{

    const { userId } = auth();
    const response = await getData(userId);
    const plants = response?.data?.plants;
    return (
    
    //<LocalizationProvider dateAdapter={AdapterDayjs}>
    <Container maxWidth="lg">
    <Grid container spacing={2} mt={2}>

{/*Codigo del calendario*/}
    <Grid item xs={8} md={6} lg={8.7}>

        <Typography variant="h5" gutterBottom>
            <b>My Calendar</b>
        </Typography>

        {/*<DemoContainer components={['DateCalendar']} sx={{alignItems: "left"}}>
            <DateCalendar views={['day']} readOnly />
        </DemoContainer>*/}
        
    </Grid>

{/*Codigo del cuadro de editar perfil*/}
    <Grid item xs={2} md={6} lg={3.3}>
        <Box my={2} alignItems="center" p={2} sx={{ bgcolor: '#f5f4f4', width: "450px", height: '230px', borderRadius: 7 }} >
         <Stack 
            spacing={4}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start" >
            <Avatar
                alt="Remy Sharp"
                src="/iconProfilePicture.png"
                sx={{ width: 130, height: 130 }}
            />
            <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer elementum quam ligula, ac semper lorem tempor et. Aliquam id velit iaculis, aliquet arcu vel, gravida orci.
            </Typography>
         </Stack>

        <Grid container direction="row" alignItems="center" justifyContent="flex-end" marginTop="20px">
            <Grid item xs={3} md={6} lg={7.5}>
                {/*Vacio a proposito para posicionar el boton "Edit Profile" correctamente*/}
            </Grid>

            <Grid item xs={9} md={6} lg={4.5}>
                <Button variant="contained" style={{background:"#304D30", width: "140px"}}>Edit Profile</Button>
            </Grid>
        </Grid>
        </Box>
    </Grid>

{/*Codigo de las tarjetas de plantas, 8 grids*/}
<Grid item xs={8} md={6} lg={8.7}>
    <Typography variant="h5" gutterBottom>
        <b>My Plants</b>
    </Typography>

    <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="flex-start">
        <Stack spacing={5} direction="row" justifyContent="flex-start" alignItems="center" >
    {/*1er Grid*/}
    {/* <Grid item xs={1} md={1} lg={2.175}>
        // {
        //         plants && plants.map((plant, index)=>(
        //             <Grid item xs={12} md={6} lg={4} key={"card"+ index}>
        //                 <PlantCard plant={plant} />
        //             </Grid>
        //         ))
        //     }
    </Grid> */}
    {/*2o Grid*/}
    {/* <Grid item xs={1} md={1} lg={2.175}>
        <Card sx={{ minWidth: 180 }}>
            <CardMedia
            component="img"
            height="180"
            image="https://picsum.photos/400/300"
            alt="Paella dish"
            />
            <CardContent>
                <Typography sx={{ fontSize: 24 }} color="#304D30">
                Filomena
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="#304D30">
                Garra de Leon
                </Typography>
                <Typography sx={{ fontSize: 13 }} color="#304D30">
                A small description about your plant...
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                 <IconButton aria-label="watering">
                    <img src="/iconWater.svg" style={{width:"33px", height: "33px"}}/>
                </IconButton>
                <Typography sx={{ fontSize: 11 }} color="#304D30">
                2d left
                </Typography>
                <IconButton aria-label="fertilize">
                    <img src="/iconFertilizer.svg" style={{width:"23px", height: "23px"}}/>
                </IconButton>
                <Typography sx={{ fontSize: 11 }} color="#304D30">
                2w left
                </Typography>
            </CardActions>
        </Card>
    </Grid> */}
    {/*3er Grid*/}
    {/* <Grid item xs={1} md={1} lg={2.175}>
        <Card sx={{ minWidth: 180 }}>
            <CardMedia
            component="img"
            height="180"
            image="https://picsum.photos/400/300"
            alt="Paella dish"
            />
            <CardContent>
                <Typography sx={{ fontSize: 24 }} color="#304D30">
                Mary
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="#304D30">
                Suculenta
                </Typography>
                <Typography sx={{ fontSize: 13 }} color="#304D30">
                A small description about your plant...
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                 <IconButton aria-label="watering">
                    <img src="/iconWater.svg" style={{width:"33px", height: "33px"}}/>
                </IconButton>
                <Typography sx={{ fontSize: 11 }} color="#304D30">
                6d left
                </Typography>
                <IconButton aria-label="fertilize">
                    <img src="/iconFertilizer.svg" style={{width:"23px", height: "23px"}}/>
                </IconButton>
                <Typography sx={{ fontSize: 11 }} color="#304D30">
                2w left
                </Typography>
            </CardActions>
        </Card>
    </Grid> */}
    {/*4to Grid*/}
    {/* <Grid item xs={1} md={1} lg={2.175}>
        <Card sx={{ minWidth: 180 }}>
            <CardMedia
            component="img"
            height="180"
            image="https://picsum.photos/400/300"
            alt="Paella dish"
            />
            <CardContent>
                <Typography sx={{ fontSize: 24 }} color="#304D30">
                Lavanda
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="#304D30">
                Lavanda
                </Typography>
                <Typography sx={{ fontSize: 13 }} color="#304D30">
                A small description about your plant...
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                 <IconButton aria-label="watering">
                    <img src="/iconWater.svg" style={{width:"33px", height: "33px"}}/>
                </IconButton>
                <Typography sx={{ fontSize: 11 }} color="#304D30">
                1d ago
                </Typography>
                <IconButton aria-label="fertilize">
                    <img src="/iconFertilizer.svg" style={{width:"23px", height: "23px"}}/>
                </IconButton>
                <Typography sx={{ fontSize: 11 }} color="#304D30">
                4w left
                </Typography>
            </CardActions>
        </Card>
    </Grid>
        </Stack>

        <Stack spacing={5} direction="row" justifyContent="flex-start" alignItems="center" > */}
    {/*5to Grid*/}
    {/* <Grid item xs={1} md={1} lg={2.175}>
        <Card sx={{ minWidth: 180 }}>
            <CardMedia
            component="img"
            height="180"
            image="https://picsum.photos/400/300"
            alt="Paella dish"
            />
            <CardContent>
                <Typography sx={{ fontSize: 24 }} color="#304D30">
                Lucy
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="#304D30">
                Garra de Leon
                </Typography>
                <Typography sx={{ fontSize: 13 }} color="#304D30">
                A small description about your plant...
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                 <IconButton aria-label="watering">
                    <img src="/iconWater.svg" style={{width:"33px", height: "33px"}}/>
                </IconButton>
                <Typography sx={{ fontSize: 11 }} color="#304D30">
                2d ago
                </Typography>
                <IconButton aria-label="fertilize">
                    <img src="/iconFertilizer.svg" style={{width:"23px", height: "23px"}}/>
                </IconButton>
                <Typography sx={{ fontSize: 11 }} color="#304D30">
                3w left
                </Typography>
            </CardActions>
        </Card>
    </Grid> */}
    {/* 6to Grid
    <Grid item xs={1} md={1} lg={2.175}>
        <Card sx={{ minWidth: 180 }}>
            <CardMedia
            component="img"
            height="180"
            image="https://picsum.photos/400/300"
            alt="Paella dish"
            />
            <CardContent>
                <Typography sx={{ fontSize: 24 }} color="#304D30">
                Limonsito
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="#304D30">
                Arbol de Limon
                </Typography>
                <Typography sx={{ fontSize: 13 }} color="#304D30">
                A small description about your plant...
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                 <IconButton aria-label="watering">
                    <img src="/iconWater.svg" style={{width:"33px", height: "33px"}}/>
                </IconButton>
                <Typography sx={{ fontSize: 11 }} color="#304D30">
                5d left
                </Typography>
                <IconButton aria-label="fertilize">
                    <img src="/iconFertilizer.svg" style={{width:"23px", height: "23px"}}/>
                </IconButton>
                <Typography sx={{ fontSize: 11 }} color="#304D30">
                1w left
                </Typography>
            </CardActions>
        </Card>
    </Grid> */}
    {/*7mo Grid*/}
    {/* <Grid item xs={1} md={1} lg={2.175}>
        <Card sx={{ minWidth: 180 }}>
            <CardMedia
            component="img"
            height="180"
            image="https://picsum.photos/400/300"
            alt="Paella dish"
            />
            <CardContent>
                <Typography sx={{ fontSize: 24 }} color="#304D30">
                Zacate
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="#304D30">
                Zacate de Limo
                </Typography>
                <Typography sx={{ fontSize: 13 }} color="#304D30">
                A small description about your plant...
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                 <IconButton aria-label="watering">
                    <img src="/iconWater.svg" style={{width:"33px", height: "33px"}}/>
                </IconButton>
                <Typography sx={{ fontSize: 11 }} color="#304D30">
                10d left
                </Typography>
                <IconButton aria-label="fertilize">
                    <img src="/iconFertilizer.svg" style={{width:"23px", height: "23px"}}/>
                </IconButton>
                <Typography sx={{ fontSize: 11 }} color="#304D30">
                10w left
                </Typography>
            </CardActions>
        </Card>
    </Grid> */}
    {/*8vo Grid*/}
    {/* <Grid item xs={1} md={1} lg={2.175}>
        <Card sx={{ minWidth: 180 }}>
            <CardMedia
            component="img"
            height="180"
            image="https://picsum.photos/400/300"
            alt="Paella dish"
            />
            <CardContent>
                <Typography sx={{ fontSize: 24 }} color="#304D30">
                Rosita
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="#304D30">
                Rosal
                </Typography>
                <Typography sx={{ fontSize: 13 }} color="#304D30">
                A small description about your plant...
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                 <IconButton aria-label="watering">
                    <img src="/iconWater.svg" style={{width:"33px", height: "33px"}}/>
                </IconButton>
                <Typography sx={{ fontSize: 11 }} color="#304D30">
                21d left
                </Typography>
                <IconButton aria-label="fertilize">
                    <img src="/iconFertilizer.svg" style={{width:"23px", height: "23px"}}/>
                </IconButton>
                <Typography sx={{ fontSize: 11 }} color="#304D30">
                9w left
                </Typography>
            </CardActions>
        </Card>
    </Grid> */}
        </Stack>
    </Stack>
</Grid>

{/*Codigo del cuadro de stats and record, last watered plant y reminder need sun*/}
<Grid item xs={2} md={6} lg={3.3}>
    <Typography variant="h6" gutterBottom>
        <b>Stats and Record</b>
    </Typography>

    {/*Recommended addons*/}
    <Box height={225} width= {450} my={2} display="flex" alignItems="center" p={2} sx={{ border: '4.5px solid #B19470', borderRadius: 7 }}>
        <Stack spacing={2} direction="column" justifyContent="center" alignItems="center" >

            <Typography sx={{ fontSize: 15 }} color="#76453B">
                <b>Recommended AddOns for your plants</b>
            </Typography>

            <Stack spacing={5} direction="row" justifyContent="flex-start" alignItems="flex-start" >

                <img src={"/iconStatsRecord.png"} alt={"Stats record"} loading="lazy" style={{display: 'flex',flexGrow: 1,maxWidth:'150px'}} />
                <Stack spacing={1} direction="column" justifyContent="center" alignItems="flex-start" >
                    <Typography sx={{ fontSize: 14 }} color="#1E1E1E">
                        Max Fertilizer Pack eco-12
                    </Typography>

                    <Typography sx={{ fontSize: 12 }} color="#1E1E1E">
                        The best fertilizer on México, ecologic recommended for ornamental plants, friendly to fruit species.
                    </Typography>
                </Stack>
            </Stack>
            <Grid container direction="row" alignItems="center" justifyContent="flex-end" marginTop="100px">
                <Button variant="contained" style={{background:"#304D30", width: "130px"}}>View More</Button>
            </Grid>
        </Stack>
    </Box>
    
    {/*Last watered*/}
    <Box height={145} width= {450} my={2} display="flex" alignItems="center" p={2} sx={{ bgcolor: '#f5f4f4', borderRadius: 7 }}>
        <Stack spacing={4} direction="row" justifyContent="flex-start" alignItems="center" >
            <Box height={90} width= {90} my={2} display="flex" alignItems="center" p={2} sx={{ border: '4.5px solid #304D30', borderRadius: 2 }}>
                <img src="/iconWater.svg" style={{width:"50px", height: "70px"}}/> 
            </Box>

            <Stack spacing={0.5} direction="column" justifyContent="center" alignItems="flex-start" >
                <Typography sx={{ fontSize: 19 }} color="#304D30">
                    <b>Last watered plant</b>
                </Typography>

                <Typography sx={{ fontSize: 18 }} color="#1E1E1E">
                    Mary
                </Typography>
                
                <Typography sx={{ fontSize: 15 }} color="#1E1E1E">
                    Lorem ipsum dolor sit amet, consectetur adipiscing el.
                </Typography>
            </Stack>
        </Stack>
    </Box>

     {/*Reminder*/}
    <Box height={145} width= {450} my={3} display="flex" alignItems="center" p={2} sx={{ bgcolor: '#f5f4f4', borderRadius: 7 }}>
        <Stack spacing={4} direction="row" justifyContent="flex-start" alignItems="center" >
            <Box height={90} width= {90} my={2} display="flex" alignItems="center" p={1} sx={{ border: '4.5px solid #304D30', borderRadius: 2 }}>
                <img src="/iconSun.png" style={{width:"65px", height: "60px"}}/> 
            </Box>

            <Stack spacing={0.5} direction="column" justifyContent="center" alignItems="flex-start" >
                <Typography sx={{ fontSize: 19 }} color="#304D30">
                    <b>Reminder - Need Sun</b>
                </Typography>

                <Typography sx={{ fontSize: 18 }} color="#1E1E1E">
                    Mary
                </Typography>
                
                <Typography sx={{ fontSize: 15 }} color="#1E1E1E">
                    Lorem ipsum dolor sit amet, consectetur adipiscing el.
                </Typography>
            </Stack>
        </Stack>
    </Box>

</Grid>

{
    plants && plants.map((plant, index)=>(
        <Grid item xs={12} md={6} lg={4} key={"card"+ index}>
            <PlantCard plant={plant} />
        </Grid>
    ))
}

    </Grid>
    </Container>
    //</LocalizationProvider>
    )
}

export default My_Plants;