import "../styles/ManageUsers.css";

import { useEffect, useState } from "react";

import Input from "./Input";

const ManageUsers = () => {
  const [users, setUsers] = useState();
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`).then(
      async (response) => {
        if (response.ok) {
          const u = await response.json();
          setUsers(u);
        }
      }
    );
  }, []);

  const updateUsersList = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`).then(
      async (response) => {
        if (response.ok) {
          const u = await response.json();
          setUsers(u);
        }
      }
    );
  };

  const filteredUsers = (users) =>
    users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      return (
        fullName.includes(search.toLowerCase()) ||
        user[2].toLowerCase().includes(search.toLowerCase())
      );
    });

  const handleUserItemClick = (user) => {
    setSelectedUser(
      selectedUser && selectedUser[2] === user[2]
        ? null
        : {
            id: user[0],
            firstName: user[1].split(" ")[0],
            lastName: user[1].split(" ")[1],
            email: user[2],
            membership: user[3],
          }
    );
  };

  const handleSaveClick = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedUser.id,
          name: `${selectedUser.firstName} ${selectedUser.lastName}`,
          email: selectedUser.email,
          membership: selectedUser.membership,
        }),
      }
    );

    if (response.ok) {
      alert("User details saved!");
      updateUsersList();
    } else {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="manage-users-container">
      <h1>Manage Users</h1>
      <Input
        className="rental-search"
        label="Search"
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "600px" }}
      />
      <div className="users-list">
        <div className="users-list-label">
          <p>First Name</p>
          <p>Last Name</p>
          <p>Email</p>
          <p>Membership</p>
        </div>
        {!users && <p>Loading...</p>}
        {users &&
          filteredUsers(users).map(([id, name, email, membership, admin]) => (
            <div key={id} className="user-item-container">
              <button
                className="user-item"
                onClick={() =>
                  handleUserItemClick([id, name, email, membership])
                }
              >
                <p className="user-first-name">{name.split(" ")[0]}</p>
                <p className="user-last-name">{name.split(" ")[1]}</p>
                <p className="user-email">{email}</p>
                <p className="user-membership">
                  {membership} {admin === 1 && "(Administrator)"}
                </p>
              </button>
              {selectedUser && selectedUser.email === email && (
                <div className="edit-user">
                  <p>
                    Edit User Details for <b>{name}</b>
                  </p>
                  <div>
                    <label>First Name:</label>
                    <input
                      type="text"
                      value={selectedUser.firstName}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label>Last Name:</label>
                    <input
                      type="text"
                      value={selectedUser.lastName}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label>Email:</label>
                    <input
                      type="email"
                      value={selectedUser.email}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label>Membership:</label>
                    <select
                      value={selectedUser.membership}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          membership: e.target.value,
                        })
                      }
                    >
                      <option value="Super Member">Super Member</option>
                      <option value="Member">Member</option>
                      <option value="Guest">Guest</option>
                    </select>
                  </div>
                  <button onClick={handleSaveClick}>Save</button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManageUsers;
