import axios from "axios";

interface Action {
  type:
    | "FetchDetailUser"
    | "FetchAlbumsAndUserSuccess"
    | "FetchAlbumsAndUserError"
    | "FetchPhotosSucces"
    | "FetchPhotosError"
    | "Reset";
  payload?: any;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
  username: string;
  company: {
    name: string;
  };
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Albums {
  userId: number;
  id: number;
  title: string;
}

export interface Photos {
  albumId: number;
  id: number;
  thumbnailUrl: string;
}

interface State {
  states:
    | "Idle"
    | "FetchingAlbumsAndUser"
    | "FetchingPhotos"
    | "ShowingUserDetail"
    | "Error";
  data: {
    user: null | User;
    albums: Albums[];
    photos: Photos[];
  };
  error: null | string;
}

export const initialState: State = {
  states: "Idle",
  data: {
    user: null,
    albums: [],
    photos: [],
  },
  error: null,
};

export const onStateChangeDetailUser = (
  state: State,
  send: (action: Action) => void,
  userId: string
) => {
  switch (state.states) {
    case "Idle":
      send({ type: "FetchDetailUser" });
      break;
    case "FetchingAlbumsAndUser":
      const promiseAlbums = axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}/albums`
      );
      const promiseUser = axios.get(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );

      const promises = [promiseAlbums, promiseUser];

      Promise.all(promises)
        .then(([resAlbums, resUser]) =>
          send({
            type: "FetchAlbumsAndUserSuccess",
            payload: { albums: resAlbums.data, user: resUser.data },
          })
        )
        .catch((err) =>
          send({ type: "FetchAlbumsAndUserError", payload: err.message })
        );
      break;
    case "FetchingPhotos":
      const photoPromises = state.data.albums.map(({ id }) =>
        axios.get(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
      );
      Promise.all(photoPromises)
        .then(async (responses) => {
          const photos = responses.flatMap((response) => response.data);
          send({ type: "FetchPhotosSucces", payload: photos });
        })
        .catch((err) =>
          send({ type: "FetchPhotosError", payload: err.messages })
        );
      break;
    case "Error":
      break;
    default:
      break;
  }
};

export const userDetailReducer = (prevState: State, action: Action): State => {
  switch (prevState.states) {
    case "Idle":
      switch (action.type) {
        case "FetchDetailUser":
          return {
            ...prevState,
            states: "FetchingAlbumsAndUser",
            data: initialState.data,
            error: null,
          };
        default:
          return prevState;
      }
    case "FetchingAlbumsAndUser":
      switch (action.type) {
        case "FetchAlbumsAndUserSuccess":
          return {
            ...prevState,
            states: "FetchingPhotos",
            data: {
              ...prevState.data,
              albums: action.payload.albums,
              user: action.payload.user,
            },
            error: null,
          };
        case "FetchAlbumsAndUserError":
          return {
            ...prevState,
            states: "Error",
            data: initialState.data,
            error: action.payload,
          };
        default:
          return prevState;
      }
    case "FetchingPhotos":
      switch (action.type) {
        case "FetchPhotosSucces":
          return {
            ...prevState,
            states: "ShowingUserDetail",
            data: {
              ...prevState.data,
              photos: action.payload,
            },
            error: null,
          };
        case "FetchPhotosError":
          return {
            ...prevState,
            states: "Error",
            data: initialState.data,
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
            data: initialState.data,
            error: null,
          };
        default:
          return prevState;
      }
    case "ShowingUserDetail":
      return prevState;
    default:
      return prevState;
  }
};
