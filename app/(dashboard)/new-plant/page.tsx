
"use client"
import { Button, Container, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


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

const NewPlant = () => {
    return (
        <Container maxWidth="lg">
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                >
                Upload file
                <VisuallyHiddenInput type="file" />
            </Button>

        </Container>
    )
}



export default NewPlant;