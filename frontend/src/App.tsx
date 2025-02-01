import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotels from "./pages/AddHotels";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>
          <p>HomePage</p>
        </Layout>} />
        <Route path="/search" element={<Layout>
          <p>Search</p>
        </Layout>} />
        <Route path="/register" element={<Layout>
          <Register />
        </Layout>} />
        <Route path="/sign-in" element={<Layout>
          <SignIn />
        </Layout>} />
        {isLoggedIn && (<>
          <Route path="/add-hotel" element={<Layout>
            <AddHotels />
          </Layout>} />
          <Route path="/my-hotels" element={<Layout>
            <MyHotels />
          </Layout>} />
          <Route path="/edit-hotel/:hotelId" element={<Layout>
            <EditHotel />
          </Layout>} />
        </>)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App;