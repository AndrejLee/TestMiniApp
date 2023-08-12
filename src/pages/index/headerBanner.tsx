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
      <Box className="" m={2}>
        <Text size="xLarge" className="text-black" bold>
          Chào {currentUser?.name ?? "Lộc"},
        </Text>
      </Box>
      <Box className="">
        <img
          className="w-10 h-10 rounded-full"
          src={
            currentUser?.avatarUrl ?? "https://img.icons8.com/ios/50/cloud.png"
          }
        />
      </Box>
    </Box>
  );
};
