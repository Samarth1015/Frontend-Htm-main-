"use client";
import { useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../context/firebaseConfig";
import axios from "axios";
import Button from "@mui/material/Button";
import { Question } from "../../../context/number";

const auth = getAuth(app);

export default function ProfilePage() {
  const [data, setData] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const result = await axios.post("/api/user", { email: user.email });
          console.log("response success");
          console.log(result.data);
          setData(result.data); // Assuming response is already JSON
        } catch (error) {
          console.error("Error posting data:", error);
        }
      };

      fetchData();
    }
  }, [user]);

  if (!user) return <div>Loading...</div>; // Loading state

  return (
    <div className="flex h-screen">
      <div
        id="profile-info"
        className="max-w-96 min-w-96 box-border pt-6 bg-slate rounded-2xl mt-24 bg-slate-900 ml-5"
      >
        <div id="user-info" className="flex items-center gap-x-4">
          <div>
            <img
              src={user.photoURL}
              alt="User Profile"
              className="ml-7 rounded-3xl"
            />
          </div>
          <div>
            <h1 className="text-white text-lg">{user.displayName}</h1>
          </div>
        </div>
        <h1 className="ml-7 mt-5">
          user about Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Aliquam enim eum repellat libero dolor, ratione placeat quasi, minus
          id distinctio, alias reprehenderit corrupti. Aliquam possimus
          doloribus iusto ut architecto in.
          <br />
          <Button className="w-1 ml-36">Contained</Button>
        </h1>
      </div>
      <div
        id="q-Data"
        className="w-screen box-border pt-6 bg-slate rounded-2xl mt-24 bg-slate-900 ml-5 mr-5"
      >
        <h1 className="text-center text-4xl mt-24">
          Total number of questions attempted: {data[0]?.totalQuestion}
          <br />
        </h1>
        <h1 className="text-center text-4xl mt-24">
          Total number of right questions: {data[0]?.right}
        </h1>
        <h1 className="text-center text-4xl mt-24">
          Total number of wrong attempted: {data[0]?.wrong}
        </h1>
      </div>
    </div>
  );
}
