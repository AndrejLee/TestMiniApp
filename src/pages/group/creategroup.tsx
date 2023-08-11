import { Divider } from "components/divider";
import { debounce } from "lodash";
import React, { FC, useCallback } from "react";
import { useRecoilState } from "recoil";
import { newGroupTitleName } from "state";
import { Page, Header, Box, Text, Input } from "zmp-ui";

const CreateGroup: FC = () => {
  const [keyword, setKeyword] = useRecoilState(newGroupTitleName);

  const handleChange = useCallback(
    debounce((keyword: string) => {
      setKeyword(keyword);
    }, 500),
    []
  );

  return (
    <Page>
      <Box pr={2} pl={2} pt={4} pb={4} className="justify-center flex">
        <Text.Header>Bạn muốn chia tiền với ai?</Text.Header>
      </Box>
      <Box
        p={4}
        pt={6}
        className="bg-white transition-all ease-out flex-none"
        ref={
          ((el: HTMLDivElement) => {
            setTimeout(() => {
              if (el) {
                el.style.paddingTop = "8px";
              }
            });
          }) as any
        }
      >
        <Input.Search
          ref={(el) => {
            if (!el?.input?.value) {
              el?.focus();
            }
          }}
          defaultValue={keyword}
          onChange={(e) => handleChange(e.target.value)}
          clearable
          allowClear
        />
      </Box>
      <Divider />
    </Page>
  );
};

export default CreateGroup;
