import { createSlice } from "@reduxjs/toolkit";

type ChatState = {};

const initialState: ChatState = {};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
});

export const {} = chatSlice.actions;

export default chatSlice.reducer;
