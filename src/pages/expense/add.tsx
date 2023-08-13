import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  atomExpenseState,
  cartState,
  currentSelectedGroup,
  currentUserState,
  userState,
} from "state";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Box, Button, Input, Select, Text } from "zmp-ui";
import { Group } from "types/group";
import { toNumber } from "lodash";
import { hideKeyboard, onCallbackData, showToast } from "zmp-sdk";
import { useNavigate } from "react-router";
import { Expense } from "types/expense";
import {
  ExpenseCateId,
  ExpenseCategories,
  getExpenseIcon,
  Category,
} from "types/category";
import { utilGetNumberText, utilGetNumberFromText } from "types/expense";

export interface AddExpenseData {
  money: number;
  describe: string;
  date: Date;
}

export interface AddExpenseProps {
  group?: Group;
  selected?: AddExpenseData;
  children: (methods: { open: () => void; close: () => void }) => ReactNode;
}

export const AddExpense: FC<AddExpenseProps> = ({
  children,
  group,
  selected,
}) => {
  const [money, setMoney] = useState(0);
  const [input, setInput] = useState("");
  const [visible, setVisible] = useState(true);
  const currentUser = useRecoilValue(currentUserState);
  const currentGroup = useRecoilValue(currentSelectedGroup);
  const [listExpense, setListExpense] = useRecoilState(atomExpenseState);
  const [exCate, setExCate] = useState(ExpenseCategories.OTHER.id);
  const cates: Array<ExpenseCateId> = [
    "OOD",
    "ACCOMMODATION",
    "TRANSPORTATION",
    "SHOPPING",
    "BEAUTY",
    "SPORTS",
    "ENTERTAINMENT",
    "HEALTH",
    "OTHER",
  ];

  const currentDate = () => {
    const cdate = new Date();
    var text =
      cdate.getFullYear() +
      (cdate.getMonth() < 9 ? "-0" : "-") +
      (cdate.getMonth() + 1) +
      (cdate.getDate() > 9 ? "-" : "-0") +
      cdate.getDate();
    return text;
  };

  const [ddmm, setDdmm] = useState(currentDate());

  const clear = () => {
    setVisible(false);
    setMoney(0);
    setInput("");
    setDdmm(currentDate());
  };

  const addRecord = (
    money: number,
    msg: string,
    date: Date,
    cate: ExpenseCateId
  ) => {
    if (money <= 0) {
      showToast({
        message: "Bạn chưa nhập số tiền kìa",
      });
      return false;
    }
    if (currentGroup != null && currentUser != null) {
      fetch(
        `https://zah-13.123c.vn/api/v1/expenses/groups/${currentGroup.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `${currentUser.id}`,
            "Content-Type": "application/json",
            accept: "*/*",
          },
          body: JSON.stringify({
            amount: money,
            title: msg,
            date: date,
            category: cate,
            userId: currentUser.id,
            participants: currentGroup.members.map((member) => member.id),
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.code == 200) {
            showToast({ message: "Tạo hoạt động thành công" });
            const updatedItems = [...listExpense, data.data];
            setListExpense(updatedItems);
          } else {
            showToast({ message: "Tạo hoạt động thất bại, code " + data.code });
          }
          clear();
        });
    }
    return true;
  };
  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet visible={visible} onClose={() => clear()} autoHeight>
          {
            <Box className="space-y-6 mt-2" p={4}>
              <Box flex className="space-x-4">
                <img
                  className="w-11 h-11"
                  src="https://img.icons8.com/ios/50/initiate-money-transfer.png"
                />
                <Input
                  placeholder="Tiền chi trả"
                  clearable
                  allowClear
                  value={utilGetNumberText(money)}
                  onChange={(e) => {
                    var temp = utilGetNumberFromText(e.target.value);
                    if (!isNaN(temp) || temp < 0) {
                      setMoney(temp);
                    }
                  }}
                />
              </Box>
              <Box flex className="space-x-4">
                <img className="w-11 h-11" src={getExpenseIcon(exCate)} />
                <Select
                  placeholder="Mục đích"
                  multiple={false}
                  defaultValue={exCate}
                  value={exCate}
                  onChange={(value) => {
                    setExCate(value);
                    hideKeyboard();
                  }}
                  closeOnSelect
                >
                  {cates.map((cate) => (
                    <Option value={cate} title={ExpenseCategories[cate].name} />
                  ))}
                </Select>
              </Box>
              <Box flex className="space-x-4">
                <img
                  className="w-11 h-11"
                  src="https://img.icons8.com/ios/50/goodnotes.png"
                />
                <Input
                  placeholder="Mô tả"
                  clearable
                  allowClear
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </Box>
              <Box flex className="space-x-4">
                <img
                  className="w-11 h-11"
                  src="https://img.icons8.com/ios/50/calendar--v1.png"
                />
                <input
                  className="h=11 pl-2"
                  type="date"
                  value={ddmm}
                  onChange={(e) => setDdmm(e.target.value)}
                />
              </Box>
              <Box flex className="space-x-4">
                <img
                  className="w-11 h-11"
                  src="https://img.icons8.com/ios/50/conference-call--v1.png"
                />
                <Input
                  value="Tất cả thành viên"
                  clearable
                  allowClear
                  disabled
                />
              </Box>
              <Button
                variant="primary"
                type="highlight"
                fullWidth
                onClick={() => {
                  addRecord(money, input, new Date(ddmm), exCate);
                }}
              >
                Thêm chi tiêu
              </Button>
            </Box>
          }
        </Sheet>,
        document.body
      )}
    </>
  );
};
