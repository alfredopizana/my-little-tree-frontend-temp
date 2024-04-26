'use client';
import Navigation from "@/components/navigation";
import { styled } from '@mui/material/styles';
import { Box, Card, CardActions, CardContent, CardMedia, Container, Grid, IconButton, TextField, Typography, Button, Chip, Autocomplete, Skeleton } from "@mui/material";
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
import { getSignedURL, createPost } from "./actions";
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
export declare type PostForm = {
    description: String,
    tags: String,
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

const NewPublish: NextPage = ({}) => {
    
    const router = useRouter()
 
    const [file, setFile] = useState<File | undefined>(undefined);
    const [fileURL, setFileURL] = useState<string | undefined>(undefined);

    const [statusMessage, setStatusMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const params = useParams<{ plantId: string }>()
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const file = e.target.files?.[0]
        setFile(file);
        if (file) {
            const url = URL.createObjectURL(file)
            setFileURL(url)
        }else{
            setFileURL(undefined)
        }
    }
    //AQUI VAN LAS COSAS DEL FILE Y TODO ESO, TOMANDO COMO BASE LA PAGINA "ADD PAGE", PERO LO OMITIRE POR EL MOMENTO

    const formik = useFormik<PostForm>({
        initialValues: {
            title:"",
            description: "",
            tags: "",
        },
        onSubmit: async (values ,actions) =>{
            
            setStatusMessage("Creating Post");
            setLoading(true)

            try {
                if(file){
                    setStatusMessage("Uploading Photo");
                    const checksum = await computeSHA256(file)
                    const signedURLResult = await getSignedURL(file.type,file.size,checksum);
                    if(signedURLResult.failure !== undefined){
                        setStatusMessage("Something went wrong")
                        setLoading(false)
                        throw( new Error(signedURLResult.failure));
                    }
                    const url = signedURLResult.success.url
                    await fetch(url,{
                        method:"PUT",
                        body:file,
                        headers:{
                            "Content-Type": file?.type
                        }
                    })
                    
                    let newPost: any =  {...values, 
                        imageUrl: url.split("?")[0],
                        plantId:params.plantId
                    }
                    
                    
                    const postCreated = await createPost(newPost)
                    console.log(postCreated)
                    router.push(`/my-plants/${params.plantId}`)
                }
            } catch (error) {
                console.log({error})
                setStatusMessage("Something went wrong");
                setLoading(false)
                return
            }

            setStatusMessage("Post Created");
            setLoading(false)
        },

        validationSchema: yup.object({
            title: yup.string().required("Field is required"),
            description: yup.string().required("Field is required"),
            
        })
    });
            
    const computeSHA256 = async (file: File) => {
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        return hashHex;
    };

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
        <Box>
                        {
                            (fileURL && file) ? (
                                <div className="mt-4">
                                {file.type.startsWith("image/") ? (
                                    <Card >
                                         <CardMedia
                                            sx={{ height: "auto", width: "100%", aspectRatio: 16/9 }}
                                            image={fileURL}
                                        />
                                    </Card>
                                ) : file.type.startsWith("video/") ? (
                                    <video src={fileURL} controls />
                                ) : null}
                                </div>
                            )
                            : (<Skeleton variant="rectangular" height="250" sx={{ height: "auto", width: "100%", aspectRatio: 16/9 }} />)
                        }
                        

                        </Box>
                        <Box mt={2}>
                            

                        </Box>

        </Grid>
{/*Codigo del Boton para subir archivos*/}
        <Grid container direction="row" alignItems="center" justifyContent="center" marginTop="3px">
            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                
                                >
                                Upload a photo
                                <VisuallyHiddenInput 
                                    type="file" 
                                    accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
                                    onChange={handleFileChange}
                                    />
                            
                            </Button>
        </Grid>
        <Grid item xs={12}lg={12} spacing={2}>
            <div>
                <TextField
                    style={{ background:"#EEF0E5", border:"#EEF0E5" }}
                    id="filled-basic" 
                    label="Title" 
                    name="title" 
                    variant="filled"
                    fullWidth
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
            </div>
        </Grid>                
        <Grid item xs={12}lg={12} spacing={2}>
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
        <Grid item xs={12}lg={12} mt={2}>
        {/* <Autocomplete
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
        /> */}
        <TextField
                    style={{ background:"#EEF0E5", border:"#EEF0E5" }}
                    id="filled-basic" 
                    label="Tags" 
                    name="tags" 
                    variant="filled"
                    fullWidth
                    value={formik.values.tags}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.tags)}
                    helperText={formik.touched.description && formik.errors.tags}
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