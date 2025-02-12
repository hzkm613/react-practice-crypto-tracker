
import { useEffect, useState } from 'react';
import { Switch, Route, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Chart from './Chart';
import Price from './Price';
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTickers } from '../api';

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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom:20px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
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

interface IInfoData {
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

interface IPriceData {
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
  const { state } = useLocation<RouteState>();
  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<CoinInfo>();
  // const [priceInfo, setPriceInfo] = useState<PriceInfo>();
  const {isLoading: infoLoading, data: infoData} = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(coinId));
  const {isLoading: tickerLoading, data: tickerData} = useQuery<IPriceData>(["tickers", coinId], () => fetchCoinTickers(coinId));
  
  const loading = infoLoading || tickerLoading;
  
  // Check if I am in the specific URL
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  // useEffect(()=> {
  //   (async()=> {
  //     const coinInfo = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //       ).json();
  //       const priceInfo = await(await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
  //       setInfo(coinInfo);
  //       setPriceInfo(priceInfo);
  //       // console.log(coinInfo);
  //       // console.log(priceInfo);
  //       setLoading(false);
  //     })();
  // }, [coinId]); // When the coinId changes it runs the code again


  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
      </Header>
      {loading ? (<Loader>Loading...</Loader>) : 
      (
        <>
         <Overview>
          <Description>{infoData?.description}</Description>
         </Overview>
        <Overview>
          <OverviewItem>
            <span>Rank: </span>
            <span>{infoData?.rank}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Symbol: </span>
            <span>{infoData?.symbol}</span>
          </OverviewItem>
          </Overview>
          <Overview>
          <OverviewItem>
            <span>Total Supply:</span>
            <span>{tickerData?.total_supply}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Max Supply: </span>
            <span>{tickerData?.max_supply}</span>
          </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
          <Route path={`/:coinId/price`}>
              <Price />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart />
            </Route>
          </Switch>
          </>
      )}
    </Container>
  )
}

export default Coin
