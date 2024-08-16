"use client";

import { useAuth } from "@/providers/AuthContext";
import { Link } from "@chakra-ui/next-js";
import { Avatar, Flex } from "@chakra-ui/react";
import { FC } from "react";
import { usePathname } from "next/navigation";

const Header: FC = () => {
  const { session, profile } = useAuth();

  const pathname = usePathname();

  if (pathname === "/sign-in") return <></>;

  return (
    <Flex justifyContent="space-between" p={4}>
      <Flex>Coin API</Flex>
      <Flex>
        {session ? (
          <Flex>
            {profile ? (
              <Flex alignItems="center" gap={1}>
                <Avatar size="sm" name={profile.nickname} />
                {profile.nickname}
              </Flex>
            ) : (
              session.user.email
            )}
          </Flex>
        ) : (
          <Link href="/sign-in">로그인</Link>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
