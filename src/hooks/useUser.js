import axios from "axios";
import { useQuery } from "react-query";

import { GET_USER } from "../constant/queryKey";

const getUser = async () => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users`
  );

  return data;
};
const useUser = () => useQuery([GET_USER], getUser);

export { useUser };
