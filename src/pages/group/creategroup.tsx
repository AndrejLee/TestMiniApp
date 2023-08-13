import { Divider } from "components/divider";
import { debounce } from "lodash";
import React, { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  currentUserState,
  newCreatedGroupId,
  newGroupCategory,
  newGroupTitleName,
} from "state";
import { showToast, openProfilePicker } from "zmp-sdk/apis";
import { Page, Header, Box, Text, Input, Select, Button } from "zmp-ui";
import { SelectValueType } from "zmp-ui/select";
import { GroupCategories, GroupCateId } from "types/category";
import { hideKeyboard } from "zmp-sdk";

const CreateGroup: FC = () => {
  const currentUser = useRecoilValue(currentUserState);
  const [keyword, setKeyword] = useRecoilState(newGroupTitleName);
  const [selectedCate, setCategory] = useRecoilState(newGroupCategory);
  const [createdGroupId, setCreatedGroupId] = useRecoilState(newCreatedGroupId);
  const navigate = useNavigate();
  const cates: Array<GroupCateId> = ["HOME", "TRIP", "COUPLE", "OTHER"];

  const handleChange = useCallback(
    debounce((keyword: string) => {
      setKeyword(keyword);
    }, 200),
    []
  );

  const onGroupCategoryChange = (category: SelectValueType[]) => {
    hideKeyboard;
    console.log(category.toString());
  };

  const doCreateGroupAndPickFriends = () => {
    if (currentUser == null) {
      showToast({
        message: "Mất mẹ thông tin user rồi",
      });
    } else {
      console.log(
        JSON.stringify({
          category: selectedCate.toString(),
          name: keyword,
        })
      );

      if (createdGroupId == "") {
        fetch(`https://zah-13.123c.vn/api/v1/groups`, {
          method: "POST",
          headers: {
            Authorization: `${currentUser.id}`,
            "Content-Type": "application/json",
            accept: "*/*",
          },
          body: JSON.stringify({
            category: selectedCate,
            name: keyword,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.code == 200) {
              const groupId = data.data.id;
              setCreatedGroupId(groupId);
              openProfilePicker({
                maxProfile: 10,
                success: (data) => {
                  const { users } = data;
                  console.log(users);
                  console.log(createdGroupId);
                  if (users.length > 0) {
                    fetch(`https://zah-13.123c.vn/api/v1/groups/members`, {
                      method: "POST",
                      headers: {
                        Authorization: `${currentUser.id}`,
                        "Content-Type": "application/json",
                        accept: "*/*",
                      },
                      body: JSON.stringify({
                        groupId: groupId,
                        members: users.map((user) => ({
                          id: user.id,
                          name: user.profile.name,
                          avatarUrl: user.profile.avatar,
                        })),
                      }),
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        if (data.code == 200) {
                          showToast({
                            message: "Thêm người thành công",
                          });
                        } else {
                          showToast({
                            message: "Thêm người không thành công",
                          });
                        }
                        setCreatedGroupId("");
                        navigate(-1);
                      });
                  }
                },
                fail: (err) => {},
              });
            } else {
              showToast({
                message: "Tạo group lỗi rồi",
              });
            }
          });
      } else {
        openProfilePicker({
          maxProfile: 10,
          success: (data) => {
            const { users } = data;
            console.log(users);
            console.log(createdGroupId);
            if (users.length > 0) {
              fetch(`https://zah-13.123c.vn/api/v1/groups/members`, {
                method: "POST",
                headers: {
                  Authorization: `${currentUser.id}`,
                  "Content-Type": "application/json",
                  accept: "*/*",
                },
                body: JSON.stringify({
                  groupId: createdGroupId,
                  members: users.map((user) => ({
                    id: user.id,
                    name: user.profile.name,
                    avatarUrl: user.profile.avatar,
                  })),
                }),
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.code == 200) {
                    showToast({
                      message: "Thêm người thành công",
                    });
                  } else {
                    showToast({
                      message: "Thêm người không thành công",
                    });
                  }
                  setCreatedGroupId("");
                  navigate(-1);
                });
            }
          },
          fail: (err) => {},
        });
      }
    }
  };

  return (
    <Page className="h-full bg-white">
      <Header title="Tạo nhóm chia tiền" showBackIcon={true} />
      <Box pr={2} pl={2} pt={4} pb={4} className="justify-center flex bg-white">
        <Text.Title size="large">Bạn muốn chia tiền với ai?</Text.Title>
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
        <Input
          ref={(el) => {
            if (!el?.input?.value) {
              el?.focus();
            }
          }}
          defaultValue={keyword}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={"Tên nhóm"}
          clearable
          allowClear
        />
      </Box>

      <Box p={4} className="bg-white">
        <Select
          closeOnSelect
          placeholder="Mục đích"
          multiple={false}
          defaultValue={"OTHER"}
          onChange={(value) => onGroupCategoryChange(value)}
        >
          {cates.map((cate) => (
            <Option value={cate} title={GroupCategories[cate].name} />
          ))}
        </Select>
      </Box>
      <Box className="fixed right-0" mt={2} mr={4}>
        <Button size="large" onClick={() => doCreateGroupAndPickFriends()}>
          Mời bạn
        </Button>
      </Box>
    </Page>
  );
};

export default CreateGroup;
