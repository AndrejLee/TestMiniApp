import React, { FC, Suspense, useEffect, useState } from "react";
import { Box, Page } from "zmp-ui";
import { Inquiry } from "./inquiry";
import { Welcome } from "./welcome";
import { Banner } from "./banner";
import { Categories } from "./categories";
import { Recommend } from "./recommend";
import { ProductList } from "./product-list";
import { Divider } from "components/divider";
import { useRecoilValue } from "recoil";
import { currentUserState, groupState, userState } from "state";

const HomePage: React.FunctionComponent = () => {
  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Welcome />
      <Box className="flex-1 overflow-auto">
        <Suspense>
          <LoadMainResult></LoadMainResult>
        </Suspense>
        <Inquiry />
        <Banner />
        <Suspense>
          <Categories />
        </Suspense>
        <Divider />
        <Recommend />
        <Divider />
        <ProductList />
        <Divider />
      </Box>
    </Page>
  );
};

const LoadMainResult: FC = () => {
  const currentUser = useRecoilValue(currentUserState);
  const listGroup = useRecoilValue(groupState);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log(currentUser);
      if (currentUser == null) {
        await closeApp({});
      } else {
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div></div>
    // <Box className="bg-background">
    //   <ListRenderer
    //     noDivider
    //     items={listGroup}
    //     renderLeft={(item) => <img className="w-10 h-10 rounded-full" src={} />}
    //     renderRight={(item) => (
    //       <Box key={item.id}>
    //         <Text.Header>{item.title}</Text.Header>
    //         <Text
    //           size="small"
    //           className="text-gray overflow-hidden whitespace-nowrap text-ellipsis"
    //         >
    //           {item.content}
    //         </Text>
    //       </Box>
    //     )}
    //   />
    // </Box>
  );
};

export default HomePage;
