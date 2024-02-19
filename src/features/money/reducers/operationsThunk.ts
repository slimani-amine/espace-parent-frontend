import { createAsyncThunk } from "@reduxjs/toolkit";

interface AddOperationParams {
  newOperation: any;
  parentId: number;
  lastOperations: any[];
  newCoupons: any;
}

export const addOperation = createAsyncThunk<any, AddOperationParams>(
  "operations/addOperation",
  async ({ newOperation, parentId, lastOperations, newCoupons }) => {
    try {
      const jwtToken =
        localStorage.getItem("token") ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA3NzQyMTczLCJleHAiOjE3MTAzMzQxNzN9.UaIEhBWbAZkzqU9pQYiJfslboWizeGCpOvgfGfr5HRo";
      const res = await fetch(`http://localhost:1337/api/solde-operations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(newOperation),
      });

      const data = await res.json();

      const updatedOperations = {
        solde_operations: [
          ...lastOperations,
          { id: data.data.id, ...data.data.attributes },
        ],
        coupons: newCoupons,
      };

      const upp = await fetch(`http://localhost:1337/api/users/${parentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(updatedOperations),
      });
      const newData = await upp.json();
      console.log("🚀 ~ newData:", newData);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
