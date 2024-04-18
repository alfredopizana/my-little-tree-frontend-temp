"use client"
import { Box, Button, Card, CardMedia, Container, Grid, Paper, Skeleton, styled, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import type { NextPage } from 'next';
import { auth } from "@clerk/nextjs";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from "react";
import Image from "next/image";

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

// const validationSchema = yup.object({
//     email: yup
//       .string('Enter your email')
//       .email('Enter a valid email')
//       .required('Email is required'),
//     password: yup
//       .string('Enter your password')
//       .min(8, 'Password should be of minimum 8 characters length')
//       .required('Password is required'),
//   });



const AddPlant: NextPage = () => {
    
    const [file, setFile] = useState<File | undefined>(undefined);
    const [fileURL, setFileURL] = useState<string | undefined>(undefined);

    const [statusMessage, setStatusMessage] = useState("");
    const [loading, setLoading] = useState(false);

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
    useEffect(() => {
      
        console.log(file)
      
    }, [file])
    type FormikSubmitHandler<V> = (value: object, actions: FormikActions<V>) => void;
    interface FormValues {
        foo: string;
        bar: number
      }
    const handleFormSubmit: FormikSubmitHandler<FormValues> = (values ,actions) =>{
        
        setStatusMessage("Creeating Plant");
        setLoading(true)
        console.log({values})
        setStatusMessage("Plant Created");
        setLoading(false)
    }

    const formik = useFormik({
    initialValues: {
        nickname: "",
        plantType: "",
        description: "",
        wateringFrequency: "",
        lastWatered: "",
        fertilizerFrequency: "",
        lastFertitlizer:"",
    },
    onSubmit: (values ,actions) =>{
        
        setStatusMessage("Creeating Plant");
        setLoading(true)
        console.log({values})
        console.log({file})
        setStatusMessage("Plant Created");
        setLoading(false)
    },
    // validationSchema: yup.object({
    //   name: yup.string().trim().required('Name is required'),
    //   email: yup
    //     .string()
    //     .email('Must be a valid email')
    //     .required('Email is required'),
    //   message: yup.string().trim().required('Message is required'),
    // }),
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
            <Container maxWidth="lg" >
                <Grid container spacing={2} my={4}>
                    <Grid item xs={12} lg={6} p={2}>
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
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                
                                >
                                Upload file
                                <VisuallyHiddenInput 
                                    type="file" 
                                    accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
                                    onChange={handleFileChange}
                                    />
                            </Button>
                        </Box>
                        
                    </Grid>
                    <Grid container item xs={12} lg={6} spacing={2}>
                        <Grid item xs={12}lg={6}>
                            <TextField 
                                id="filled-basic" 
                                label="Nickname" 
                                name="nickname" 
                                variant="filled" 
                                fullWidth
                                value={formik.values.nickname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.nickname && Boolean(formik.errors.nickname)}
                                helperText={formik.touched.nickname && formik.errors.nickname}
                                />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <TextField 
                                id="filled-basic" 
                                label="Plant Type" 
                                name="plantType" 
                                variant="filled" 
                                fullWidth
                                value={formik.values.plantType}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.plantType && Boolean(formik.errors.plantType)}
                                helperText={formik.touched.plantType && formik.errors.plantType}
                                />
                        </Grid>
                        <Grid item xs={12} lg={12}>
                            <TextField 
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
                        </Grid>
                        
                        <Grid item xs={12} lg={6}>
                            <TextField 
                                id="filled-basic" 
                                label="Watering Frequency" 
                                name="wateringFrequency" 
                                variant="filled"
                                fullWidth
                                value={formik.values.wateringFrequency}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.wateringFrequency && Boolean(formik.errors.wateringFrequency)}
                                helperText={formik.touched.wateringFrequency && formik.errors.wateringFrequency} 
                            />
                        </Grid>
                        

                        <Grid item xs={12} lg={6}>
                            <TextField 
                                id="filled-basic" 
                                label="Last Watered" 
                                name="lastWatered" 
                                variant="filled"
                                fullWidth
                                value={formik.values.lastWatered}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.lastWatered && Boolean(formik.errors.lastWatered)}
                                helperText={formik.touched.lastWatered && formik.errors.lastWatered} 
                            />
                        </Grid>
                        
                        <Grid item xs={12} lg={6}>
                            <TextField 
                                id="filled-basic" 
                                label="Fertilizer Frequency" 
                                name="fertilizerFrequency" 
                                variant="filled"
                                fullWidth
                                value={formik.values.fertilizerFrequency}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.fertilizerFrequency && Boolean(formik.errors.fertilizerFrequency)}
                                helperText={formik.touched.fertilizerFrequency && formik.errors.fertilizerFrequency} 
                            />
                        </Grid>
                        
                        <Grid item xs={12} lg={6}>
                            <TextField 
                                id="filled-basic" 
                                label="Last Fertitlizer" 
                                name="lastFertitlizer" 
                                variant="filled"
                                fullWidth
                                value={formik.values.lastFertitlizer}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.lastFertitlizer && Boolean(formik.errors.lastFertitlizer)}
                                helperText={formik.touched.lastFertitlizer && formik.errors.lastFertitlizer} 
                            />
                        </Grid>
                        
                        <Grid item xs={12} lg={12}>
                        <Button 
                            color="primary" 
                            variant="contained" 
                            fullWidth 
                            type="submit">
                            Submits
                        </Button>
                        </Grid>
                        
                    </Grid>
                
                </Grid>
            </Container>
            
            
            
            </form>
        </div>
    );
}
export default AddPlant;