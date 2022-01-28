import React from "react";
import { useNavigate } from "react-router-dom";
import { Comment, User } from "./reducer/DetailPostReducer";

interface DetailPostCommentsProps {
  user: User | null;
  title: string | undefined;
  body: string | undefined;
  comments: Comment[];
}

const DetailPostComments = ({
  user,
  title,
  body,
  comments,
}: DetailPostCommentsProps) => {
  const navigate = useNavigate();

  return (
    <div className="border-2 border-teal-400 rounded-md max-w-md w-full mx-auto my-4">
      <div className="border-b border-teal-400 px-4">
        {user ? (
          <h3
            className="text-lg cursor-pointer"
            onClick={() => navigate(`/user-detail/${user?.id}`)}
          >
            {user.name}
          </h3>
        ) : (
          <h3 className="text-lg">Loading...</h3>
        )}
        <h2 className="text-2xl text-center font-bold">{title}</h2>
        <p className="my-1">{body}</p>
      </div>
      <div className="px-4 py-2">
        <h3 className="text-2xl">Comments : </h3>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="my-2 border-2 border-teal-400 rounded-md p-2"
          >
            <h4 className="font-bold">Author : {comment.name}</h4>
            <p className="text-lg">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPostComments;
