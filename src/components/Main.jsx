/* eslint-disable no-nested-ternary */
import { Collapse, Input, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

import { useComment } from "../hooks/useComments";
import { usePostInfinity } from "../hooks/usePost";
import { usePostAll } from "../hooks/usePostAll";
import { useUser } from "../hooks/useUser";
import Posts from "./Post";

const { Panel } = Collapse;

const Main = () => {
  const { Search } = Input;
  const [item, setItem] = useState("");
  const [show, setShow] = useState(false);
  const [showSpin, setShowSpin] = useState(false);
  const [search, setSearch] = useState("");
  const { ref, inView } = useInView();
  const postAll = usePostAll();
  const posts = usePostInfinity();
  const user = useUser();
  const comment = useComment();
  useEffect(() => {
    if (inView) {
      posts.fetchNextPage();
    }
  }, [inView]);

  if (
    posts.isLoading ||
    user.isLoading ||
    comment.isLoading ||
    postAll.isLoading
  ) {
    return <div>..loading</div>;
  }
  if (posts.error || user.error || comment.error || postAll.error) {
    return <div>{posts.error.message}</div>;
  }
  const onSearch = (e) => {
    setShow(false);
    // eslint-disable-next-line guard-for-in
    setShowSpin(true);
    setItem(e.target.value);
    // eslint-disable-next-line guard-for-in
    for (const i in postAll.data) {
      if (postAll.data[i].title === e.target.value) {
        setShow(true);
        setSearch(postAll.data[i].id);
        setShowSpin(false);
      }
    }
  };
  return (
    <div className="Main">
      <Space
        direction="vertical"
        style={{
          display: "flex",
          justifyContent: "center",
          position: "fixed",
          top: "45px",
          right: "260px",
          zIndex: "1",
        }}
      >
        <Search
          className="search"
          placeholder="Input search text"
          enterButton="Search"
          onChange={onSearch}
          style={{
            width: "200",
            height: "100%",
            zIndex: "1",
            backgroundColor: "yellowgreen",
          }}
        />
      </Space>
      <ul className="search-Iteam">
        {show ? (
          <Link to={`/post/${search}`}>
            <li>{item}</li>
          </Link>
        ) : (
          <li>
            <Space size="middle">
              <Spin spinning={showSpin} size="large">
                {" "}
              </Spin>
            </Space>
          </li>
        )}
      </ul>
      {posts.data.pages.map((page) =>
        page.map((post) => (
          <Posts
            post={post}
            key={post.id}
            author={user.data.find((au) => au.id === post.userId)}
            comments={comment.data.filter((i) => i.postId === post.id)}
          />
        ))
      )}

      <button
        ref={ref}
        disabled={!posts.hasNextPage || posts.isFetchingNextPage}
      >
        {posts.isFetchingNextPage
          ? "Loading more..."
          : posts.hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
    </div>
  );
};

export default Main;
