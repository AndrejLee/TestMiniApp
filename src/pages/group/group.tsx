import React, { FC } from "react";
import { ListRenderer } from "../../components/list-renderer";
import { useRecoilValueLoadable } from "recoil";
import { groupState } from "../../state";
import { getMoneyText, getDecriptionText } from "../../types/group"
import { Box, Header, Page, Text } from "zmp-ui";
import { Divider } from "../../components/divider";

const GroupList: FC = () => {
  const asyncDataLoadable = useRecoilValueLoadable(groupState);

  switch (asyncDataLoadable.state) {
    case 'loading':
      return <p>Loading...</p>;
    case 'hasError':
      return <p>Error loading data</p>;
    case 'hasValue':
      const groups = asyncDataLoadable.contents;
      return (
        <Box className="bg-background">
          <ListRenderer
            noDivider
            items={groups}
            renderLeft={(item) => (
              <img className="w-10 h-10 rounded-full" src={"https://img.icons8.com/ios/50/meal.png"} />
            )}
            renderRight={(item) => (
              <Box key={item.id}>
                <Text.Header>{getMoneyText(item)}</Text.Header>
                <Text
                  size="small"
                  className="text-gray overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  {getDecriptionText(item)}
                </Text>
              </Box>
            )}
          />
        </Box>
      );
    default:
      return null;
  }
};

const GroupPage: FC = () => {
  return (
    <Page>
      <Header title="Khoản chi" showBackIcon={false} />
      <Divider />
      <GroupList />
    </Page>
  );
};

export default GroupPage;