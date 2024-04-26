"use client"
import { Alert, Box, Button, Card, CardMedia, Container, Grid, Paper, Skeleton, styled, TextField, Typography } from "@mui/material";
import { ErrorMessage, useFormik } from "formik";
import * as yup from 'yup';
import type { NextPage } from 'next';
import { auth } from "@clerk/nextjs";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from "react";
import Image from "next/image";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getSignedURL, createPlant } from "./actions";
import dayjs from "dayjs";
import { useRouter } from 'next/navigation'

export declare type PlantForm = {
    nickname: String,
    plantType: String,
    description: String,
    wateringFrequency: Number,
    lastWatered: Date | null,
    fertilizerFrequency: Number,
    lastFertilizer: Date | null,
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



const AddPlant: NextPage = () => {

    const router = useRouter()
    const [file, setFile] = useState<File | undefined>(undefined);
    const [fileURL, setFileURL] = useState<string | undefined>(undefined);

    const [statusMessage, setStatusMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [bestMatchPlantType,setBestMatchPlantType] = useState<string | undefined>("");

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
    const handlePlantRecognition = async (e)=>{
        const myPlantNetToken = process.env.NEXT_PUBLIC_MY_PLANT_NET_API_TOKEN || "";
        const url = (process.env.NEXT_PUBLIC_MY_PLANT_NET_API_BASE_URL || "") 
            + (process.env.NEXT_PUBLIC_MY_PLANT_NET_API_IDENTIFY || "")
            + "?api-key=" +myPlantNetToken;
        console.log({url,myPlantNetToken})
        const formData = new FormData();
        // formData.append("include-related-images","false")
        // formData.append("no-reject","false")
        // formData.append("lang","es")
        // formData.append("type","kt")
        // formData.append("api-key",myPlantNetToken)
        formData.append("images",file)
         
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        }).then(response=>response.json())
        .then(data=>{ console.log(data);
            if(data?.bestMatch)
                setBestMatchPlantType(data?.bestMatch)
            formik.setFieldValue('plantType',data?.bestMatch);
         })
        // const json = await response.json()
        // const data = response?.body
        // console.log({response,data,json: json?.data})
    }
    useEffect(() => {
      
        console.log(file)

        //setPlant
    }, [file])


    
    const computeSHA256 = async (file: File) => {
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        return hashHex;
    };

    

    const formik = useFormik<PlantForm>({
        initialValues: {
            nickname: "",
            plantType: "",
            description: "",
            wateringFrequency: 1,
            lastWatered: null,
            fertilizerFrequency: 1,
            lastFertilizer:null,
        },
        onSubmit: async (values ,actions) =>{
            
            setStatusMessage("Creating Plant");
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
                    
                    let newPlant: any =  {...values, 
                        dismissedWatering: false,
                        dismissedFertilizer:false,
                        imageUrl: url.split("?")[0]
                    }
                    


                    if(newPlant.lastWatered){
                        newPlant = {...newPlant, 
                            nextWatering: dayjs(newPlant.lastWatered).add( Number(newPlant.wateringFrequency))
                        }
                    }
                       
                    if(newPlant.lastFertilizer){

                        newPlant =  {...newPlant, 
                            nextFertilizer: dayjs(newPlant.lastFertilizer).add(Number(newPlant.fertilizerFrequency))
                        }
                    }
                    
                    newPlant =  {...newPlant, 
                            lastWatered: dayjs(newPlant.lastWatered).toString(),
                            lastFertilizer: dayjs(newPlant.lastFertilizer).toString(),
                            nextWatering: newPlant.nextWatering.toString(),
                            nextFertilizer: newPlant.nextFertilizer.toString()
                    }
                    
                    const plantCreated = await createPlant(newPlant)
                    console.log(plantCreated)
                    router.push(`/my-plants`)
                }
            } catch (error) {
                console.log({error})
                setStatusMessage("Something went wrong");
                setLoading(false)
                return
            }
            
           
            setStatusMessage("Plant Created");
            setLoading(false)
        },
        validationSchema: yup.object({
            nickname: yup.string().required("Field is required"),
            plantType: yup.string().required("Field is required"),
            description: yup.string().required("Field is required"),
            wateringFrequency: yup.number().required("Field is required"),
            fertilizerFrequency: yup.number().required("Field is required"),
            lastFertilizer: yup.date().nullable().required('Last Fertilizer is required').typeError('Invalid Format'),
            lastWatered: yup.date().nullable().required('Last Watered is required').typeError('Invalid Format')
        })

    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
            <Container maxWidth="lg" >
                <Grid container spacing={2} my={4}>
                    <Grid item xs={12}>
                        <Typography variant="h3" component="h3">
                            Create a Plant
                        </Typography>
                        {loading && <Alert severity="warning">{statusMessage}</Alert>}
                    </Grid>
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
                                Upload a photo
                                <VisuallyHiddenInput 
                                    type="file" 
                                    accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
                                    onChange={handleFileChange}
                                    />
                            
                            </Button>

                            {
                                file && (
                                <Button sx={{ml:3}} variant="contained" onClick={handlePlantRecognition}>
                                    Identify Plant
                                </Button>)
                            }
                        </Box>
                            {
                                bestMatchPlantType != "" && ( <Box>
                                    <p style={{color: "green"}}>🌾🌺 We tried to identify the plant type using <strong>AI</strong>, the best match is 🪴 <strong>{bestMatchPlantType} 🪴 </strong></p>
                                </Box>)
                            }
                           
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
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h3">
                                Water
                            </Typography>
                            <Typography component="p">
                                    Add a number to define the frequency. e.g. 1 (Everyday), 30 (Monthly)
                            </Typography>
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
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                label="Last Watered" 
                                name="lastWatered"
                                slotProps={{ textField: { 
                                    fullWidth: true, 
                                    variant:"filled", 
                                    error: formik.touched.lastWatered && Boolean(formik.errors.lastWatered),
                                    helperText: formik.touched.lastWatered && formik.errors.lastWatered
                                } }}
                                value={formik.values.lastWatered}
                                onChange={(value) => formik.setFieldValue("lastWatered", value,true)}             
                                renderInput={(params) => (
                                    <TextField
                                        label="Last Watered" 
                                        name="lastWatered"
                                        value={formik.values.lastWatered}
                                        {...params}

                                     />
                                     )}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h3">
                                Fertilizer
                            </Typography>
                            <Typography component="p">
                                    Add a number to define the frequency. e.g. 1 (Everyday), 30 (Monthly)
                            </Typography>
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
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                label="Last Fertitlizer" 
                                name="lastFertilizer"
                                slotProps={{ textField: { 
                                    fullWidth: true, 
                                    variant:"filled", 
                                    error: formik.touched.lastFertilizer && Boolean(formik.errors.lastFertilizer),
                                    helperText: formik.touched.lastFertilizer && formik.errors.lastFertilizer
                                } }}
                                value={formik.values.lastFertilizer}
                                onChange={(value) => formik.setFieldValue("lastFertilizer", value,true)}             
                                renderInput={(params) => (
                                    <TextField
                                        label="Last Watered" 
                                        name="lastFertilizer"
                                        value={formik.values.lastFertilizer}
                                        {...params}

                                     />
                                     )}
                                
                                
                                />
                            </LocalizationProvider>

                        </Grid>
                        
                        <Grid item xs={12} lg={12}>
                        <Button 
                            color="primary" 
                            variant="contained" 
                            fullWidth 
                            type="submit">
                            Submit
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