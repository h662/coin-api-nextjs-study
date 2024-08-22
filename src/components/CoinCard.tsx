import { Image } from "@chakra-ui/next-js";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import CoinCardModal from "./CoinCardModal";
import { getKoreanCurrency } from "@/lib/koreanCurrencyConverter";

interface CoinCardProps {
  coin: Coin;
}

const CoinCard: FC<CoinCardProps> = ({ coin }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        bgColor="gray.50"
        p={2}
        rounded="md"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        onClick={() => onOpen()}
        cursor="pointer"
      >
        <Text w={8}>{coin.market_cap_rank}</Text>
        <Image src={coin.image} alt={coin.name} width={8} height={8} />
        <Text w={80}>{coin.name}</Text>
        <Text w={32}>{getKoreanCurrency(coin.current_price)}원</Text>
        <Text
          w={20}
          color={coin.price_change_percentage_24h >= 0 ? "red" : "blue"}
        >
          {coin.price_change_percentage_24h > 0 ? "+" : ""}
          {coin.price_change_percentage_24h.toFixed(2)}%
        </Text>
      </Flex>
      <CoinCardModal isOpen={isOpen} onClose={onClose} coin={coin} />
    </>
  );
};

export default CoinCard;
