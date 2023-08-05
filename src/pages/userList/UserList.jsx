import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";

import Sidebar from "../../components/sidebar/Sidebar";

export default function UserList() {
  // const [data, setData] = useState(userRows);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userRequest
      .get("/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                params.row.img ||
                "https://images.pexels.com/photos/9121260/pexels-photo-9121260.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }
              alt=""
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "isActive",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <div style={{ display: "flex", height: "92vh" }}>
        <Sidebar style={{ flex: 2 }} />
        <DataGrid
          style={{ flex: 4 }}
          rows={users}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          getRowId={(row) => row._id}
          checkboxSelection
        />
      </div>
    </div>
  );
}
