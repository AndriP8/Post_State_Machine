import axios from "axios";

interface Action {
  type:
    | "FetchDetailPost"
    | "FetchPostAndCommentsSuccess"
    | "FetchPostAndCommentsError"
    | "FetchUserSuccess"
    | "FetchUserError"
    | "Reset";
  payload?: any;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  company: {
    name: string;
  };
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  body: string;
}

interface State {
  states:
    | "Idle"
    | "FetchingPostAndComments"
    | "FetchingUser"
    | "ShowingPostDetail"
    | "Error";
  data: {
    post: null | Post;
    user: null | User;
    comments: Comment[];
  };
  error: null | string;
}

export const initialState: State = {
  states: "Idle",
  data: {
    post: null,
    user: null,
    comments: [],
  },
  error: null,
};

export const onStateChangeDetailPost = (
  state: State,
  sendPost: (action: Action) => void,
  postId: string | undefined,
  userId: number | undefined
) => {
  switch (state.states) {
    case "Idle":
      sendPost({ type: "FetchDetailPost" });
      break;
    case "FetchingPostAndComments":
      const promisePost = axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const promiseComments = axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );

      Promise.all([promisePost, promiseComments])
        .then(([resPost, resComments]) =>
          sendPost({
            type: "FetchPostAndCommentsSuccess",
            payload: { post: resPost.data, comments: resComments.data },
          })
        )
        .catch((err) =>
          sendPost({ type: "FetchPostAndCommentsError", payload: err.messages })
        );
      break;
    case "FetchingUser":
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((res) =>
          sendPost({ type: "FetchUserSuccess", payload: res.data })
        )
        .catch((err) =>
          sendPost({ type: "FetchUserError", payload: err.messages })
        );
      break;
    case "Error":
      break;
    default:
      break;
  }
};

export const detailPostReducer = (prevState: State, action: Action): State => {
  switch (prevState.states) {
    case "Idle":
      switch (action.type) {
        case "FetchDetailPost":
          return {
            ...prevState,
            states: "FetchingPostAndComments",
            data: {
              comments: [],
              post: null,
              user: null,
            },
            error: null,
          };
        default:
          return prevState;
      }
    case "FetchingPostAndComments":
      switch (action.type) {
        case "FetchPostAndCommentsSuccess":
          return {
            ...prevState,
            states: "FetchingUser",
            data: {
              ...prevState.data,
              post: action.payload.post,
              comments: action.payload.comments,
            },
            error: null,
          };
        case "FetchPostAndCommentsError":
          return {
            ...prevState,
            states: "Error",
            data: initialState.data,
            error: action.payload,
          };
        default:
          return prevState;
      }
    case "FetchingUser":
      switch (action.type) {
        case "FetchUserSuccess":
          return {
            ...prevState,
            states: "ShowingPostDetail",
            data: {
              ...prevState.data,
              user: action.payload,
            },
            error: null,
          };
        case "FetchUserError":
          return {
            ...prevState,
            states: "Error",
            data: initialState.data,
            error: action.payload,
          };
        default:
          return prevState;
      }
    case "Error":
      switch (action.type) {
        case "Reset":
          return {
            ...prevState,
            states: "Idle",
            data: initialState.data,
            error: null,
          };
        default:
          return prevState;
      }
    case "ShowingPostDetail":
      return prevState;
    default:
      return prevState;
  }
};
