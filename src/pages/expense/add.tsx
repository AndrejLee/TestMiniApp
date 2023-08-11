import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSetRecoilState } from "recoil";
import { cartState } from "state";
import { Box, Button, Input, Text } from "zmp-ui";
import { Group } from "types/group";

export interface AddExpenseProps {
  group?: Group;
  selected?: {
    money: number;
    describe: string;
    date: Date;
  };
  children: (methods: { open: () => void; close: () => void }) => ReactNode;
}

export const AddExpense: FC<AddExpenseProps> = ({
  children,
  group,
  selected,
}) => {
  const [visible, setVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const setCart = useSetRecoilState(cartState);

  const addRecord = () => {
    if (group) {
    }
    setVisible(false);
  };
  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
          {
            <Box className="space-y-6 mt-2" p={4}>
              <Box flex className="space-x-4">
                <img
                  className="w-11 h-11"
                  src="https://img.icons8.com/ios/50/initiate-money-transfer.png"
                />
                <Input placeholder="Tiền chi trả" clearable allowClear />
              </Box>
              <Box flex className="space-x-4">
                <img
                  className="w-11 h-11"
                  src="https://img.icons8.com/ios/50/goodnotes.png"
                />
                <Input placeholder="Mô tả" clearable allowClear />
              </Box>
              <Box flex className="space-x-4">
                <img
                  className="w-11 h-11"
                  src="https://img.icons8.com/ios/50/calendar--v1.png"
                />
                <Input placeholder="Thời điểm chi trả" clearable allowClear />
              </Box>
              <Box flex className="space-x-4">
                <img
                  className="w-11 h-11"
                  src="https://img.icons8.com/ios/50/conference-call--v1.png"
                />
                <Input placeholder="Tất cả thành viên" clearable allowClear />
              </Box>
              <Button
                disabled={!quantity}
                variant="primary"
                type="highlight"
                fullWidth
                onClick={addRecord}
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
