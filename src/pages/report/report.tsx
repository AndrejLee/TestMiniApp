import React, { FC, useEffect } from "react";
import { ListRenderer } from "../../components/list-renderer";
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

const ReportList: FC = () => {
  const currentUser = useRecoilValue(currentUserState);
  const currentGroup = useRecoilValue(currentSelectedGroup);
  const setData = useSetRecoilState(atomNetState);

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

  switch (asyncDataLoadable.state) {
    case "loading":
      return <p>Loading...</p>;
    case "hasError":
      return <p>Error loading data</p>;
    case "hasValue":
      const netInfo = asyncDataLoadable.contents;
      if (netInfo != null) {
        return (
          <Box className="bg-background">
            <ListRenderer
              noDivider
              items={netInfo.members}
              renderLeft={(item) => (
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    item.user.avatarUrl ??
                    "https://img.icons8.com/ios/50/sun.png"
                  }
                />
              )}
              renderRight={(item) => (
                <Box key={item.user.id} flex>
                  <Box type="left">
                    <Text.Header>{item.user.name}</Text.Header>
                    <Text
                      size="small"
                      className="text-gray overflow-hidden whitespace-nowrap text-ellipsis"
                    >
                      {item.balance < 0 ? "nợ nhóm" : "cho mượn"}{" "}
                      {utilGetMoneyText(item.balance, "đ")}
                    </Text>
                  </Box>
                  <Button className="fixed right-4" size="small">
                    {item.balance < 0 ? "Nhắc" : "Trả"}
                  </Button>
                </Box>
              )}
            />
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
  return (
    <Page>
      <Welcome shouldBack={true} />
      <NetWelcome name="Tăng cơ giảm mỡ" payed={4500000} currency="đ" />
      <Divider />
      <ReportList />
    </Page>
  );
};

export default ReportPage;
