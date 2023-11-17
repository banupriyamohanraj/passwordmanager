import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../UserContext/UserContext";

function Viewpassword() {
  let [userData, setuserData] = useState([]);
  let [vaultData, setvaultData] = useState([]);
  let userdata = useContext(UserContext);
  let [deletebutton, setdeletebutton] = useState(false);
  let [newsitepassword, setnewsitepassword] = useState("");

  useEffect(() => {
    let Viewpassword = async (e) => {
      await fetch(`http://localhost:9000/vault/${userdata.userlist.user._id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setuserData(data);

          setvaultData(userData.user.vault);
        });
    };
    Viewpassword();
  });

  let Editbutton = (obj) => {
    newsitepassword = prompt("Please Enter the new site password");

    EditButtonAction(obj);
  };

  let DeleteButton = (obj) => {
    setdeletebutton(true);
    DeleteButtonAction(obj);
  };

  let EditButtonAction = async (item) => {
    await fetch(
      `http://localhost:9000/vault/update/${userdata.userlist.user._id}/${item.username}`,
      {
        method: "PUT",
        body: JSON.stringify({
          sitepassword: newsitepassword,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        alert(data.message);
      });
  };

  let DeleteButtonAction = async (item) => {
    await fetch(
      `http://localhost:9000/vault/delete/${userdata.userlist.user._id}/${item.username}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        alert(data.message);
      });
  };

  return (
    <>
      <div className="mt-4">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Website</th>
              <th scope="col">Password</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vaultData.length > 0 ? (
              vaultData.map((obj) => {
                return (
                  <tr>
                    <td>{obj.username}</td>
                    <td>{obj.site}</td>
                    <td>{obj.sitepassword}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-dark border-0"
                        onClick={() => {
                          Editbutton(obj);
                        }}
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                      &emsp;
                      <button
                        type="button"
                        className="btn btn-outline-dark border-0"
                        onClick={() => DeleteButton(obj)}
                      >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <h5 className="mt-4">No passwords yet !!</h5>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Viewpassword;
