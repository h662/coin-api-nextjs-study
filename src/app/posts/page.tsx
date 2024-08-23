"use client";

import PostCard from "@/components/PostCard";
import { supabaseClient } from "@/lib/supabaseClient";
import { Button, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Posts: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 5;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMore, setIsMore] = useState<boolean>(true);

  const fetchPosts = async () => {
    setIsLoading(true);

    const { data, error } = await supabaseClient
      .from("posts")
      .select("*")
      .order("id", { ascending: false })
      .range(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage - 1
      );

    if (error) {
      console.error("Error fetching posts: ", error);
    } else {
      setPosts([...posts, ...data]);
      setCurrentPage(currentPage + 1);

      if (data.length !== itemsPerPage) setIsMore(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Flex flexDir="column" gap={4} alignItems="center" py={8}>
      {posts.map((v) => (
        <PostCard key={v.id} post={v} />
      ))}
      {isMore && (
        <Button
          onClick={() => fetchPosts()}
          isLoading={isLoading}
          isDisabled={isLoading}
          loadingText="로딩중"
        >
          더보기
        </Button>
      )}
    </Flex>
  );
};

export default Posts;
