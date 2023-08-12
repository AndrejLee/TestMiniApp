import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSetRecoilState } from "recoil";
import { cartState } from "state";
import { Box, Button, Input, Text } from "zmp-ui";
import { Group } from "types/group";
import { toNumber } from "lodash";
import { showToast } from "zmp-sdk";

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
  const [date, setDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const setCart = useSetRecoilState(cartState);

  const clear = () => {
    setVisible(false);
    setMoney(0);
    setInput("");
    setDate(new Date());
  };

  const addRecord = (money: number, msg: string, date: Date) => {
    console.log({ money });
    if (money <= 0) {
      showToast({
        message: "Bạn chưa nhập số tiền kìa",
      });
      return false;
    }
    clear();
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
                  value={money}
                  onChange={(e) => {
                    const temp = toNumber(e.target.value);
                    if (!isNaN(temp) || temp < 0) {
                      setMoney(temp);
                    }
                  }}
                />
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
                <Input
                  placeholder={date.toDateString()}
                  clearable
                  allowClear
                  defaultValue={date.toDateString()}
                  value={date.toDateString()}
                  disabled
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
                disabled={!quantity}
                variant="primary"
                type="highlight"
                fullWidth
                onClick={() => {
                  addRecord(money, input, date);
                  setMoney(0);
                  set;
                }}
              >
                Thêm record
              </Button>
            </Box>
          }
        </Sheet>,
        document.body
      )}
    </>
  );
};
