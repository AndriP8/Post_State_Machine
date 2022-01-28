import React from "react";
import { useParams } from "react-router-dom";
import {
  initialState,
  onStateChangeDetailUser,
  userDetailReducer,
} from "./reducer/UserDetailReducer";
import UserDetailAlbums from "./UserDetailAlbums";

const UserDetail = () => {
  const [state, send] = React.useReducer(userDetailReducer, initialState);

  let params = useParams<{ userId: string }>();

  React.useEffect(() => {
    if (params.userId) {
      onStateChangeDetailUser(state, send, params.userId);
    }
  }, [state, params.userId]);

  return (
    <div className="p-4 bg-[#041C32] min-h-screen h-auto text-white">
      <h1 className="text-3xl text-center">User detail page</h1>

      {state.states === "FetchingAlbumsAndUser" && (
        <h1 className="text-3xl mt-8">Loading ........</h1>
      )}

      {state.states === "FetchingPhotos" && (
        <UserDetailAlbums
          user={state.data.user}
          albums={state.data.albums}
          photos={state.data.photos}
        />
      )}
      {state.states === "ShowingUserDetail" && (
        <UserDetailAlbums
          user={state.data.user}
          albums={state.data.albums}
          photos={state.data.photos}
        />
      )}
      {state.states === "Error" && (
        <h1 className="text-3xl mt-8">{state.error}</h1>
      )}
    </div>
  );
};

export default UserDetail;
