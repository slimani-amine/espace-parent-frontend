import { createAsyncThunk } from "@reduxjs/toolkit";
import { Children } from "./childrensReducer";

export const getChildren = createAsyncThunk<Children[], number>(
  "Children/getChildren",
  async (parentId) => {
    try {
      const jwtToken =
        localStorage.getItem("token") ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA3NzQyMTczLCJleHAiOjE3MTAzMzQxNzN9.UaIEhBWbAZkzqU9pQYiJfslboWizeGCpOvgfGfr5HRo";
      const res = await fetch(
        `http://localhost:1337/api/users/${parentId}?populate=*`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const { children } = await res.json();
      return children;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const insertChildren = createAsyncThunk<
  Children,
  { newChild: any; parentId: any; lastChilds: any[] }
>("children/insertChildren", async ({ newChild, parentId, childrens }) => {
  try {
    const jwtToken =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA3NzQyMTczLCJleHAiOjE3MTAzMzQxNzN9.UaIEhBWbAZkzqU9pQYiJfslboWizeGCpOvgfGfr5HRo";

    const res = await fetch(`http://localhost:1337/api/childrens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(newChild),
    });

    const data = await res.json();

    const updatedChildrens = {
      children: [...childrens, { id: data.data.id, ...data.data.attributes }],
    };

    const upp = await fetch(`http://localhost:1337/api/users/${parentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(updatedChildrens),
    });
    await upp.json();
    return data.data.attributes;
  } catch (err) {
    console.log("🚀 ~ err:", err);
    console.error(err);
    throw err;
  }
});
