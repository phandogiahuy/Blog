import axios from "axios";
import { useQuery } from "react-query";

import { GET_USER_DETAIL } from "../../constant/queryKey";

const getUser = async (userId) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  return data;
};
const useUserDetail = (userId) =>
  useQuery([GET_USER_DETAIL, { userId }], () => getUser(userId), {
    enabled: !!userId,
  });
export { useUserDetail };
