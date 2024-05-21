import { CardContent } from '@mui/material';
import Card from '@mui/material/Card';
import * as React from 'react';


const BasicCard = ({ header, content }) => {
  return (
    <Card>
      {header}
      <CardContent>
        {content}
      </CardContent>
    </Card>
  )
}

export default BasicCard