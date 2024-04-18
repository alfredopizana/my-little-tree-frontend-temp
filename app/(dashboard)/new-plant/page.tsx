import { Button, Container, Box, TextField, Stack, Card, CardMedia, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { FormEvent } from "react";


// const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
//   });

const NewPlant = () => {

    // async function onSubmit(event: FormEvent<HTMLFormElement>) {
    //     event.preventDefault()
     
    //     const formData = new FormData(event.currentTarget)
    //     console.log(formData)
    //     // const response = await fetch('/api/submit', {
    //     //   method: 'POST',
    //     //   body: formData,
    //     // })
     
    //     // // Handle response if necessary
    //     // const data = await response.json()
    //     // ...
    //   }
      async function createPlant(formData: FormData) {
        'use server'
     
        const rawFormData = {
          customerId: formData.get('nickname'),
          amount: formData.get('amount'),
          status: formData.get('status'),
        }
        console.log(rawFormData)
        // mutate data
        // revalidate cache
      }

      async function saveFile(file: File, documentHash: string) {
        const data = await file.arrayBuffer();
        await fs.appendFile(`./public/${documentHash}.pdf`, Buffer.from(data));
        
        return;
      }
    return (
        <form action={createPlant}>

        <Container maxWidth="lg">
            <Box
                sx={{ 
                    border: 'white',
                    fontWeight: 700,
                    position: 'absolute',
                    top: 300,
                    left: 575,
                }}
            >
                Water
            </Box>
            <Box
                sx={{ 
                    border: 'white',
                    fontWeight: 700,
                    position: 'absolute',
                    top: 300,
                    left: 950,
                }}
            >
                Fertilizer
            </Box>
            <Box
                sx={{ 
                    width: 300,
                    border: 'white',
                    position: 'absolute',
                    top: 325,
                    left: 950,
                }}
            >
                Add a number to define the frequency. e.g. 1(Everyday)
            </Box>
            <Box
                sx={{ 
                    width: 300,
                    border: 'white',
                    position: 'absolute',
                    top: 325,
                    left: 575,
                }}
            >
                Add a number to define the frequency. e.g. 1(Everyday)
            </Box>
            <Box
                sx={{ 
                    width: 300,
                    border: 'white',
                    position: 'absolute',
                    top: 475,
                    left: 575,
                }}
            >
                Enter the last time you did it.
            </Box>
            <Box
                sx={{ 
                    width: 300,
                    border: 'white',
                    position: 'absolute',
                    top: 475,
                    left: 950,
                }}
            >
                Enter the last time you did it.
            </Box>

            <Card 
                sx={{ 
                    height: 450,
                    width: 400,
                    p: 2,
                    borderRadius: 2,
                    position: 'absolute',
                    top: 125,
                    left: 100,
                    zIndex: 'tooltip',
                }}
            >
                <CardMedia
                    sx={{ height: 140 }}
                    image="/static/images/cards/contemplative-reptile.jpg"
                />
            </Card>
            {/* <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{
                    p: 2,
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    position: 'absolute',
                    top: 600,
                    left: '15%',
                    zIndex: 'tooltip',
                }}
            > 
                Upload file 
                <VisuallyHiddenInput type="file" />
            </Button> */}
            <Stack direction="row" spacing={2}>
                <Button variant="contained"
                    sx={{
                         p: 2,
                        borderRadius: 2,
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        position: 'absolute',
                        top: 650,
                        left: '80%',
                        zIndex: 'tooltip',
                    }}
                >
                    Cancel
                </Button>
            </Stack>
            
            <Box
                sx={{
                    
                    p: 2,
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    position: 'absolute',
                    top: 100,
                    left: 550,
                    zIndex: 'tooltip',
                }}
                >
                <TextField id="filled-basic" label="Nickname" name="nickname" variant="filled" />
                <input type="text" name="test" />
            </Box>
            <Box
                sx={{
                    p: 2,
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    position: 'absolute',
                    top: 100,
                    left: 800,
                    zIndex: 'tooltip',
                }}
                
                >
                <TextField id="filled-basic" label="Type of plant" variant="filled" />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: 115,
                    left: 1075,
                }}
            >
                <TextField
                    id="filled-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue="Enter info"
                    variant="filled"
                />
            </Box>
            <Box
                sx={{
                    p: 2,
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    position: 'absolute',
                    top: 175,
                    left: 550,
                    zIndex: 'tooltip',
                }}
                >
                <TextField id="filled-basic" label="Tags" variant="filled" />
            </Box>
            <Box
                sx={{
                    p: 2,
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    position: 'absolute',
                    top: 360,
                    left: 550,
                    zIndex: 'tooltip',
                }}
                >
                <TextField id="filled-basic" label="..." variant="filled" />
            </Box>
            <Box
                sx={{
                    p: 2,
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    position: 'absolute',
                    top: 360,
                    left: 925,
                    zIndex: 'tooltip',
                }}
                >
                <TextField id="filled-basic" label="..." variant="filled" />
            </Box>
            <Box
                sx={{
                    p: 2,
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    position: 'absolute',
                    top: 490,
                    left: 925,
                    zIndex: 'tooltip',
                }}
                >
                <TextField id="filled-basic" label="..." variant="filled" />
            </Box>
            <Box
                sx={{
                    p: 2,
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    position: 'absolute',
                    top: 490,
                    left: 550,
                    zIndex: 'tooltip',
                }}
                >
                <TextField id="filled-basic" label="..." variant="filled" />
            </Box>
            <Stack direction="row" spacing={2}>
                <Button variant="contained"
                    type="submit"
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        position: 'absolute',
                        top: 650,
                        left: '87%',
                        zIndex: 'tooltip',
                    }}
                >
                    Add Plant 
                </Button>
            </Stack>
        </Container>
        </form>
    )
}



export default NewPlant;