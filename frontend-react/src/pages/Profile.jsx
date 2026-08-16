import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("stylesphereUser");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid stored user:", error);
        localStorage.removeItem("stylesphereUser");
      }
    }
  }, []);

  return (
    <section className="section">
      <h1>My Profile</h1>

      {!user ? (
        <div className="order">
          <p>Please login to view your profile.</p>
        </div>
      ) : (
        <div className="order">
          <p>
            <b>Name:</b> {user.name}
          </p>

          <p>
            <b>Email:</b> {user.email}
          </p>

          <p>
            <b>Member Since:</b>{" "}
            {user.createdAt
              ? new Date(user.createdAt).getFullYear()
              : new Date().getFullYear()}
          </p>
        </div>
      )}
    </section>
  );
}