'use client';
import Navigation from "@/components/navigation";
import { styled } from '@mui/material/styles';
import { Box, Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, TextField, Typography, Button, Chip, Autocomplete } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { top100Films } from '@/theme/globalVariables'

const NewPublish = ()=>{
    return (
        <Container maxWidth="xs">
        <Grid container spacing={2} mt={2}>

        <h1>New Post</h1>

{/*Codigo de la imagen como CARD*/}
        <Grid item xs={12} md={12} lg={12}>
            <Card sx={{ maxWidth: 400 }}>
                <CardMedia
                    component="img"
                    height="400"
                    image="https://picsum.photos/400/400"
                    alt="Paella dish"
                />
            </Card>
        </Grid>
{/*Codigo del Boton para subir archivos*/}
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
        </Button>

        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 3, width: '43ch' },
                }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                defaultValue="Please enter a description for your post"
                />
            </div>
        </Box>

{/*Codigo del cuadro de hashtags*/}
        <Container maxWidth="xs">
        <Stack sx={{ width: 383 }}>
        <Autocomplete
            multiple
            id="tags-outlined"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            defaultValue={[top100Films[0]]}
            filterSelectedOptions
            renderInput={(params) => (
            <TextField
                {...params}
                label="Tags"
                placeholder="Add Tag"
            />
            )}
        />
        </Stack>
        </Container>

        </Grid>
        </Container>
    )


}

export default NewPublish;