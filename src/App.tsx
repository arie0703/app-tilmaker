import React, { useState, useEffect } from 'react';
import getUniqueStr from './functions/getUniqueStr';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TableRowComponent from './components/TableRowComponent';
import CodeComponent from './components/CodeComponent';
import TableRow from './types/TableRow';



const App:React.FC = () => {

  const [arrTableRows, setArrTableRow] = useState<TableRow[]>([{uniqueId: getUniqueStr(), title: "", startTime: "09:30", endTime: "09:30"}]);
  const [code, setCode] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  // 時間テーブルのinputのデフォルト値として使用する
  const [startTime, setStartTime] = useState<string>("09:30");

  function addRow(index: number): void {

    let backRow = arrTableRows[index]
    console.log(backRow)
    let lastTime = document.getElementById("endtime-" + backRow.uniqueId) as HTMLInputElement;
    setStartTime(lastTime.value)

    const rows = [...arrTableRows];
    rows.splice(index+1, 0, {uniqueId: getUniqueStr(), title: "", startTime: lastTime.value, endTime: lastTime.value})
    setArrTableRow(rows);
  }

  function updateRow(index: number, changedData: TableRow): void {
    arrTableRows[index] = changedData
  }

  function removeRow(index: number): void {
    if (arrTableRows.length > 1) setArrTableRow(arrTableRows.filter((_, i) => i !== index))
  }

  function outputCode(): void {
    var output = "|No|タスク|開始~終了|所要時間(分)|\n|--|--|--|--|\n"
    arrTableRows.map((data: TableRow, index: number) => {
      let title = document.getElementById("title-" + data.uniqueId) as HTMLInputElement;
      let starttime = document.getElementById("starttime-" + data.uniqueId) as HTMLInputElement;
      let endtime = document.getElementById("endtime-" + data.uniqueId) as HTMLInputElement;
      let minutes = document.getElementById("minutes-" + data.uniqueId) as HTMLInputElement;
      output += `|${index + 1}|${title.value}|${starttime.value} - ${endtime.value}|${minutes.value}| \n`
    })

    // markdownをコピーする
    navigator.clipboard.writeText(output)
    .then(() => {
      setMessage("コピーしました")
    }, function(err) {
      setMessage("コピーに失敗しました")
    });

    setCode(output)
  }


  return (
    <div className="App">
      <div className="App-header">
        <p>ちるちる（β）</p>
      </div>
      <Box className="App-content">
        {arrTableRows.map((data: TableRow, index: number) => {
          return <TableRowComponent data={data} taskNumber={index+1} defaultTime={startTime} addRow={addRow} removeRow={removeRow} updateRow={updateRow} key={index}></TableRowComponent>
        })}
        <CodeComponent code={code}></CodeComponent>
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <Button onClick={() => outputCode()}>Code</Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <p>{message}</p>
        </Box>
      </Box>
    </div>
  );
}

export default App;
