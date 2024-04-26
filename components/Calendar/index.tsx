"use client"

import styled from "@emotion/styled/macro";
import { Badge } from "@mui/material";
import { DateCalendar, LocalizationProvider, PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";
import { useState } from "react";
type Props = {
    days: Array<string>
}

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: string[] }) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

        const isSelected = highlightedDays.includes(day.format("YYYY-MM-DD"))

    return (
        <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? '💧' : undefined}
        >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    );
}
export const Calendar = ({days,}:Props) =>{
    
      const [highlightedDays, setHighlitedDays] = useState(days);
    

    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateCalendar']} sx={{alignItems: "left"}}>
            <DateCalendar 
            slots={{
                day: ServerDay,
              }}
            slotProps={{
              day: {
                highlightedDays,
              },
            }} 
            />
        </DemoContainer>
    </LocalizationProvider>
}