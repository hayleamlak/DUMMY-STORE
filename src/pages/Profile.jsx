import React from "react";
import "../styles/Profile.css";

export default function Profile() {
  const user = {
    name: "Haylebest",
    email: "haylebest@example.com",
    avatar: "https://i.pravatar.cc/150?img=32",
    orders: 4,
    wishlist: 7,
    address: "Addis Ababa, Ethiopia"
  };

  return (
    <div className="profile-container">
      <div className="profile-top">
        <img className="profile-avatar" src={user.avatar} alt="User avatar" />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.address}</p>
          <button className="edit-btn">Edit Profile</button>
        </div>
      </div>

      <div className="profile-sections">
        <div className="profile-card">
          <h3>Orders</h3>
          <p>You have {user.orders} all orders</p>
        </div>
        <div className="profile-card">
          <h3>wishlists</h3>
          <p>{user.wishlist} items saved</p>
        </div>
      </div>

      <button className="logout-btn">Log Out</button>
    </div>
  );
}
