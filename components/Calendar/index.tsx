"use client"

import styled from "@emotion/styled/macro";
import { Badge } from "@mui/material";
import { DateCalendar, LocalizationProvider, PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";
import { useState } from "react";
type Props = {
    days: Array<string>,
    fDays:Array<string>
}

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: string[],fertilizerDays?: string[] }) {
    const { highlightedDays = [],fertilizerDays = [],day, outsideCurrentMonth, ...other } = props;
        let badge = undefined
        if (highlightedDays.includes(day.format("YYYY-MM-DD")))
          badge= '💧'
        if (fertilizerDays.includes(day.format("YYYY-MM-DD")))
          badge= '🌱'

    return (
        <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={badge}
        >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    );
}
export const Calendar = ({days=[],fDays=[]}:Props) =>{
    
      const [highlightedDays, setHighlitedDays] = useState(days);
      const [fertilizerDays, setFertilizerDays] = useState(fDays);

    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateCalendar']} sx={{alignItems: "left"}}>
            <DateCalendar 
            showDaysOutsideCurrentMonth
            slots={{
                day: ServerDay,
              }}
            slotProps={{
              day: {
                highlightedDays,
                fertilizerDays
              },
            }} 
            />
        </DemoContainer>
    </LocalizationProvider>
}