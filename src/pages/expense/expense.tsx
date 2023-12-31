import React, { FC, useEffect, useState } from "react";
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
  getDdmm,
  expensesDefault,
} from "../../types/expense";
import { Box, Button, Header, Page, Text } from "zmp-ui";
import { Divider } from "../../components/divider";
import { GroupWelcome, Welcome } from "../index/welcome";
import { AddExpense } from "./add";
import { Group, groupDefault } from "types/group";
import { getExpenseIcon } from "types/category";

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
      if (expenses.length <= 0) {
        return (
          <Text
            size="xLarge"
            className="w-full text-center p-10 pt-20 text-slate-400"
          >
            Nhóm bạn chưa có chi tiêu nào
          </Text>
        );
      }
      console.log(expenses);
      return (
        <Box className="pt-6 pl-4 pr-4 space-y-3">
          {expenses.map((item, index, list) => (
            <Box flex className="space-x-2">
              <img className="w-16 h-16" src={getExpenseIcon(item.category)} />
              <Box key={item.id} className="space-y-1 w-full" pt={2}>
                <Text.Title size="large">
                  {item.title.length > 0 ? item.title : "-"}
                </Text.Title>
                <Text
                  size="normal"
                  className="text-gray overflow-hidden whitespace-nowrap text-ellipsis"
                >
                  Trả bởi <span className="text-black">{item.user.name}</span>
                </Text>
              </Box>
              <Box
                className="right-0 space-y-1"
                pt={2}
                justifyContent="flex-end"
                alignContent="flex-end"
              >
                <Text.Title
                  size="large"
                  className="text-right text-red-700 w-full whitespace-nowrap"
                >
                  {getMoneyText(item)}
                </Text.Title>
                <Text size="normal" className="text-gray text-right">
                  {getDdmm(item)}
                </Text>
              </Box>
            </Box>
          ))}
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
      <Welcome shouldBack={true} />
      <GroupWelcome />
      <Box className="rounded-t-3xl bg-white">
        <ExpenseList />
        <Box className="h-32"></Box>
      </Box>
      <AddExpense>
        {({ open }) => (
          <Box className="fixed bottom-6 right-4">
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
