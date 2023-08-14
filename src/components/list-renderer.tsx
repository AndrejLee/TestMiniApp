import React, { ReactNode, useMemo, useState } from "react";
import { getGroupIcon } from "types/category";
import { Group } from "types/group";
import { Box, Button, Icon, Text } from "zmp-ui";

interface ListRendererProps<T> {
  title?: string;
  limit?: number;
  items: T[];
  renderLeft: (item: T) => ReactNode;
  renderRight: (item: T) => ReactNode;
  renderKey?: (item: T) => string;
  onClick?: (item: T) => void;
  noDivider?: boolean;
}

export function ListRenderer<T>({
  title,
  items,
  limit,
  renderLeft,
  renderRight,
  renderKey,
  onClick,
  noDivider,
}: ListRendererProps<T>) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapsedItems = useMemo(() => {
    return items.slice(0, limit);
  }, [items]);

  return (
    <Box className="bg-background rounded-xl">
      {title && <Text.Title className="p-4 pb-0">{title}</Text.Title>}
      <Box>
        {(isCollapsed ? collapsedItems : items).map((item, i, list) => (
          <div
            key={renderKey ? renderKey(item) : i}
            onClick={() => onClick?.(item)}
            className="flex space-x-4 p-4 last:pb-0"
          >
            {renderLeft(item)}
            <Box className="flex-1 min-w-0 relative">
              {renderRight(item)}
              {!noDivider && i < list.length - 1 && (
                <hr className="absolute left-0 -right-4 -bottom-4 border-divider border-t-[0.5px]"></hr>
              )}
            </Box>
          </div>
        ))}
      </Box>
      {isCollapsed && collapsedItems.length < items.length ? (
        <Box className="p-2">
          <Button
            onClick={() => setIsCollapsed(false)}
            fullWidth
            suffixIcon={<Icon icon="zi-chevron-down" />}
            variant="tertiary"
            type="neutral"
          >
            Xem thêm
          </Button>
        </Box>
      ) : (
        <Box className="w-full h-4"></Box>
      )}
    </Box>
  );
}

//

interface GroupListRendererProps<T> {
  title?: string;
  limit?: number;
  items: Group[];
  renderKey?: (item: Group) => string;
  onClick?: (item: Group) => void;
}

export function GroupListRenderer<T>({
  title,
  items,
  limit,
  renderKey,
  onClick,
}: GroupListRendererProps<T>) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapsedItems = useMemo(() => {
    return items.slice(0, limit);
  }, [items]);

  return (
    <Box className="bg-background rounded-xl">
      {title && <Text.Title className="p-4 pb-0">{title}</Text.Title>}
      <Box>
        {(isCollapsed ? collapsedItems : items).map((item, i, list) => (
          <Box
            key={renderKey ? renderKey(item) : i}
            onClick={() => onClick?.(item)}
            flex
            className="border-inset rounded-2xl space-x-3 border-black"
            m={3}
            pl={2}
          >
            <img className="w-auto h-16" src={getGroupIcon(item.category)} />
            <Box className="" mt={4} pr={20}>
              <Text.Title
                className="overflow-ellipsis overflow-clip whitespace-nowrap"
                size="large"
              >
                {item.name}
              </Text.Title>
            </Box>
          </Box>
        ))}
      </Box>
      {isCollapsed && collapsedItems.length < items.length ? (
        <Box className="p-2">
          <Button
            onClick={() => setIsCollapsed(false)}
            fullWidth
            suffixIcon={<Icon icon="zi-chevron-down" />}
            variant="tertiary"
            type="neutral"
          >
            Xem thêm
          </Button>
        </Box>
      ) : (
        <Box className="w-full h-4"></Box>
      )}
    </Box>
  );
}

/*
{listGroup.map((item) => (
            <Box
              flex
              className="border-inset rounded-2xl space-x-4"
              p={4}
              m={3}
            >
              <img className="w-10 h-10" src={getGroupIcon(item.category)} />
              <Box className="" mt={1}>
                <Text.Title className="" size="large">
                  {item.name}
                </Text.Title>
              </Box>
            </Box>
          ))}
*/
