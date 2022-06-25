import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FieldComponent from './components/FieldComponent';
import CodeComponent from './components/CodeComponent';




const App:React.FC = () => {
  const [arrFields, setArrFields] = useState([1]);
  const [code, setCode] = useState("");

  function addField() {
    setArrFields([...arrFields, arrFields.length + 1])
  }

  function outputCode() {
    var output = ""
    arrFields.map((i) => {
      let title = document.getElementById("title-" + i.toString()) as HTMLInputElement;
      let starttime = document.getElementById("starttime-" + i.toString()) as HTMLInputElement;
      let endtime = document.getElementById("endtime-" + i.toString()) as HTMLInputElement;
      output += `|${i}|${title.value}|${starttime.value} - ${endtime.value}|| \n`
    })
    setCode(output)
  }

  return (
    <div className="App">
      <div className="App-header">
        <p>ちるちる（β）</p>
      </div>
      <Box className="App-content">
        {arrFields.map((index) => {
          return <FieldComponent index={index}></FieldComponent>
        })}
        <CodeComponent code={code}></CodeComponent>
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
          <Button onClick={() => addField()}>Add</Button>
          <Button onClick={() => outputCode()}>Code</Button>
        </Box>
      </Box>
    </div>
  );
}

export default App;
