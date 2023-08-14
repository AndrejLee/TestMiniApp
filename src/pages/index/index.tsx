import React, { FC, Suspense, useEffect, useState } from "react";
import { Box, Button, Page, Text } from "zmp-ui";
import { Welcome } from "./welcome";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentListGroup,
  currentSelectedGroup,
  currentUserState,
} from "state";
import { closeApp } from "zmp-sdk";
import { GroupListRenderer, ListRenderer } from "components/list-renderer";
import { useNavigate } from "react-router";
import { Divider } from "components/divider";
import { HeaderBanner } from "./headerBanner";
import { Group } from "types/group";
import { GroupCategories, GroupCateId, getGroupIcon } from "types/category";
import { isUndefined } from "lodash";
import { TitleTextSize } from "zmp-ui/text";

const HomePage: React.FunctionComponent = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Welcome />
      <Box className="flex-1 overflow-auto">
        <Suspense>
          <LoadMainResult></LoadMainResult>
        </Suspense>
      </Box>
    </Page>
  );
};

const LoadMainResult: FC = () => {
  const currentUser = useRecoilValue(currentUserState);
  const [listGroup, setListGroup] = useRecoilState(currentListGroup);
  const selectGroup = useSetRecoilState(currentSelectedGroup);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log(currentUser);
      if (currentUser == null) {
        await closeApp({});
      } else {
        console.log(currentUser.id);
        fetch(`https://zah-13.123c.vn/api/v1/groups`, {
          method: "GET",
          headers: {
            Authorization: `${currentUser.id}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.data);
            setListGroup(data.data);
          });
      }
    } catch (error) {}
  };

  const createNewGroup = () => {
    navigate("/creategroup");
  };

  const handleItemClick = (group: Group) => {
    selectGroup(group);
    navigate("/expense");
  };

  return (
    <Page>
      <HeaderBanner />
      <Box m={8} className="">
        <Text.Title size="xLarge" className="">
          Bạn muốn chia tiền nhóm với ai?
        </Text.Title>
      </Box>
      <Box className="bg-background">
        <Box></Box>
        {listGroup.length > 0 ? (
          <Box m={4}>
            <GroupListRenderer
              onClick={(item) => handleItemClick(item)}
              items={listGroup}
            />
          </Box>
        ) : (
          <Box mt={10} alignContent="center">
            <Text size="large" className="text-slate-500">
              Bạn chưa có nhóm chia sẻ hóa đơn
            </Text>
          </Box>
        )}
        <Box className="h-20"></Box>
      </Box>
      <Box className="fixed bottom-6 right-4">
        <Button size="large" onClick={() => createNewGroup()}>
          + Tạo Nhóm Mới
        </Button>
      </Box>
    </Page>
  );
};

export default HomePage;
