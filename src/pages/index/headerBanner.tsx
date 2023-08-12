import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "state";
import { Box, Text } from "zmp-ui";

export const HeaderBanner: FC = () => {
  const currentUser = useRecoilValue(currentUserState);

  return (
    <Box p={4} className="bg-white space-x- flex">
      <Box mr={10} p={5} mt={14} className="w-50">
        <Text size="xLarge" className="text-black">
          Chào {currentUser?.name},
        </Text>
      </Box>
      <Box ml={10} className="flex justify-items-end">
        <img className="w-28 h-28 rounded-full" src={currentUser?.avatarUrl} />
      </Box>
    </Box>
  );
};
