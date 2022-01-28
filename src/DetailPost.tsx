import React from "react";
import { useParams } from "react-router-dom";
import DetailPostComments from "./DetailPostComments";
import {
  detailPostReducer,
  initialState,
  onStateChangeDetailPost,
} from "./reducer/DetailPostReducer";

const DetailPost = () => {
  const [postState, sendPost] = React.useReducer(
    detailPostReducer,
    initialState
  );

  let params = useParams<{ postId: string }>();

  React.useEffect(() => {
    onStateChangeDetailPost(
      postState,
      sendPost,
      params.postId,
      postState.data.post?.userId
    );
  }, [postState, params.postId]);

  return (
    <div className="p-4 bg-[#041C32] min-h-screen h-auto text-white">
      <h1 className="text-3xl">Detail Post Page</h1>

      {postState.states === "FetchingPostAndComments" && (
        <h1 className="text-3xl mt-8">Loading ........</h1>
      )}

      {postState.states === "FetchingUser" && (
        <DetailPostComments
          user={postState.data.user}
          title={postState.data.post?.title}
          body={postState.data.post?.body}
          comments={postState.data.comments}
        />
      )}

      {postState.states === "ShowingPostDetail" && (
        <DetailPostComments
          user={postState.data.user}
          title={postState.data.post?.title}
          body={postState.data.post?.body}
          comments={postState.data.comments}
        />
      )}

      {postState.states === "Error" && (
        <h1 className="text-3xl mt-8">{postState.error}</h1>
      )}
    </div>
  );
};

export default DetailPost;
