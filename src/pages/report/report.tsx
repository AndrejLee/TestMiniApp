import React, { FC, useEffect } from "react";
import { ListRenderer } from "../../components/list-renderer";
import {
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {
  atomExpenseState,
  atomNetState,
  currentReportPayed,
  currentSelectedGroup,
  currentUserState,
  expenseState,
  netState,
} from "../../state";
import {
  getMoneyText,
  getDecriptionText,
  utilGetMoneyText,
} from "../../types/expense";
import { Box, Button, Header, Page, Text } from "zmp-ui";
import { Divider } from "../../components/divider";
import { NetWelcome, Welcome } from "../index/welcome";
import { Group } from "types/group";
import { Net, NetInfo } from "types/net";
import { openShareSheet } from "zmp-sdk/apis";
import { isEmpty, isUndefined } from "lodash";
import { User, userDefault0 } from "types/user";
import { openChat } from "zmp-sdk";

const ReportList: FC = () => {
  var currentUser = useRecoilValue(currentUserState);
  const currentGroup = useRecoilValue(currentSelectedGroup);
  const setData = useSetRecoilState(atomNetState);
  const [currentPayed, setCurrentPayed] = useRecoilState(currentReportPayed);

  useEffect(() => {
    // Fetch data from API
    if (currentGroup != null && currentUser != null) {
      fetch(
        `https://zah-13.123c.vn/api/v1/groups/${currentGroup.id}/reports/detailed`,
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

  const asyncDataLoadable = useRecoilValueLoadable(netState);

  const handleOnClick = (
    group: Group | null,
    profile: User,
    balance: number
  ) => {
    if (balance > 0 && group != null) {
      openChat({
        type: "user",
        id: profile.id,
        message: `Xin Chào ${profile.name}, trả cho nhóm ${group.name} ${balance} mau`,
        success: () => {},
        fail: (err) => {},
      });
    }
  };

  switch (asyncDataLoadable.state) {
    case "loading":
      return <p>Loading...</p>;
    case "hasError":
      return <p>Error loading data</p>;
    case "hasValue":
      const netInfo = asyncDataLoadable.contents;
      if (netInfo != null) {
        setCurrentPayed(netInfo.totalAmount);
        return (
          <Box className="bg-white rounded-t-3xl h-auto">
            <Box className="pt-4 pl-4 pr-4">
              <Text.Title size="normal">Danh sách dư nợ</Text.Title>
              <hr className="border-slate-500 border-1 mt-2"></hr>
            </Box>

            {netInfo.members.map((item, index, list) => (
              <Box flex className="h-20" p={2}>
                <img
                  className="mt-1 ml-2 w-14 h-14 rounded-full bg-blue-300"
                  src={
                    isEmpty(item.user.avatarUrl)
                      ? "https://img.icons8.com/ios/100/sun.png"
                      : item.user.avatarUrl
                  }
                />
                <Box
                  key={item.user.id}
                  className="space-y-1 w-full pl-3"
                  pt={2}
                >
                  <Text.Title size="large">
                    {item.user.name}{" "}
                    {item.user.id == currentGroup?.owner.id ? "👑" : ""}
                  </Text.Title>
                  <Text
                    size="normal"
                    className="text-gray overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    {item.balance == 0
                      ? "sạch nợ"
                      : item.balance > 0
                      ? "nợ nhóm"
                      : "cho mượn"}{" "}
                    <span
                      className={
                        item.balance > 0 ? "text-red-700" : "text-green"
                      }
                    >
                      {utilGetMoneyText(item.balance, "VND")}
                    </span>
                  </Text>
                </Box>
                {(currentGroup?.owner.id == currentUser?.id ||
                  isUndefined(currentUser)) &&
                item.user.id != currentUser?.id ? (
                  <button
                    className={
                      "mt-4 w-24 h-8 mr-2 font-semibold rounded-full" +
                      (true
                        ? " bg-blue-500 text-white"
                        : " bg-yellow-200 text-amber-700")
                    }
                    disabled={item.balance == 0}
                    onClick={() =>
                      handleOnClick(currentGroup, item.user, item.balance)
                    }
                  >
                    {item.balance == 0 ? "" : item.balance > 0 ? "Nhắc" : "Trả"}
                  </button>
                ) : (
                  <div></div>
                )}
              </Box>
            ))}
          </Box>
        );
      } else {
        return null;
      }
    default:
      return null;
  }
};

export interface ExpensePageProps {
  group?: Group;
}

const ReportPage: FC<ExpensePageProps> = ({ group }) => {
  const currentPayed = useRecoilValue(currentReportPayed);
  const currentGroup = useRecoilValue(currentSelectedGroup);

  return (
    <Page>
      <Welcome shouldBack={true} />
      <NetWelcome
        name={currentGroup == null ? "" : currentGroup.name}
        payed={currentPayed}
      />
      <ReportList />
    </Page>
  );
};

export default ReportPage;
