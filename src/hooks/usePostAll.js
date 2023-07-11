import axios from "axios";
import { useQuery } from "react-query";

import { GET_POST_ALL } from "../constant/queryKey";

const getPostAll = async () => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/`
  );
  return data;
};
const usePostAll = () => useQuery([GET_POST_ALL], getPostAll);
export { usePostAll };
