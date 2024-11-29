import { ChatProps } from "@/types/api.types";
import { createSlice } from "@reduxjs/toolkit";

type ChatState = {
  chatLog: ChatProps[] | [{ loading?: boolean }];
};

const initialState: ChatState = {
  chatLog: [],
};

const chatbotSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatLog: (state, { payload }) => {
      state.chatLog = payload;
    },
  },
});

export default chatbotSlice.reducer;
export const { setChatLog } = chatbotSlice.actions;
