import { createAsyncThunk } from "@reduxjs/toolkit";
import { Children } from "./onechildReducer";

export const getOneChildren = createAsyncThunk<Children[], string>(
  "Children/getOneChildren",
  async (childId) => {
    try {
      const jwtToken =
        localStorage.getItem("token") ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA3NzQyMTczLCJleHAiOjE3MTAzMzQxNzN9.UaIEhBWbAZkzqU9pQYiJfslboWizeGCpOvgfGfr5HRo";
      const res = await fetch(
        `http://localhost:1337/api/childrens/${childId}?populate=*`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const {data} = await res.json();
      console.log("🚀 ~ data:", data)
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
