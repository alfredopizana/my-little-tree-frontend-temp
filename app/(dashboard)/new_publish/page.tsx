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
//import { VisuallyHiddenInput } from '@/theme/globalVariables'
import PostCard from "@/components/PostCard";
import { auth } from "@clerk/nextjs";
import { FormEvent } from "react";
import { ErrorMessage, useFormik } from "formik";
import * as yup from 'yup';
import type { NextPage } from 'next';
import { useEffect, useState } from "react";
import Image from "next/image";
import { getSignedURL, createPlant } from "./actions";

export declare type PostForm = {
    description: String,
    tags: Array<String>,
    userId?: String
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const NewPublish: NextPage = () => {

    const [statusMessage, setStatusMessage] = useState("");
    const [loading, setLoading] = useState(false);

    //AQUI VAN LAS COSAS DEL FILE Y TODO ESO, TOMANDO COMO BASE LA PAGINA "ADD PAGE", PERO LO OMITIRE POR EL MOMENTO

    const formik = useFormik<PostForm>({
        initialValues: {
            description: "",
            tags: [],
        },
        onSubmit: async (values ,actions) =>{
            
            setStatusMessage("Creating Post");
            setLoading(true)

            //AQUI IRIA EL TRY CATCH PARA LAS COSAS DE LA IMAGEN Y DE LOS WATERED Y FERTILIZED, LO MOMITO POR QUE NO APLICA AQUI

            setStatusMessage("Post Created");
            setLoading(false)
        },

        validationSchema: yup.object({
            description: yup.string().required("Field is required"),
            tags: yup.array().required("Field is required")
        })
    });
            

    return (
        <div>
        <form onSubmit={formik.handleSubmit}>
        <Container maxWidth="xs">
        <Grid container spacing={2} mt={2}>

        <h1>
        New Post
        </h1>

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
        <Grid container direction="row" alignItems="center" justifyContent="center" marginTop="3px">
        <Button
            style={{background:"#DB613A"}}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
        Upload file
        <VisuallyHiddenInput type="file" />
        </Button>
        </Grid>

        <Grid item xs={6}lg={12} spacing={2}>
            <div>
                <TextField
                    style={{ background:"#EEF0E5", border:"#EEF0E5" }}
                    id="filled-basic" 
                    label="Description" 
                    name="description" 
                    variant="filled"
                    fullWidth
                    multiline
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
            </div>
        </Grid>

{/*Codigo del cuadro de hashtags*/}
        <Grid item xs={6}lg={12} mt={2}>
        <Autocomplete
            multiple
            id="tags-outlined"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            style={{ background:"#EEF0E5", border:"#EEF0E5" }}
            filterSelectedOptions
            renderInput={(params) => (
            <TextField
                {...params}
                id="filled-basic" 
                label="Tags" 
                name="Tags" 
                variant="filled" 
                fullWidth
                value={formik.values.tags}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.tags && Boolean(formik.errors.tags)}
                helperText={formik.touched.tags && formik.errors.tags}
                placeholder="Add Tag"
            />
            )}
        />
        </Grid>

{/*Codigo de los botones cancel y publish*/}
        <Grid container direction="row" alignItems="center" justifyContent="flex-end" marginTop="40px">
        <Stack 
            spacing={{ xs: 1, sm: 2, md: 5 }}
            direction="row"
            justifyContent="flex-end"
            alignItems="center">
            <Button
                variant="contained"
                fullWidth 
                >
                Cancel</Button>

            <Button
                variant="contained" 
                fullWidth 
                type="submit"
                >
                Publish</Button>
        </Stack>
        </Grid>

        </Grid>
        </Container>
        </form>
    </div>
    );
}

export default NewPublish;