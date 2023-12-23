import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  message: null,
};

const addNoteSlice = createSlice({
  name: "addNote",
  initialState,
  reducers: {
    addNoteStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNoteSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    addNoteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = addNoteSlice;

export const addNote = (data) => async (dispatch) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const config = {
    headers: {
      Authorization: token,
    },
  };

  dispatch(actions.addNoteStart());

  try {
    const response = await axios.post(`/api/user/addnote`, data, config);
    // Access the data property of the response object
    const responseData = response.data;
    console.log(responseData);
    dispatch(actions.addNoteSuccess(responseData));

    // Return the response object to be used in the .then block
    return response;
  } catch (error) {
    dispatch(actions.addNoteFailure(error.message));
  }
};

export default addNoteSlice.reducer;
