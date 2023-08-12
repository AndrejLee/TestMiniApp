import React, { FC } from "react";
import { ListRenderer } from "../../components/list-renderer";
import { useRecoilValueLoadable } from "recoil";
import { expenseState, netState } from "../../state";
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
  const asyncDataLoadable = useRecoilValueLoadable(netState);

  switch (asyncDataLoadable.state) {
    case "loading":
      return <p>Loading...</p>;
    case "hasError":
      return <p>Error loading data</p>;
    case "hasValue":
      const netInfo = asyncDataLoadable.contents;
      return (
        <Box className="bg-background">
          <ListRenderer
            noDivider
            items={netInfo.members}
            renderLeft={(item) => (
              <img
                className="w-10 h-10 rounded-full"
                src={item.avatar ?? "https://img.icons8.com/ios/50/sun.png"}
              />
            )}
            renderRight={(item) => (
              <Box key={item.id} flex>
                <Box type="left">
                  <Text.Header>{item.name}</Text.Header>
                  <Text
                    size="small"
                    className="text-gray overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    {item.net < 0 ? "nợ nhóm" : "cho mượn"}{" "}
                    {utilGetMoneyText(item.net, "đ")}
                  </Text>
                </Box>
                <Button className="fixed right-4" size="small">
                  {item.net < 0 ? "Nhắc" : "Trả"}
                </Button>
              </Box>
            )}
          />
        </Box>
      );
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
      <Welcome />
      <NetWelcome name="Tăng cơ giảm mỡ" payed={4500000} currency="đ" />
      <Divider />
      <ReportList />
    </Page>
  );
};

export default ReportPage;
