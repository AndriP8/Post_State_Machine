import axios from "axios";

interface Action {
  type:
    | "FetchPost"
    | "FetchPostSuccess"
    | "FetchPostError"
    | "FetchUserSuccess"
    | "FetchUserError"
    | "Reset";
  payload?: any;
}

interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  company: {
    name: string;
  };
}

interface State {
  states: "Idle" | "FetchingPost" | "FetchingUser" | "ShowingPost" | "Error";
  data: {
    posts: null | Posts[];
    users: null | User[];
  };
  error: null;
}

export const initialState: State = {
  states: "Idle",
  data: {
    posts: null,
    users: null,
  },
  error: null,
};

export const onStatePost = (
  state: State,
  sendPost: (action: Action) => void
) => {
  switch (state.states) {
    case "Idle":
      sendPost({ type: "FetchPost" });
      break;
    case "FetchingPost":
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res) =>
          sendPost({ type: "FetchPostSuccess", payload: res.data })
        )
        .catch((err) =>
          sendPost({ type: "FetchPostError", payload: err.messages })
        );
      break;
    case "FetchingUser":
      axios
        .get("https://jsonplaceholder.typicode.com/users")
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

export const postReducer = (prevState: State, action: Action): State => {
  switch (prevState.states) {
    case "Idle":
      switch (action.type) {
        case "FetchPost":
          return {
            ...prevState,
            states: "FetchingPost",
            data: {
              posts: null,
              users: null,
            },
            error: null,
          };
        default:
          return prevState;
      }
    case "FetchingPost":
      switch (action.type) {
        case "FetchPostSuccess":
          return {
            ...prevState,
            states: "FetchingUser",
            data: {
              ...prevState.data,
              posts: action.payload,
            },
            error: null,
          };
        case "FetchPostError":
          return {
            ...prevState,
            states: "Error",
            data: {
              posts: null,
              users: null,
            },
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
            states: "ShowingPost",
            data: {
              ...prevState.data,
              users: action.payload,
            },
            error: null,
          };
        case "FetchUserError":
          return {
            ...prevState,
            states: "Error",
            data: {
              posts: null,
              users: null,
            },
            error: null,
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
            data: {
              posts: null,
              users: null,
            },
            error: null,
          };
        default:
          return prevState;
      }
    default:
      return prevState;
  }
};
