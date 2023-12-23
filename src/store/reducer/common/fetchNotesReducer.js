import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  notes: [],
};

const fetchNotesSlice = createSlice({
  name: "fetchNotes",
  initialState,
  reducers: {
    fetchNotesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchNotesSuccess: (state, action) => {
      state.loading = false;
      state.notes = action.payload;
    },
    fetchNotesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = fetchNotesSlice;

export const fetchNotes = () => async (dispatch) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const config = {
    headers: {
      Authorization: token,
    },
  };

  dispatch(actions.fetchNotesStart());

  try {
    const response = await axios.get(`/api/common/fetchnotes`, config);
    // Access the data property of the response object
    const responseData = response.data;
    dispatch(actions.fetchNotesSuccess(responseData));

    // Return the response object to be used in the .then block

    return response;
  } catch (error) {
    dispatch(actions.fetchNotesFailure(error.message));
  }
};

export default fetchNotesSlice.reducer;
