import { atom, selector, selectorFamily } from "recoil";
import {
  getAccessToken,
  getLocation,
  getPhoneNumber,
  getUserInfo,
  showToast,
} from "zmp-sdk";
import coffeeIcon from "static/category-coffee.svg";
import matchaIcon from "static/category-matcha.svg";
import foodIcon from "static/category-food.svg";
import milkteaIcon from "static/category-milktea.svg";
import drinksIcon from "static/category-drinks.svg";
import breadIcon from "static/category-bread.svg";
import juiceIcon from "static/category-juice.svg";
import { Category, CategoryId } from "types/category";
import { Product } from "types/product";
import { Cart } from "types/cart";
import { Notification } from "types/notification";
import { Group, groupDefault } from "types/group";
import { Expense, expensesDefault } from "types/expense";
import { calculateDistance } from "utils/location";
import { Store } from "types/delivery";
import { calcFinalPrice } from "utils/product";
import { wait } from "utils/async";
import { firebaseDB } from "app";
import { User } from "types/user";
import GroupPage from "pages/group/group";
import { Net, NetInfo, netInfoDefault } from "types/net";
import { isEmpty, isUndefined } from "lodash";

export const userState = selector({
  key: "user",
  get: () => getUserInfo({}).then((res) => res.userInfo),
});

export const categoriesState = selector<Category[]>({
  key: "categories",
  get: () => [
    { id: "coffee", name: "Cà phê", icon: coffeeIcon },
    { id: "matcha", name: "Trà xanh", icon: matchaIcon },
    { id: "food", name: "Đồ ăn vặt", icon: foodIcon },
    { id: "milktea", name: "Trà sữa", icon: milkteaIcon },
    { id: "drinks", name: "Giải khát", icon: drinksIcon },
    { id: "bread", name: "Bánh mỳ", icon: breadIcon },
    { id: "juice", name: "Nước ép", icon: juiceIcon },
  ],
});

const description = `There is a set of mock banners available <u>here</u> in three colours and in a range of standard banner sizes`;
const productsCollection = "Products";
const notificationsCollection = "Notifications";

export const productsState = selector<Product[]>({
  key: "products",
  get: async () => {
    const response = await firebaseDB.collection(productsCollection).get();
    const data = await response.docs;
    const accessToken = await getAccessToken();
    console.log("TEST: " + accessToken);
    const test = await fetch(`https://zah-13.123c.vn/api/v1/open-ai/ask`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify({
        prompt: "Generate quote of the day",
      }),
    });
    const jsonResponse = await test.json();
    showToast({
      message: jsonResponse.code + " " + jsonResponse.data,
      success: () => {
        // xử lý khi gọi api thành công
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    });
    return data.map(
      (doc) =>
        <Product>{
          id: doc.data().id,
          name: doc.data().title,
          price: doc.data().price,
          image: doc.data().image,
          description: doc.data().description,
          categoryId: doc.data().categoryId,
          sale: doc.data().sale,
          variants: doc.data().variants,
        }
    );
  },
});

export const recommendProductsState = selector<Product[]>({
  key: "recommendProducts",
  get: ({ get }) => {
    const products = get(productsState);
    return products.filter((p) => p.sale);
  },
});

export const selectedCategoryIdState = atom({
  key: "selectedCategoryId",
  default: "coffee",
});

export const productsByCategoryState = selectorFamily<Product[], CategoryId>({
  key: "productsByCategory",
  get:
    (categoryId) =>
    async ({ get }) => {
      const allProducts = await get(productsState);
      return allProducts.filter((product) =>
        product.categoryId.includes(categoryId)
      );
    },
});

export const cartState = atom<Cart>({
  key: "cart",
  default: [],
});

export const totalQuantityState = selector({
  key: "totalQuantity",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce((total, item) => total + item.quantity, 0);
  },
});

export const totalPriceState = selector({
  key: "totalPrice",
  get: ({ get }) => {
    const cart = get(cartState);
    return cart.reduce(
      (total, item) =>
        total + item.quantity * calcFinalPrice(item.product, item.options),
      0
    );
  },
});

export const notificationsState = selector<Notification[]>({
  key: "teno",
  get: async () => {
    const response = await firebaseDB.collection(notificationsCollection).get();
    const data = await response.docs;
    return data.map(
      (doc) =>
        <Notification>{
          id: doc.data().id,
          image: doc.data().image,
          title: doc.data().title,
          content: doc.data().content,
        }
    );
  },
  set: ({ set, get }: any, newValue: any) => {},
});

// export const groupState = selector<Group[]>({
//   key: 'customSelector',
//   get: async () => {
//     return [
//       <Group>{id:0, groupName:"Tăng cơ giảm mỡ"},
//       <Group>{id:1, groupName:"Hackathon"},
//       <Group>{id:2, groupName:"We love ZA"}
//     ]
//   },
//   set: ({ set, get }: any, newValue: any) => {},
// });

// export const currentGroupState = selector<Group[]>({
//   key: 'customSelector',
//   get: async () => {

//   },
//   set: ({ set, get }: any, newValue: any) => {},
// });

export const atomExpenseState = atom<Expense[]>({
  key: "atomExpenseState",
  default: [],
});

export const expenseState = selector<Expense[]>({
  key: "customSelectorExpense",
  get: async ({ get }) => {
    const data = get(atomExpenseState);
    console.log(data);
    if (isUndefined(data) || !data || isEmpty(data)) {
      return expensesDefault;
    }
    return data;
  },
  set: ({ set, get }: any, newValue: any) => {},
});

export const atomNetState = atom<NetInfo | null>({
  key: "atomNetState",
  default: null,
});

export const netState = selector<NetInfo | null>({
  key: "customSelector",
  get: async ({ get }) => {
    const data = get(atomNetState);
    if (!data || isEmpty(data)) {
      return netInfoDefault;
    }
    return data;
  },
  set: ({ set, get }: any, newValue: any) => {},
});

export const currentReportPayed = atom<number>({
  key: "currentReportPayed",
  default: 0,
});

export const currentBalanceInExpense = atom<number>({
  key: "currentBalanceInExpense",
  default: 0,
});

export const keywordState = atom({
  key: "keyword",
  default: "",
});

export const resultState = selector<Product[]>({
  key: "result",
  get: async ({ get }) => {
    const keyword = get(keywordState);
    if (!keyword.trim()) {
      return [];
    }
    const products = get(productsState);
    await wait(500);
    return products.filter((product) =>
      product.name.trim().toLowerCase().includes(keyword.trim().toLowerCase())
    );
  },
});

export const storesState = atom<Store[]>({
  key: "stores",
  default: [
    {
      id: 1,
      name: "VNG Campus Store",
      address:
        "Khu chế xuất Tân Thuận, Z06, Số 13, Tân Thuận Đông, Quận 7, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 10.741639,
      long: 106.714632,
    },
    {
      id: 2,
      name: "The Independence Palace",
      address:
        "135 Nam Kỳ Khởi Nghĩa, Bến Thành, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 10.779159,
      long: 106.695271,
    },
    {
      id: 3,
      name: "Saigon Notre-Dame Cathedral Basilica",
      address:
        "1 Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 10.779738,
      long: 106.699092,
    },
    {
      id: 4,
      name: "Bình Quới Tourist Village",
      address:
        "1147 Bình Quới, phường 28, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 10.831098,
      long: 106.733128,
    },
    {
      id: 5,
      name: "Củ Chi Tunnels",
      address: "Phú Hiệp, Củ Chi, Thành phố Hồ Chí Minh, Việt Nam",
      lat: 11.051655,
      long: 106.494249,
    },
  ],
});

export const nearbyStoresState = selector({
  key: "nearbyStores",
  get: ({ get }) => {
    // Get the current location from the locationState atom
    const location = get(locationState);

    // Get the list of stores from the storesState atom
    const stores = get(storesState);

    // Calculate the distance of each store from the current location
    if (location) {
      const storesWithDistance = stores.map((store) => ({
        ...store,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          store.lat,
          store.long
        ),
      }));

      // Sort the stores by distance from the current location
      const nearbyStores = storesWithDistance.sort(
        (a, b) => a.distance - b.distance
      );

      return nearbyStores;
    }
    return [];
  },
});

export const selectedStoreIndexState = atom({
  key: "selectedStoreIndex",
  default: 0,
});

export const selectedStoreState = selector({
  key: "selectedStore",
  get: ({ get }) => {
    const index = get(selectedStoreIndexState);
    const stores = get(nearbyStoresState);
    return stores[index];
  },
});

export const selectedDeliveryTimeState = atom({
  key: "selectedDeliveryTime",
  default: +new Date(),
});

export const requestLocationTriesState = atom({
  key: "requestLocationTries",
  default: 0,
});

export const requestPhoneTriesState = atom({
  key: "requestPhoneTries",
  default: 0,
});

export const locationState = selector<
  { latitude: string; longitude: string } | false
>({
  key: "location",
  get: async ({ get }) => {
    const requested = get(requestLocationTriesState);
    if (requested) {
      const { latitude, longitude, token } = await getLocation({
        fail: console.warn,
      });
      if (latitude && longitude) {
        return { latitude, longitude };
      }
      if (token) {
        console.warn(
          "Sử dụng token này để truy xuất vị trí chính xác của người dùng",
          token
        );
        console.warn(
          "Chi tiết tham khảo: ",
          "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app"
        );
        console.warn("Giả lập vị trí mặc định: VNG Campus");
        return {
          latitude: "10.7287",
          longitude: "106.7317",
        };
      }
    }
    return false;
  },
});

export const phoneState = selector<string | boolean>({
  key: "phone",
  get: async ({ get }) => {
    const requested = get(requestPhoneTriesState);
    if (requested) {
      const { number, token } = await getPhoneNumber({ fail: console.warn });
      if (number) {
        return number;
      }
      console.warn(
        "Sử dụng token này để truy xuất số điện thoại của người dùng",
        token
      );
      console.warn(
        "Chi tiết tham khảo: ",
        "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app"
      );
      console.warn("Giả lập số điện thoại mặc định: 0337076898");
      return "0337076898";
    }
    return false;
  },
});

export const currentUserState = selector<User | null>({
  key: "currentUserState",
  get: async () => {
    try {
      const accessToken = await getAccessToken();
      console.log(accessToken);
      const response = await fetch(
        `https://zah-13.123c.vn/api/v1/authentication`,
        {
          method: "GET",
          headers: {
            Authorization: `${accessToken}`,
          },
        }
      );
      console.log(response);
      const data = await response.json();
      if (data.code != 200) return null;
      return data.data;
    } catch (error) {
      return null;
    }
  },
});

export const currentListGroup = atom<Group[]>({
  key: "currentListGroup",
  default: [
    <Group>{ id: 0, name: "Xóm nhỏ vui cùng xóm lớn", category: "HOME" },
    <Group>{ id: 2, name: "Xóm bự vui cùng xóm lớn" },
  ],
});

export const currentSelectedGroup = atom<Group | null>({
  key: "currentSelectedGroup",
  default: groupDefault,
});

export const newGroupTitleName = atom({
  key: "newGroupTitleName",
  default: "",
});

export const newGroupCategory = atom({
  key: "newGroupCategory",
  default: "",
});

export const newCreatedGroupId = atom({
  key: "newCreatedGroupId",
  default: "",
});
