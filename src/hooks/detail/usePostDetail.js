import axios from "axios";
import { useQuery } from "react-query";

import { GET_POST_DETAIL } from "../../constant/queryKey";

const getPost = async (postId) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  return data;
};
const usePostDetail = (postId) =>
  useQuery([GET_POST_DETAIL, { postId }], () => getPost(postId));
export { usePostDetail };
