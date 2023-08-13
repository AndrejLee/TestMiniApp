import { ConfigProvider } from "components/config-provider";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "state";
import { Box, Text } from "zmp-ui";

export const HeaderBanner: FC = () => {
  const currentUser = useRecoilValue(currentUserState);
  return (
    <ConfigProvider
      cssVariables={{
        "--tw-gradient-stops": "#A1C9FC, #ffffff",
      }}
    >
      <Box
        className="space-x-1 bg-gradient-to-b h-28"
        justifyContent="flex-end"
        p={7}
        flex
      >
        <Box className="" m={3}>
          <Text size="xLarge" className="text-black" bold>
            Chào {currentUser?.name ?? "Lộc Trần"},
          </Text>
        </Box>
        <Box className="">
          <img
            className="w-14 h-14 rounded-full border-4 border-white bg-white"
            src={
              currentUser?.avatarUrl ??
              "https://img.icons8.com/ios/50/cloud.png"
            }
          />
        </Box>
      </Box>
    </ConfigProvider>
  );
};
