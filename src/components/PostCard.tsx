import { getKoreanCurrency } from "@/lib/koreanCurrencyConverter";
import { fetchPostOwner } from "@/lib/supabaseClient";
import { Image } from "@chakra-ui/next-js";
import { Flex, Text } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const coin: Coin = JSON.parse(post.coin);
  const createdAt = new Date(post.created_at);

  const [nickname, setNickname] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    fetchPostOwner(post, setNickname);
  }, []);

  return (
    <Flex
      flexDir="column"
      bgColor="gray.100"
      p={2}
      w="600px"
      rounded="md"
      gap={2}
      onClick={() => router.push(`/post/${post.id}`)}
      cursor="pointer"
    >
      <Flex alignItems="center" gap={2}>
        <Image
          rounded="full"
          src={coin.image}
          alt={coin.name}
          width={8}
          height={8}
        />
        <Flex mt={2} gap={1}>
          <Text>
            {createdAt.getFullYear() % 100}년 {createdAt.getMonth() + 1}월{" "}
            {createdAt.getDate()}일 {createdAt.getHours()}시,
          </Text>
          <Text>{getKoreanCurrency(coin.current_price)}원</Text>
          <Text color={coin.price_change_percentage_24h >= 0 ? "red" : "blue"}>
            {coin.price_change_percentage_24h > 0 ? "+" : ""}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </Text>
        </Flex>
      </Flex>
      <Flex>{nickname}</Flex>
      <Flex fontWeight="semibold">➡️ {post.text}</Flex>
    </Flex>
  );
};

export default PostCard;
