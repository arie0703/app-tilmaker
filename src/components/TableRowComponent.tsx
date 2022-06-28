import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TableRow from '../types/TableRow';

type Props = {
    data:TableRow
    taskNumber: number
    defaultTime: string
    addRow: (index: number) => void
    removeRow: (index: number) => void
    updateRow: (index: number, changedData: TableRow) => void
}

const TableRowComponent:React.FC<Props> = ({data, taskNumber, defaultTime, addRow, removeRow, updateRow}) => {

    const [minutes, setMinutes] = useState<number>(0);
    const [titleField, setTitleField] = useState<string>(data.title ?? "");
    const index = taskNumber - 1;
    const uniqueId = data.uniqueId
    
    function getMinutes(): void {
      let starttime = document.getElementById("starttime-" + uniqueId) as HTMLInputElement;
      let endtime = document.getElementById("endtime-" + uniqueId) as HTMLInputElement;

      // 所要時間（分）を計算するために一回Date型に変換する
      let start = new Date("1970-1-1 " + starttime.value).getTime()
      let end = new Date("1970-1-1 " + endtime.value).getTime()
      let diff = (end - start) / 1000 / 60
      setMinutes(diff)
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <TextField
            id={"title-" + uniqueId}
            onChange={(e) => {
              data.title = e.target.value
              updateRow(index, data);
              setTitleField(e.target.value)
            }}
            label="やったこと"
            value={data.title}
            variant="outlined"
          />
          <TextField
            id={"starttime-" + uniqueId}
            type="time"
            value={data.startTime}
            onChange={(e) => {
              getMinutes();
              data.startTime = e.target.value;
              updateRow(index, data);
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
          <TextField
            id={"endtime-" + uniqueId}
            type="time"
            value={data.endTime ?? "09:30"}
            onChange={(e) => {
              getMinutes();
              data.endTime = e.target.value;
              updateRow(index, data);
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
          <TextField
            id={"minutes-" + uniqueId}
            value={minutes}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />
          <IconButton color="primary" onClick={() => addRow(index)} component="span">
            <AddIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => removeRow(index)} component="span">
            <RemoveIcon />
          </IconButton>
        </Box>
    )
}

export default TableRowComponent
