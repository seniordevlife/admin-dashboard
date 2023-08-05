import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { useState, useEffect, useMemo } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [subCat, setSubCat] = useState([]);
  const [features, setFeatures] = useState([]);
  const dispatch = useDispatch();

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/orders/income?pid=" + productId);
        const list = res.data((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  console.log(product);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubCat = (e) => {
    setSubCat(e.target.value.split(","));
  };

  const handleFeat = (e) => {
    setFeatures(e.target.value.split(","));
  };

  const handleClick = (id) => {
    // e.preventDefault();
    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);

    if (file !== null) {
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = {
              ...inputs,
              img: downloadURL,
              subcategories: subCat,
              features: features,
            };
            console.log(product);
            console.log(productId, product, dispatch);
          });
        }
      );
    } else {
      const prod = {
        ...inputs,
        img: product.img,
        subcategories: subCat,
        features: features,
      };
      console.log(prod);
      console.log(productId, prod, dispatch);
    }
  };

  return (
    <>
      {product && (
        <div className="product">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Sidebar style={{ flex: 2 }}></Sidebar>
            <div style={{ flex: 4 }}>
              <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                  <button className="productAddButton">Create</button>
                </Link>
              </div>
              <div className="productTop">
                <div className="productTopLeft">
                  <Chart
                    data={pStats}
                    dataKey="Sales"
                    title="Sales Performance"
                  />
                </div>
                <div className="productTopRight">
                  <div className="productInfoTop">
                    <img src={product.img} alt="" className="productInfoImg" />
                    <span className="productName">{product.title}</span>
                  </div>
                  <div className="productInfoBottom">
                    <div className="productInfoItem">
                      <span className="productInfoKey">id:</span>
                      <span className="productInfoValue">{product._id}</span>
                    </div>
                    <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                    </div>
                    <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">
                        {product.inStock}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="productBottom">
                <form className="productForm">
                  <div className="productFormLeft">
                    <label>Product Name</label>
                    <input
                      name="title"
                      type="text"
                      defaultValue={product.title}
                      placeholder={product.title}
                      onChange={handleChange}
                    />
                    <label>Brand</label>
                    <input
                      name="brand"
                      type="text"
                      defaultValue={product.brand}
                      placeholder={product.brand}
                      onChange={handleChange}
                    />
                    <label>Product Category</label>
                    <input
                      name="categories"
                      type="text"
                      defaultValue={product.categories}
                      placeholder="Live $ PA"
                      onChange={handleChange}
                    />
                    <label>Product SubCategory</label>
                    <input
                      name="subcategories"
                      type="text"
                      defaultValue={product.subcategories}
                      placeholder="Speakers, Headphones"
                      onChange={handleSubCat}
                    />
                    <label>Features</label>
                    <input
                      name="features"
                      type="text"
                      defaultValue={product.features}
                      placeholder="Speakers, Headphones"
                      onChange={handleFeat}
                    />
                    <label>Product Description</label>
                    <textarea
                      name="description"
                      type="text"
                      defaultValue={product.description}
                      placeholder={product.description}
                      onChange={handleChange}
                    />
                    <label>Product Price</label>
                    <input
                      name="price"
                      type="number"
                      defaultValue={product.price}
                      placeholder={product.price}
                      onChange={handleChange}
                    />
                    <label>In Stock</label>
                    <select name="inStock" id="idStock" onChange={handleChange}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                  <div className="productFormRight">
                    <div className="productUpload">
                      <img
                        src={product.img}
                        alt=""
                        className="productUploadImg"
                      />
                      <label htmlFor="file">
                        <Publish />
                      </label>
                      <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                      />
                    </div>
                    <button
                      className="productButton"
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick(product._id);
                      }}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
