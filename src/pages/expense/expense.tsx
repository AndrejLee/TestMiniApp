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
  currentSelectedGroup,
  currentUserState,
  expenseState,
} from "../../state";
import { getMoneyText, getDecriptionText } from "../../types/expense";
import { Box, Button, Header, Page, Text } from "zmp-ui";
import { Divider } from "../../components/divider";
import { GroupWelcome } from "../index/welcome";
import { AddExpense } from "./add";
import { Group } from "types/group";

const ExpenseList: FC = () => {
  const currentUser = useRecoilValue(currentUserState);
  const currentGroup = useRecoilValue(currentSelectedGroup);
  const setData = useSetRecoilState(atomExpenseState);

  useEffect(() => {
    // Fetch data from API
    if (currentGroup != null && currentUser != null) {
      fetch(
        `https://zah-13.123c.vn/api/v1/expenses/groups/${currentGroup.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `${currentUser.id}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setData(data.data));
    }
  }, []);

  const asyncDataLoadable = useRecoilValueLoadable(expenseState);

  switch (asyncDataLoadable.state) {
    case "loading":
      return <p>Loading...</p>;
    case "hasError":
      return <p>Error loading data</p>;
    case "hasValue":
      const expenses = asyncDataLoadable.contents;
      return (
        <Box className="bg-background">
          <ListRenderer
            noDivider
            items={expenses}
            renderLeft={(item) => (
              <img
                className="w-10 h-10 rounded-full"
                src={"https://img.icons8.com/ios/50/meal.png"}
              />
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

export interface ExpensePageProps {
  group?: Group;
}

const ExpensePage: FC<ExpensePageProps> = ({ group }) => {
  return (
    <Page>
      <GroupWelcome name="Tăng cơ giảm mỡ" value={3500000} currency="đ" />
      <Divider />
      <ExpenseList />
      <AddExpense group={group}>
        {({ open }) => (
          <Box className="fixed bottom-16 right-4">
            <Button type="highlight" size="large" onClick={open}>
              +
            </Button>
          </Box>
        )}
      </AddExpense>
    </Page>
  );
};

export default ExpensePage;
