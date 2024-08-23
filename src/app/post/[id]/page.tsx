"use client";

import { getKoreanCurrency } from "@/lib/koreanCurrencyConverter";
import { fetchPostOwner, supabaseClient } from "@/lib/supabaseClient";
import { useAuth } from "@/providers/AuthContext";
import { Image } from "@chakra-ui/next-js";
import { Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { NextPage } from "next";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Post: NextPage = () => {
  const [coin, setCoin] = useState<Coin>();
  const [createdAt, setCreatedAt] = useState<Date>();
  const [post, setPost] = useState<Post>();
  const [nickname, setNickname] = useState<string>("");
  const [text, setText] = useState<string>("");

  const { id } = useParams();
  const router = useRouter();

  const { session } = useAuth();

  const onClickCreateComment = async () => {
    if (!text || !session) return;

    const { data, error } = await supabaseClient
      .from("comments")
      .insert({ text, post_id: id, user_id: session.user.id });

    if (error) {
      console.error("Error creating comment: ", error);
    } else {
      console.log("data", data);

      setText("");
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabaseClient
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching posts: ", error);

        router.push("/posts");
      } else {
        setPost(data);
      }
    };
    const fetchComments = async () => {
      const { data, error } = await supabaseClient
        .from("comments")
        .select("*")
        .eq("post_id", id)
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching posts: ", error);

        router.push("/posts");
      } else {
        console.log(data);
      }
    };

    fetchPost();
    fetchComments();
  }, []);

  useEffect(() => {
    if (!post) return;

    fetchPostOwner(post, setNickname);
    setCoin(JSON.parse(post.coin));
    setCreatedAt(new Date(post.created_at));
  }, [post]);

  if (!post) return <Flex>Post {id}</Flex>;

  return (
    <Flex flexDir="column" mt={8} mx="auto" w="600px" gap={2}>
      <Flex alignItems="center" gap={2}>
        {coin && (
          <Image
            rounded="full"
            src={coin.image}
            alt={coin.name}
            width={8}
            height={8}
          />
        )}
        {coin && createdAt && (
          <Flex mt={2} gap={1}>
            <Text>
              {createdAt.getFullYear() % 100}년 {createdAt.getMonth() + 1}월{" "}
              {createdAt.getDate()}일 {createdAt.getHours()}시,
            </Text>
            <Text>{getKoreanCurrency(coin.current_price)}원</Text>
            <Text
              color={coin.price_change_percentage_24h >= 0 ? "red" : "blue"}
            >
              {coin.price_change_percentage_24h > 0 ? "+" : ""}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </Text>
          </Flex>
        )}
      </Flex>
      <Flex>{nickname}</Flex>
      <Flex fontWeight="semibold">➡️ {post.text}</Flex>
      <Textarea
        mt={4}
        h={40}
        resize="none"
        isDisabled={!session}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button w="fit-content" alignSelf="end" onClick={onClickCreateComment}>
        댓글작성
      </Button>
    </Flex>
  );
};

export default Post;
