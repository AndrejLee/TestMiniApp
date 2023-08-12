import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "state";
import { Box, Text } from "zmp-ui";

export const HeaderBanner: FC = () => {
  const currentUser = useRecoilValue(currentUserState);

  return (
    <Box
      className="bg-white space-x-1"
      justifyContent="flex-end"
      m={5}
      pr={5}
      flex
    >
      <Box className="" m={3}>
        <Text size="xLarge" className="text-black" bold>
          Chào {currentUser?.name ?? "Lộc Trần"},
        </Text>
      </Box>
      <Box className="">
        <img
          className="w-12 h-12 rounded-full"
          src={
            currentUser?.avatarUrl ?? "https://img.icons8.com/ios/50/cloud.png"
          }
        />
      </Box>
    </Box>
  );
};
