import { createAsyncThunk } from "@reduxjs/toolkit";

export const getOneSubject = createAsyncThunk(
  "getOneSubject",
  async (subjectId:string) => {
    try {
      const jwtToken =
        localStorage.getItem("token") ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA3NzQyMTczLCJleHAiOjE3MTAzMzQxNzN9.UaIEhBWbAZkzqU9pQYiJfslboWizeGCpOvgfGfr5HRo";
      const res = await fetch(
        `http://localhost:1337/api/subjects-datas/${subjectId}?populate=*`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const { data } = await res.json();
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
