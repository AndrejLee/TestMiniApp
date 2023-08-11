import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "state";
import { Box, Text } from "zmp-ui";

export const HeaderBanner: FC = () => {
  const currentUser = useRecoilValue(currentUserState);

  return (
    <Box p={4} className="bg-white">
      <Text size="xSmall" className="text-black">
        Chào {currentUser?.name}
      </Text>
      <image></image>
    </Box>
  );
};
