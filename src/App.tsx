import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailPost from "./DetailPost";
import PhotoDetail from "./PhotoDetail";
import Posts from "./Posts";
import UserDetail from "./UserDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Posts />} />
        <Route path="/detail-post/:postId" element={<DetailPost />} />
        <Route path="/user-detail/:userId" element={<UserDetail />} />
        <Route path="/photo-detail/:photoId" element={<PhotoDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
