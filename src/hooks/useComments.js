import axios from "axios";
import { useQuery } from "react-query";

import { GET_COMMENT } from "../constant/queryKey";

const getComment = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/comments"
  );
  return data;
};
const useComment = () => useQuery([GET_COMMENT], getComment);

export { useComment };
