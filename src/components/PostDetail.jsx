import { Collapse, Divider } from "antd";
import { useParams } from "react-router-dom";

import { useCommentDetail } from "../hooks/detail/useCommentDetail";
import { usePostDetail } from "../hooks/detail/usePostDetail";
import { useUserDetail } from "../hooks/detail/useUserDetail";

const d = new Date();
const { Panel } = Collapse;

function PostDetail() {
  const { postId } = useParams();
  const posts = usePostDetail(postId);
  const comments = useCommentDetail(postId);
  const user = useUserDetail(posts?.data?.userId);
  if (posts.isLoading || comments.isLoading || user.isLoading) {
    return <div>..loading</div>;
  }
  if (posts.error || comments.error || user.error) {
    return <div>{posts.error.message}</div>;
  }
  return (
    <div className="Post" style={{ marginLeft: "100px" }}>
      <div className="post-name">
        POST TITLE: <p className="post-title">{posts.data.title}</p>{" "}
      </div>
      <div className="post-author ">
        Author: <p className="post-author-name"> {user.data.name}</p>
      </div>
      <div className="post-date">
        Created at: <p className="post-author-date"> {d.toDateString()}</p>{" "}
      </div>
      <div className="post-content"> {posts.data.body}</div>
      <div className="countComment">{comments.data.length} replies</div>
      <Divider />
      <Collapse defaultActiveKey={["0"]}>
        <Panel header=" Xem bình luận" key="1">
          {comments.data.map((comment) => (
            <div className="Comment" key={comment.id}>
              <div className="basis-16">
                <img className="comment-img" src="/logo.jpg"></img>
              </div>
              <div className="comment-main pl-2 flex-1">
                <div className="flex">
                  <div className="comment-name mr-2">{comment.name}</div>
                  <div className="comment-date">{d.toDateString()}</div>
                </div>
                <div className="comment-content ">{comment.body}</div>
              </div>
            </div>
          ))}
        </Panel>
      </Collapse>
    </div>
  );
}

export default PostDetail;
