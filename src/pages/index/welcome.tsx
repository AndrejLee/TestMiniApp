import React, { FC, useEffect } from "react";
import { Box, Button, Header, Text } from "zmp-ui";
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
import {
  getGroupIcon,
  GroupCate,
  GroupCategories,
  GroupCateId,
} from "types/category";
import billImg from "./bill.png";
import groupImg from "./group.png";
import { isEmpty } from "lodash";

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
            {shouldBack ? (
              <div className="h-8"></div>
            ) : (
              <img
                className="w-8 h-8 rounded-lg border-inset"
                src={getConfig((c) => c.template.headerLogo) || logo}
              />
            )}

            <Text.Title size="large">{appConfig.app.title}</Text.Title>
          </Box>
        ) as unknown as string
      }
    />
  );
};

export const GroupHeader: FC = () => {
  const group = useRecoilValue(currentSelectedGroup);
  return (
    <Box
      flex
      alignItems="center"
      className="space-x-2 pr-20"
      marginWidth={100}
      p={2}
    >
      <img
        className="w-10 h-10 rounded -inset left-5"
        src={getGroupIcon(group?.category ?? "COUPLE")}
      />
      <Text.Title
        size="xLarge"
        className=" whitespace-nowrap overflow-hidden overflow-ellipsis"
      >
        {group?.name ?? "Unknown"}
      </Text.Title>
      <Text className="text-blue-700 font-semibold absolute right-8">
        Chia sẻ
      </Text>
    </Box>
  );
};

export const GroupWelcome: FC = () => {
  const currency = "đ";
  const navigate = useNavigate();
  const group = useRecoilValue(currentSelectedGroup);
  const cateId = group?.category ?? "OTHER";
  console.log(group?.name);
  const cate: GroupCate = GroupCategories[cateId] ?? GroupCategories.OTHER;
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
      <GroupHeader />
      <Box className="bg-blue-50 h-32 rounded-xl" p={4} flex>
        <Box className="space-y-2">
          <Text size={"xLarge"}>
            {value < 0 ? "Mọi người còn nợ bạn" : "Bạn còn nợ tổng cộng"}
          </Text>
          <Text size="xLarge" bold={true}>
            {utilGetMoneyText(value, currency)}
          </Text>
          <Text
            size="large"
            bold
            className="text-blue-700"
            color="to-blue-600 blue"
            onClick={() => {
              navigate("/report");
            }}
          >
            Xem chi tiết {">"}
          </Text>
          {value == 0 ? (
            <div></div>
          ) : (
            <Button className="mt-2" size="small">
              {value > 0 ? "Trả" : "Nhắc"}
            </Button>
          )}
        </Box>
        <img className="absolute right-8" src={groupImg}></img>
      </Box>
    </Box>
  );
};

export const NetWelcome: FC<{
  name: string;
  payed: number;
  currency?: string;
}> = ({ name, payed, currency }) => {
  if (!currency) currency = "VND";
  const group = useRecoilValue(currentSelectedGroup);
  return (
    <Box className="space-x-2 bg-slate-100" m={3}>
      <GroupHeader />
      <Box className="bg-blue-50 h-32 rounded-xl" p={4} flex>
        <Box className="space-y-2">
          <Text.Title size={"xLarge"}>Tổng chi</Text.Title>
          <Text.Title size="xLarge" className="text-red-700">
            {utilGetMoneyText(payed, currency)}
          </Text.Title>
        </Box>
        <img className="absolute right-8" src={billImg}></img>
      </Box>
    </Box>
  );
};
