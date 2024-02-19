import { createAsyncThunk } from "@reduxjs/toolkit";

export interface Child {
  id: number;
  child_id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  phone: string;
  status: string;
  option: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  solde: number;
  children: Child[];
}

export const getMe = createAsyncThunk<User, void, {}>("User/getMe", async () => {
  try {
    const jwtToken =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA3NzQyMTczLCJleHAiOjE3MTAzMzQxNzN9.UaIEhBWbAZkzqU9pQYiJfslboWizeGCpOvgfGfr5HRo";
    const res = await fetch(`http://localhost:1337/api/users/me?populate=*`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const data: User = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
});
