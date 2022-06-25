import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';


type Props = {
    code: string
}

const CodeComponent:React.FC<Props> = ({code}) => {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <code>
            {code}
            </code>
        </Box>
    )
}

export default CodeComponent