import React from 'react'
import { useParams } from 'react-router-dom';

interface RouteParams {
  coinId: string;
}

const Coin = () => {
  // Check if coinId is correct
  const { coinId } = useParams<RouteParams>();
  // console.log(coinId);

  return (
    <div>
      Coin: {coinId}
    </div>
  )
}

export default Coin
