import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div>
      <Topbar />
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              currentUser && currentUser.isAdmin ? (
                <Navigate replace to="/" />
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route
            exact
            path="/"
            element={
              currentUser && currentUser.isAdmin ? (
                <Home />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          ></Route>
          <Route
            path="/users"
            element={
              currentUser && currentUser.isAdmin ? (
                <UserList />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          ></Route>
          <Route
            path="/user/:userId"
            element={
              currentUser && currentUser.isAdmin ? (
                <User />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          ></Route>
          <Route
            path="/new-user"
            element={
              currentUser && currentUser.isAdmin ? (
                <NewUser />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          ></Route>
          <Route
            path="/products"
            element={
              currentUser && currentUser.isAdmin ? (
                <ProductList />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          ></Route>
          <Route
            path="/product/:productId"
            element={
              currentUser && currentUser.isAdmin ? (
                <Product />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          ></Route>
          <Route
            path="/new-product"
            element={
              currentUser && currentUser.isAdmin ? (
                <NewProduct />
              ) : (
                <Navigate replace to="/login" />
              )
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
