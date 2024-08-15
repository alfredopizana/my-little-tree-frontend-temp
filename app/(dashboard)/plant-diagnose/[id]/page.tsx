'use client'
import { Alert, Box, Button, Card, CardMedia, Container, Grid, Paper, Skeleton, styled, TextField, Typography } from "@mui/material";
import { ErrorMessage, useFormik } from "formik";
import * as yup from 'yup';
import type { NextPage } from 'next';
import { auth } from "@clerk/nextjs";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as tf from '@tensorflow/tfjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getSignedURL, createPlant } from "./actions";
import dayjs from "dayjs";
import class_indeces  from './class_indeces.json'
import cures from './cures.json'
import curesES from './cures.es.json'
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


const PlantDiagnosePage = ({params}: {params: {id: string}}) => {

    const router = useRouter()
    const [file, setFile] = useState<File | undefined>(undefined);
    const [fileURL, setFileURL] = useState<string | undefined>(undefined);

    const [statusMessage, setStatusMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [bestMatchPlantType,setBestMatchPlantType] = useState<string | undefined>("");
    const[tfliteModel, setTfliteModel] = useState(undefined);
    const [diagnoseEN, setDiagnoseEN] = useState("");
    const [diagnoseES, setDiagnoseES] = useState("");
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setBestMatchPlantType("")
        setDiagnoseEN("")
        setDiagnoseES("")
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

    }

    const handleDiagnosePlant = () => {

        if(file && tfliteModel){

            // Prepare input tensors.
            // @ts-ignore
            var imgData = new Image();

            // @ts-ignore
            imgData.src = fileURL;


            const tensor = tf.browser
            .fromPixels(imgData)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();



            // Run inference and get output tensors.
            // @ts-ignore   
            let outputTensor = tfliteModel.predict(tensor) as tf.Tensor;
            let bestMatch = outputTensor.dataSync();
            console.log({outputTensor})
            console.log(outputTensor.dataSync());

            let i = bestMatch.indexOf(Math.max(...bestMatch));
            console.log(class_indeces)
            console.log(class_indeces[i])
            
            setDiagnoseEN(cures[i])
            setDiagnoseES(curesES[i])
        }



    }
    useEffect(() => {
      
        console.log(file)

        //setPlant
    }, [file])

    useEffect(() => {
        tf.loadLayersModel('https://my-little-tree-dev-bucket.s3.us-east-2.amazonaws.com/model/model.json')
        .then((model)=>{
            console.log(model)
            setTfliteModel(model);
        }).catch(e =>{
            console.log(e)
        })
    }, [])
    
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



    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
            <Container maxWidth="lg" >
                <Grid container spacing={2} my={4}>
                    <Grid item xs={12}>
                        <Typography variant="h3" component="h3">
                        Diagnose Plant
                        </Typography>
                        <Typography variant="h4" component="h4">
                        🅱️ Beta Version
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
                                file && (<>
                                
                                <Button sx={{ml:3}} variant="contained" onClick={handleDiagnosePlant}>
                                    Diagnose Plant
                                </Button> 

                                <Button sx={{ml:3}} variant="contained" onClick={handlePlantRecognition}>
                                    Identify Plant
                                </Button>
                                </>   
                            )
                            }
                            {
                                diagnoseEN && (<>
                                    <p style={{ whiteSpace: "pre-wrap" }}>
                                        {diagnoseEN}
                                    </p>
                                
                                </>)
                            }
                            {
                                diagnoseES && (<>
                                    <hr></hr>
                                    <p>Traduccion al español. Desarrollo en progreso.</p>
                                    <p style={{ whiteSpace: "pre-wrap" }}>
                                        {diagnoseES}
                                    </p>
                                
                                </>)
                            }
                        </Box>
                            {
                                bestMatchPlantType != "" && ( <Box>
                                    <hr></hr>
                                    <p style={{color: "green"}}>🌾🌺 We tried to identify the plant type using <strong>AI</strong>, the best match is 🪴 <strong>{bestMatchPlantType} 🪴 </strong></p>
                                </Box>)
                            }
                           
                    </Grid>
                    <Grid container item xs={12} lg={6} spacing={2}>
                        <Grid item xs={12}>
                        <p>The current module is in the alpha phase and, for now, covers only 38 categories of plants. This means the system is still under development and subject to changes and improvements. Below are the categories of plants that are currently supported by this module:</p>
                        <ul>
                            <li>Apple 🍎</li>
                            <li>Blueberry 🫐</li>
                            <li>Cherry (including sour) 🍒</li>
                            <li>Corn (maize) 🌽</li>
                            <li>Grape 🍇</li>
                            <li>Orange 🍊</li>
                            <li>Peach 🍑</li>
                            <li>Pepper, bell 🫑</li>
                            <li>Potato 🥔</li>
                            <li>Raspberry 🍇</li>
                            <li>Soybean 🌱</li>
                            <li>Squash 🎃</li>
                            <li>Strawberry 🍓</li>
                            <li>Tomato 🍅</li>
                        </ul>
                        <p>Currently, we only cover the detection of diseases through the leaves of these plants.</p>
                        </Grid>
                        
                    </Grid>
                
                </Grid>
            </Container>
            
            
            
            </form>
        </div>
    );
  
}

export default PlantDiagnosePage;