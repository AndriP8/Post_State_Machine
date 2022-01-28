import { useNavigate } from "react-router-dom";
import { Albums, Photos, User } from "./reducer/UserDetailReducer";

interface UserDetailAlbumsProps {
  user: User | null;
  albums: Albums[];
  photos: Photos[];
}

const UserDetailAlbums = ({ user, albums, photos }: UserDetailAlbumsProps) => {
  const navigate = useNavigate();

  return (
    <div className="border-2 border-teal-400 rounded-md max-w-md w-full mx-auto my-4">
      <div className="border-b-2 border-teal-400">
        <div className="p-2">
          <h3 className="text-xl">name : {user?.name}</h3>
          <h3 className="text-xl">Email : {user?.email}</h3>
          <h3 className="text-xl">
            Address : {user?.address.street}, {user?.address.suite},{" "}
            {user?.address.city}, {user?.address.zipcode}
          </h3>
          <h3 className="text-xl">Company : {user?.company.name}</h3>
        </div>
      </div>
      <div className="border-b-2 border-teal-400">
        <div className="py-2 px-4">
          <h2 className="text-2xl">List Albums</h2>
          {albums.map((album) => (
            <div
              key={album.id}
              className="border-2 border-teal-400 rounded-md p-2 my-2"
            >
              <h3 className="text-xl">{album.title}</h3>
              {photos.filter((photo) => photo.albumId === album.id).length >
              0 ? (
                <div className="grid grid-cols-3 auto-rows-auto gap-2 my-2 p-2 border border-teal-400 rounded-md">
                  {photos
                    .filter((photo) => photo.albumId === album.id)
                    .map((photo) => (
                      <span key={photo.id}>
                        photo ke : {photo.id}, album id ke : {album.id}
                        <img
                          src={photo.thumbnailUrl}
                          className="cursor-pointer"
                          alt="album"
                          onClick={() => navigate(`/photo-detail/${photo.id}`)}
                        />
                      </span>
                    ))}
                </div>
              ) : (
                <h1 className="text-xl">Loading ........</h1>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetailAlbums;
