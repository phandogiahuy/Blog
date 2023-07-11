import { Collapse, Divider } from "antd";
import { Link } from "react-router-dom";

const d = new Date();
const { Panel } = Collapse;
const Posts = ({ post, author, comments }) => (
  <div className="Post">
    <Link to={`/post/${post.id}`}>
      <div className="post-name">
        POST TITLE: <p className="post-title">{post.title}</p>{" "}
      </div>
      <div className="post-author ">
        Author: <p className="post-author-name"> {author.name}</p>
      </div>
      <div className="post-date">
        Created at: <p className="post-author-date"> {d.toDateString()}</p>{" "}
      </div>
      <div className="post-content"> {post.body}</div>
      <div className="countComment">{comments.length} replies</div>
    </Link>
    <Divider />
    <Collapse defaultActiveKey={["0"]}>
      <Panel header=" Xem bình luận" key="1">
        {comments.map((comment) => (
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
export default Posts;
