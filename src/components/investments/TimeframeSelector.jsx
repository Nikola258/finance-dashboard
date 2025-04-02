import React from 'react';
import { ButtonGroup, Button } from '@mui/material';

const TimeframeSelector = ({ timeframe, setTimeframe }) => {
  const timeframes = ['1W', '1M', '3M', '1Y', 'ALL'];

  return (
    <ButtonGroup variant="outlined" size="small">
      {timeframes.map((tf) => (
        <Button
          key={tf}
          onClick={() => setTimeframe(tf)}
          variant={timeframe === tf ? 'contained' : 'outlined'}
        >
          {tf}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default TimeframeSelector; 