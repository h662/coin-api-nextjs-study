interface Profile {
  id: number;
  created_at: string;
  nickname: string;
  user_id: string;
}

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  total_supply: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
}

interface Post {
  id: number;
  created_at: string;
  text: string;
  coin: string;
  user_id: string;
}
