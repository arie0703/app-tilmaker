import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


type Props = {
    index:number
}

const TableRowComponent:React.FC<Props> = ({index}) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <TextField id={"title-" + index} label="やったこと" variant="outlined" />
          <TextField
            id={"starttime-" + index}
            type="time"
            defaultValue="09:30"
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
            defaultValue="10:00"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
        </Box>
    )
}

export default TableRowComponent