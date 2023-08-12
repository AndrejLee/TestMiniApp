import React, { FC, useEffect } from "react";
import { Box, Header, Text } from "zmp-ui";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {
  atomExpenseState,
  atomNetState,
  currentSelectedGroup,
  currentUserState,
  netState,
  userState,
} from "state";
import logo from "static/logo.png";
import appConfig from "../../../app-config.json";
import { getConfig } from "utils/config";
import { utilGetMoneyText } from "types/expense";
import { useNavigate } from "react-router";
import { Divider } from "components/divider";

export const Welcome: FC<{
  shouldBack?: boolean;
}> = ({ shouldBack }) => {
  const user = useRecoilValueLoadable(userState);

  return (
    <Header
      className="app-header no-border pl-4 flex-none pb-[6px]"
      showBackIcon={shouldBack ?? false}
      title={
        (
          <Box flex alignItems="center" className="space-x-2">
            <img
              className="w-8 h-8 rounded-lg border-inset"
              src={getConfig((c) => c.template.headerLogo) || logo}
            />
            <Box>
              <Text.Title size="small">{appConfig.app.title}</Text.Title>
              {user.state === "hasValue" ? (
                <Text size="xxSmall" className="text-gray">
                  Welcome, {user.contents.name}!
                </Text>
              ) : (
                <Text>...</Text>
              )}
            </Box>
          </Box>
        ) as unknown as string
      }
    />
  );
};

export const GroupWelcome: FC = () => {
  const currency = "đ";
  const navigate = useNavigate();
  const group = useRecoilValue(currentSelectedGroup);
  const currentUser = useRecoilValue(currentUserState);
  const setData = useSetRecoilState(atomNetState);

  useEffect(() => {
    // Fetch data from API
    if (group != null && currentUser != null) {
      fetch(
        `https://zah-13.123c.vn/api/v1/groups/${group.id}/reports/detailed`,
        {
          method: "GET",
          headers: {
            Authorization: `${currentUser.id}`,
            accept: `*/*`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setData(data.data);
          console.log(data.data);
        });
    }
  }, []);

  const asyncDataLoadableNetState = useRecoilValueLoadable(netState);
  const userNet =
    asyncDataLoadableNetState.state == "hasValue"
      ? asyncDataLoadableNetState.contents?.members.filter(
          (item) => item.user.id == currentUser?.id
        )
      : null;

  const value = userNet != null && userNet?.length > 0 ? userNet[0].balance : 0;

  return (
    <Box className="space-x-2 bg-slate-100" m={3}>
      <Box
        flex
        alignItems="center"
        className="space-x-2"
        marginWidth={100}
        p={2}
      >
        <img
          className="w-10 h-10 rounded -inset left-5"
          src="https://img.icons8.com/ios/50/hug.png"
        />
        <Text.Title size="xLarge"> {group?.name ?? "Unknown"} </Text.Title>
      </Box>

      <Box className="bg-blue-100 rounded-xl" p={3}>
        <Text size="xLarge">
          {value < 0 ? "Mọi người còn nợ bạn" : "Bạn còn nợ tổng cộng"}
        </Text>
        <Text size="xLarge">{utilGetMoneyText(value, currency)}</Text>
        <Text
          className="text-blue-500 underline"
          color="to-blue-600 blue"
          onClick={() => {
            navigate("/report");
          }}
        >
          Xem chi tiết {">>>"}
        </Text>
      </Box>
    </Box>
  );
};

export const NetWelcome: FC<{
  name: string;
  payed: number;
  currency?: string;
}> = ({ name, payed, currency }) => {
  if (!currency) currency = "đ";
  const user = useRecoilValueLoadable(userState);
  const navigate = useNavigate();
  return (
    <Box className="space-x-2 bg-slate-100" m={3}>
      <Box
        flex
        alignItems="center"
        className="space-x-2"
        marginWidth={100}
        p={2}
      >
        <img
          className="w-10 h-10 rounded border-inset left-5"
          src="https://img.icons8.com/ios/50/hug.png"
        />
        <Text.Title size="xLarge"> {name} </Text.Title>
      </Box>
      <Box className="bg-blue-100 rounded-xl" p={3}>
        <Text size="xLarge">Tổng chi</Text>
        <Text size="xLarge" className="text-red-400">
          {utilGetMoneyText(payed, currency)}
        </Text>
      </Box>
    </Box>
  );
};
