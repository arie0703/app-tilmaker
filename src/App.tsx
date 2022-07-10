import React, { useState, useEffect } from 'react';
import getUniqueStr from './functions/getUniqueStr';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TemplateListComponent from './components/TemplateListComponent';
import TableRowComponent from './components/TableRowComponent';
import TextField from '@mui/material/TextField';
import CodeComponent from './components/CodeComponent';
import TableRow from './types/TableRow';
import Elephant from './assets/elephant.png'
import Template from './types/Template';
import {getLocalData, setLocalData, addTemplate, getTemplates} from '././functions/localStorage';



const App:React.FC = () => {

  const [arrTableRows, setArrTableRow] = useState<TableRow[]>([{uniqueId: getUniqueStr(), title: "", startTime: "09:30", endTime: "09:30"}]);
  const [code, setCode] = useState<string>("Codeボタンを押すと、マークダウンが出力されるよ！");
  const [message, setMessage] = useState<string>("");
  // 時間テーブルのinputのデフォルト値として使用する
  const [startTime, setStartTime] = useState<string>("09:30");
  const [templateList, setTemplateList] = useState<Template[]>(getTemplates())
  const [templateTitle, setTemplateTitle] = useState<string>("");

  useEffect(() => {
    const data = getLocalData();
    if (data) {
      setArrTableRow(data)
    }
  },[]);

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
    setLocalData(arrTableRows);
  }

  function removeRow(index: number): void {
    if (arrTableRows.length > 1) setArrTableRow(arrTableRows.filter((_, i) => i !== index))
  }

  function _addTemplate() {
    addTemplate({title: templateTitle, data: arrTableRows})
    setTemplateList(getTemplates())
    setMessage("テンプレートを追加したゾウ")
  }

  function clearTable() {
    if (window.confirm("入力内容をリセットしますか？")) {
      setArrTableRow([{uniqueId: getUniqueStr(), title: "", startTime: "09:30", endTime: "09:30"}])
    }
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
      setMessage("コピーしたゾウ")
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
        <TemplateListComponent setArrTableRow={setArrTableRow} templateList={templateList} setTemplateList={setTemplateList}></TemplateListComponent>
        <Box sx={{ display: 'flex'}}>
          <TextField
            onChange={(e) => {
              setTemplateTitle(e.target.value)
            }}
            label="テンプレート名"
            value={templateTitle}
            variant="outlined"
          />
          <Button onClick={() => _addTemplate()}>Add</Button>
        </Box>
        <small>※キャッシュを消すとテンプレートも消えます</small>
        <Box sx={{margin: '20px 0'}}>
          {arrTableRows.map((data: TableRow, index: number) => {
            return <TableRowComponent data={data} taskNumber={index+1} defaultTime={startTime} addRow={addRow} removeRow={removeRow} updateRow={updateRow} key={index}></TableRowComponent>
          })}
        </Box>
        <CodeComponent code={code}></CodeComponent>
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <Button onClick={() => outputCode()}>Code</Button>
          <Button onClick={() => clearTable()}>Clear</Button>
        </Box>
        
        <Box sx={{ display: message ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center'}}>
          <img src={Elephant} style={{width: "150px"}}></img>
          <Box sx={{backgroundColor: "skyblue", padding: "10px 40px", borderRadius: "15px", marginLeft: "10px"}}>
            <p>{message}</p>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
