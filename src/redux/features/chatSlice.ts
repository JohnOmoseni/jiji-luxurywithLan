import { ChatProps } from "@/types/api.types";
import { createSlice } from "@reduxjs/toolkit";

type ChatState = {
  chatLog: ChatProps[];
  selectedChat: any | null;
};

const initialState: ChatState = {
  chatLog: [],
  selectedChat: null,
};

const chatbotSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatLog: (state, { payload }) => {
      state.chatLog = payload;
    },
    setSelectedChat: (state, { payload }) => {
      state.selectedChat = payload;
    },
  },
});

export default chatbotSlice.reducer;
export const { setChatLog, setSelectedChat } = chatbotSlice.actions;
