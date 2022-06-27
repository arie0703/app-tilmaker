import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TableRowComponent from './components/TableRowComponent';
import CodeComponent from './components/CodeComponent';




const App:React.FC = () => {
  const [arrTableRows, setArrTableRow] = useState<number[]>([1]);
  const [code, setCode] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  // 時間テーブルのinputのデフォルト値として使用する
  const [startTime, setStartTime] = useState<string>("09:30");

  function addRow(): void {
    let lastTime = document.getElementById("endtime-" + arrTableRows.length) as HTMLInputElement;
    setStartTime(lastTime.value)
    setArrTableRow([...arrTableRows, arrTableRows.length + 1])
  }

  function removeRow(): void {
    if (arrTableRows.length > 1) setArrTableRow(arrTableRows.filter((_, i) => i !== arrTableRows.length - 1))
  }

  function outputCode(): void {
    var output = "|No|タスク|開始~終了|所要時間(分)|\n|--|--|--|--|\n"
    arrTableRows.map((i: number) => {
      let title = document.getElementById("title-" + i.toString()) as HTMLInputElement;
      let starttime = document.getElementById("starttime-" + i.toString()) as HTMLInputElement;
      let endtime = document.getElementById("endtime-" + i.toString()) as HTMLInputElement;
      let minutes = document.getElementById("minutes-" + i.toString()) as HTMLInputElement;
      output += `|${i}|${title.value}|${starttime.value} - ${endtime.value}|${minutes.value}| \n`
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
        {arrTableRows.map((index: number) => {
          return <TableRowComponent index={index} defaultTime={startTime}></TableRowComponent>
        })}
        <CodeComponent code={code}></CodeComponent>
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <Button onClick={() => addRow()}>Add</Button>
          <Button onClick={() => removeRow()}>Remove</Button>
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
