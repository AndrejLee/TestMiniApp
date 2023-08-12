import React, { FC, Suspense, useEffect, useState } from "react";
import { Box, Button, Page, Text } from "zmp-ui";
import { Welcome } from "./welcome";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { currentListGroup, currentUserState } from "state";
import { closeApp } from "zmp-sdk";
import { ListRenderer } from "components/list-renderer";
import { useNavigate } from "react-router";
import { Divider } from "components/divider";

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

  return (
    <Page>
      <Box className="bg-background justify-center flex">
        {listGroup.length > 0 ? (
          <ListRenderer
            items={listGroup}
            renderLeft={(item) => (
              <img
                className="w-10 h-10 rounded-full"
                src={"https://img.icons8.com/ios/50/meal.png"}
              />
            )}
            renderRight={(item) => (
              <Box key={item.id}>
                <Text.Header>{item.title}</Text.Header>
              </Box>
            )}
          />
        ) : (
          <div>KHÔNG CÓ GÌ</div>
        )}
      </Box>
      <Divider />
      <Box className="bottom justify-center flex">
        <Button size="large" onClick={() => createNewGroup()}>
          + Tạo Nhóm Mới
        </Button>
      </Box>
    </Page>
  );
};

export default HomePage;
