import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

interface IHistory {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistory[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),
{ refetchInterval: 10000});


return (
  <div>
    {isLoading ? (
      "Loading chart..."
    ) : data && Array.isArray(data) ? (
      <ApexChart
        type="line"
        series={[
          {
            name: "Price",
            data: data.map((price) => price.close),
          },
        ]}
        options={{
          theme: {
            mode: isDark ? "dark" : "light",
          },
          chart: {
            height: 300,
            width: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          grid: { show: false },
          stroke: {
            curve: "smooth",
            width: 4,
          },
          yaxis: {
            show: false,
          },
          xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: { show: false },
          },
        }}
      />
    ) : (
      <div><p>Error loading data (Need to subscribe the API to get data for chart)</p></div>
    )}
  </div>
);
}

export default Chart;