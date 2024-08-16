"use client";

import CoinCard from "@/components/CoinCard";
import { Button, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const visibleCoins = coins.slice(0, currentPage * itemsPerPage);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch("/api/coins");

        if (!res.ok) {
          throw new Error("Failed to fetch coins");
        }

        const data = await res.json();

        setCoins(data);
      } catch (error: any) {
        console.error(error);

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  useEffect(() => console.log(coins), [coins]);

  if (loading) return <Flex>Loading...</Flex>;
  if (error) return <Flex>Error: {error}</Flex>;

  return (
    <Flex bgColor="red.100" flexDir="column" alignItems="center" py={8} gap={2}>
      {visibleCoins.map((v, i) => (
        <CoinCard key={i} coin={v} />
      ))}
      {visibleCoins.length < coins.length && (
        <Button mt={4} onClick={() => setCurrentPage(currentPage + 1)}>
          더보기
        </Button>
      )}
    </Flex>
  );
};

export default Home;
