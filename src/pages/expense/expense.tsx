import React, { FC } from "react";
import { ListRenderer } from "../../components/list-renderer";
import { useRecoilValueLoadable } from "recoil";
import { expenseState } from "../../state";
import { getMoneyText, getDecriptionText } from "../../types/expense"
import { Box, Header, Page, Text } from "zmp-ui";
import { Divider } from "../../components/divider";

const ExpenseList: FC = () => {
  const asyncDataLoadable = useRecoilValueLoadable(expenseState);

  switch (asyncDataLoadable.state) {
    case 'loading':
      return <p>Loading...</p>;
    case 'hasError':
      return <p>Error loading data</p>;
    case 'hasValue':
      const expenses = asyncDataLoadable.contents;
      return (
        <Box className="bg-background">
          <ListRenderer
            noDivider
            items={expenses}
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

const ExpensePage: FC = () => {
  return (
    <Page>
      <Header title="Khoản chi" showBackIcon={false} />
      <Divider />
      <ExpenseList />
    </Page>
  );
};

export default ExpensePage;