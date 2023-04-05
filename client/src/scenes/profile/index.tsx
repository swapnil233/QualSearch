import React, { useEffect } from "react";
import { IUserProfile } from "../../types/IUserProfile";
import axios from "axios";

export default function Profile({
  userDetails,
  setUserDetails,
}: {
  userDetails: IUserProfile;
  setUserDetails: React.Dispatch<React.SetStateAction<IUserProfile>>;
}) {
  const bearerToken = "";

  useEffect(() => {
    const getUserDetails = async () => {
      const userDetails = await axios.get(
        "http://localhost:3000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      setUserDetails(userDetails.data);
    };

    getUserDetails();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{userDetails.username}</p>
    </div>
  );
}
