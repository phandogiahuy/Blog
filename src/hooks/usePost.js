import axios from "axios";
import { useInfiniteQuery } from "react-query";

import { GET_POST } from "../constant/queryKey";

const MAX = 100;
const LIMIT = 10;
const getPost = async ({ pageParam = 0 }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_start=${pageParam}&_limit=${LIMIT}`
  );
  return data;
};

const usePostInfinity = () =>
  useInfiniteQuery([GET_POST], getPost, {
    getNextPageParam: (lastPage, pages) => {
      const lastPost = lastPage[lastPage.length - 1];
      if (lastPost.id === MAX) return undefined;
      return lastPost.id;
    },
  });
export { usePostInfinity };
