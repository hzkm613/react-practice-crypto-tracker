import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import { Helmet } from "react-helmet";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  margin-bottom: 10px;
  border: 1px solid white;
  border-radius: 15px;
  a {
      transition: color 0.2s ease-in;
      display:flex;
      align-items: center;
      justify-content: start;
  }
    &:hover {
      a {
          color: ${(props) => props.theme.accentColor};
      }
    }
`;

const Title = styled.h1`
  font-size: 48px;
  color:${props => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const CoinIcon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 14px;
`;

// Fake data
// const coins = [{
//   id: "btc-bitcoin",
//   name: "Bitcoin",
//   symbol: "BTC",
//   rank: 1,
//   is_new: false,
//   is_active: true,
//   type: "coin",
//   },
//   {
//   id: "eth-ethereum",
//   name: "Ethereum",
//   symbol: "ETH",
//   rank: 2,
//   is_new: false,
//   is_active: true,
//   type: "coin",
//   },
//   {
//   id: "hex-hex",
//   name: "HEX",
//   symbol: "HEX",
//   rank: 3,
//   is_new: false,
//   is_active: true,
//   type: "token",
//   },]

  interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
  }

  interface ICoinsProps {
    toggleDark: () => void;
  }

const Coins = ({toggleDark}: ICoinsProps) => {
  const { isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
  // const [ coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async() => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 20));
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Container>
       <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <button onClick={toggleDark}>Toggle Mode</button>
      </Header>
      {isLoading ? (<Loader>Loading...</Loader>
    ) : (
    <CoinsList>
       {data?.slice(0, 100).map((coin) =>
          (<Coin key={coin.id}>
            <Link to={{
            pathname: `/${coin.id}`,
            state: {name: coin.name}}}>
              <CoinIcon src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} alt={coin.name} />
              {coin.name} &rarr;
            </Link>
          </Coin>))}
      </CoinsList>) }   
    </Container>
  )
}

export default Coins
