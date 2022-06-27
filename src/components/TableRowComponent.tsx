import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


type Props = {
    index:number
    defaultTime: string
}

const TableRowComponent:React.FC<Props> = ({index, defaultTime}) => {

    const [minutes, setMinutes] = useState<number>(0);
    
    function getMinutes(): void {
      let starttime = document.getElementById("starttime-" + index.toString()) as HTMLInputElement;
      let endtime = document.getElementById("endtime-" + index.toString()) as HTMLInputElement;

      // 所要時間（分）を計算するために一回Date型に変換する
      let start = new Date("1970-1-1 " + starttime.value).getTime()
      let end = new Date("1970-1-1 " + endtime.value).getTime()
      let diff = (end - start) / 1000 / 60
      setMinutes(diff)
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <TextField id={"title-" + index} label="やったこと" variant="outlined" />
          <TextField
            id={"starttime-" + index}
            type="time"
            defaultValue={defaultTime ?? "09:30"}
            onChange={() => getMinutes()}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
          <TextField
            id={"endtime-" + index}
            type="time"
            defaultValue={defaultTime ?? "09:30"}
            onChange={() => getMinutes()}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
          <TextField
            id={"minutes-" + index}
            value={minutes}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
        </Box>
    )
}

export default TableRowComponent
