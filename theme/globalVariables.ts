import { styled } from '@mui/material/styles';

// Brand colors
const colors = {
    primary: "#163020",
    secondary: "#304D30",
    error: "#8F1D1D",
    errorSecondary: "#FDEFE6",
    info: "#435A76",
    warning: "#B19470"
  };
  
  export { colors };

//Constants for NewPublish/HashTags button
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: '', year: 1994 },
  { title: 'Garden', year: 1972 },
  { title: 'Awesome!', year: 1974 },
  { title: 'Lovely', year: 2008 },
  { title: 'MyFirstPlant', year: 1957 },
  { title: "Nature", year: 1993 },
  { title: 'Suculenta', year: 1994 },
  {
    title: 'Cactus',
    year: 2003,
  },
  { title: 'GradenDesign', year: 1966 },
  { title: 'Photography', year: 1999 },
  {
    title: 'PlantLover',
    year: 2001,
  },
  {
    title: 'Limon',
    year: 1980,
  },
  { title: 'Orchid', year: 1994 },
  { title: 'Home', year: 2010 },
  {
    title: 'Plant',
    year: 2002,
  },
];

 export { top100Films };


 {/*const VisuallyHiddenInput = styled('input')({
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

export { VisuallyHiddenInput };*/}