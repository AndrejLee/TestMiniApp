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
import { ListRenderer } from "components/list-renderer";
import { useNavigate } from "react-router";
import { Divider } from "components/divider";
import { HeaderBanner } from "./headerBanner";
import { Group } from "types/group";

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
      <Box className="bg-background justify-center flex">
        {listGroup.length > 0 ? (
          <ListRenderer
            onClick={(item) => handleItemClick(item)}
            items={listGroup}
            renderLeft={(item) => (
              <img
                className="w-10 h-10 rounded-full"
                src={"https://img.icons8.com/ios/50/meal.png"}
              />
            )}
            renderRight={(item) => (
              <Box key={item.id} mt={2}>
                <Text.Header>{item.name}</Text.Header>
              </Box>
            )}
          />
        ) : (
          <Box mt={10}>
            <Text size="large" className="text-slate-500">
              Bạn chưa có nhóm chia sẻ hóa đơn
            </Text>
          </Box>
        )}
      </Box>
      <Box className="fixed bottom-16 right-4">
        <Button size="large" onClick={() => createNewGroup()}>
          + Tạo Nhóm Mới
        </Button>
      </Box>
    </Page>
  );
};

export default HomePage;
