import axios from "axios";
import { useQuery } from "react-query";

import { GET_COMMENT_DETAIL } from "../../constant/queryKey";

const getComment = async (postId) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return data;
};
const useCommentDetail = (postId) =>
  useQuery([GET_COMMENT_DETAIL, { postId }], () => getComment(postId));
export { useCommentDetail };
