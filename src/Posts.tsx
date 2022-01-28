import React from "react";
import { useNavigate } from "react-router-dom";
import { onStatePost, initialState, postReducer } from "./reducer/postReducer";

const Posts = () => {
  const [postState, sendPost] = React.useReducer(postReducer, initialState);

  const navigate = useNavigate();

  React.useEffect(() => {
    onStatePost(postState, sendPost);
  }, [postState]);

  return (
    <div className="p-4 bg-[#041C32] min-h-screen h-auto text-white">
      <h1 className="text-3xl">Posts Page</h1>
      {postState.states === "FetchingUser" ||
        (postState.states === "FetchingPost" && (
          <h1 className="text-3xl mt-8">Loading ......</h1>
        ))}
      {postState.states === "ShowingPost" && (
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 row-auto gap-3 my-4">
          {postState.data.posts?.map((post) => (
            <div
              key={post.id}
              className="border-2 border-teal-400 rounded-md px-4 py-2 cursor-pointer"
              onClick={() => navigate(`/detail-post/${post.id}`)}
            >
              {postState.data.users?.map(
                (user) =>
                  post.userId === user.id && (
                    <div key={user.id}>
                      <h3 className="text-lg">{user.name}</h3>
                      <h4 className="text-sm">{user.company.name}</h4>
                    </div>
                  )
              )}
              <div className="my-3">
                <h2 className="text-2xl text-center font-bold">{post.title}</h2>
                <p className="my-1">{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {postState.states === "Error" && (
        <h1 className="text-3xl mt-8">{postState.error}</h1>
      )}
    </div>
  );
};

export default Posts;
