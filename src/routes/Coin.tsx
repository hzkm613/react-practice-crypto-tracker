
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 10vh;
  display: felx;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color:${props => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

const Coin = () => {

  // Check if coinId is correct
  const { coinId } = useParams<RouteParams>();
  // console.log(coinId);
  // const location = useLocation();
  // console.log(location);
  // #5.5
  const { state } = useLocation<RouteState>();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({});
  const [priceInto, setPriceInfo] = useState({});

  useEffect(()=> {
    (async()=> {
      const coinInfo = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
        ).json();
        const priceInfo = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
        setInfo(coinInfo);
        setPriceInfo(priceInfo);
      })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  )
}

export default Coin
