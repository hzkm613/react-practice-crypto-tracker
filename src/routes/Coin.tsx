
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

interface ITag
{
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

interface CoinInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  description: string;
  first_data_at: string;
  last_data_at: string;
  hardware_wallet: boolean;
  hash_algorithm: string;
  is_active: boolean;
  message: string;
  logo: string;
  open_source: boolean;
  org_structure: string;
  platform: string;
  proof_type: string;
  started_at: string;
  tags: ITag[];
  type: string;
}

interface PriceInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      market_cap: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      ath_price: number;  
      ath_date: string;   
      market_cap_change_24h: number; 
      volume_24h_change_24h: number; 
      percent_from_price_ath: number;
    };
  };
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
  const [info, setInfo] = useState<CoinInfo>();
  const [priceInfo, setPriceInfo] = useState<PriceInfo>();

  useEffect(()=> {
    (async()=> {
      const coinInfo = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
        ).json();
        const priceInfo = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
        setInfo(coinInfo);
        setPriceInfo(priceInfo);
        //console.log(coinInfo);
        console.log(priceInfo);
        setLoading(false);
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
