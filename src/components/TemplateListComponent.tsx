import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TableRow from '../types/TableRow';
import Template from '../types/Template';
import {getTemplates, removeTemplate} from '../functions/localStorage';

type Props = {
    setArrTableRow: (arrTableRow: TableRow[]) => void
    templateList: Template[]
    setTemplateList: (templateList: Template[]) => void
}

const TemplateListComponent:React.FC<Props> = ({setArrTableRow, templateList, setTemplateList}) => {


    function _removeTemplate(index: number) {
        if (window.confirm("テンプレートを削除しますか？")) {
            removeTemplate(index)
            setTemplateList(getTemplates())
        }
    }

    return (
        <Box sx={{display: "flex"}}>
        {templateList.map((template: Template, index: number) => {
            return (
                <Box sx={{display: "flex"}}>
                    <Button onClick={() => setArrTableRow(template.data!)}>
                        {template.title}
                    </Button>
                    <IconButton color="primary" onClick={() => _removeTemplate(index)} component="span">
                        <CloseIcon />
                    </IconButton>
                </Box>
            )
        })}
        </Box>
    )
}

export default TemplateListComponent
