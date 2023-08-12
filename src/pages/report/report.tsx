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

const ReportList: FC = () => {
  const currentUser = useRecoilValue(currentUserState);
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

  const handleOnClick = (balance: number) => {
    if (balance > 0) {
      openShareSheet({
        type: "zmp",
        data: {
          title: "My Zalo Mini App - HomePage",
          description: "Home page",
          thumbnail: "https://sample-videos.com/img/Sample-jpg-image-50kb.jpg",
        },
        success: (res) => {},
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
                    <Text.Header>
                      {item.user.name}{" "}
                      {item.user.id == currentGroup?.owner.id ? "👑" : ""}
                    </Text.Header>
                    <Text
                      size="small"
                      className="text-gray overflow-hidden whitespace-nowrap text-ellipsis"
                    >
                      {item.balance == 0
                        ? "sạch nợ"
                        : item.balance > 0
                        ? "nợ nhóm"
                        : "cho mượn"}{" "}
                      {utilGetMoneyText(item.balance, "đ")}
                    </Text>
                  </Box>
                  {currentGroup?.owner.id == currentUser?.id &&
                  item.user.id != currentUser?.id ? (
                    <Button
                      className="fixed right-4"
                      size="small"
                      disabled={item.balance == 0}
                      onClick={() => handleOnClick(item.balance)}
                    >
                      {item.balance == 0
                        ? ""
                        : item.balance > 0
                        ? "Nhắc"
                        : "Trả"}
                    </Button>
                  ) : (
                    <div></div>
                  )}
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
  const currentPayed = useRecoilValue(currentReportPayed);
  const currentGroup = useRecoilValue(currentSelectedGroup);

  return (
    <Page>
      <Welcome shouldBack={true} />
      <NetWelcome
        name={currentGroup == null ? "" : currentGroup.name}
        payed={currentPayed}
        currency="đ"
      />
      <Divider />
      <ReportList />
    </Page>
  );
};

export default ReportPage;
