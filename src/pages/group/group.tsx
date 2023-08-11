import React, { FC } from "react";
import { ListRenderer } from "components/list-renderer";
import { useRecoilValue } from "recoil";
import { groupState } from "state";
import { Box, Header, Page, Text } from "zmp-ui";
import { Divider } from "components/divider";

const GroupList: FC = () => {
  const groups = useRecoilValue(groupState);

  return (
    <Box className="bg-background">
      <ListRenderer
        noDivider
        items={groups}
        renderLeft={(item) => (
          <img className="w-10 h-10 rounded-full" src={"https://icons8.com/icon/6899/meal"} />
        )}
        renderRight={(item) => (
          <Box key={item.id}>
            <Text.Header>{item.money + " " + item.currency}</Text.Header>
            <Text
              size="small"
              className="text-gray overflow-hidden whitespace-nowrap text-ellipsis"
            >
              {item.title}
            </Text>
          </Box>
        )}
      />
    </Box>
  );
};

const GroupPage: FC = () => {
  return (
    <Page>
      <Header title="Danh sách nhóm" showBackIcon={false} />
      <Divider />
      <GroupList />
    </Page>
  );
};

export default GroupPage;