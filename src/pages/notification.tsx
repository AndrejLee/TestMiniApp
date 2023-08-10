import React, { FC } from "react";
import { ListRenderer } from "../components/list-renderer";
import { useRecoilValueLoadable } from "recoil";
import { notificationsState } from "../state";
import { Box, Header, Page, Text } from "zmp-ui";
import { Divider } from "../components/divider";

const NotificationList: FC = () => {
  const asyncDataLoadable = useRecoilValueLoadable(notificationsState);

  switch (asyncDataLoadable.state) {
    case 'loading':
      return <p>Loading...</p>;
    case 'hasError':
      return <p>Error loading data</p>;
    case 'hasValue':
      const notifications = asyncDataLoadable.contents;
      return (
        <Box className="bg-background">
          <ListRenderer
            noDivider
            items={notifications}
            renderLeft={(item) => (
              <img className="w-10 h-10 rounded-full" src={item.image} />
            )}
            renderRight={(item) => (
              <Box key={item.id}>
                <Text.Header>{item.title}</Text.Header>
                <Text
                  size="small"
                  className="text-gray overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  {item.content}
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

const NotificationPage: FC = () => {
  return (
    <Page>
      <Header title="Thông báo" showBackIcon={false} />
      <Divider />
      <NotificationList />
    </Page>
  );
};

export default NotificationPage;
