import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  refugees: [],
};

const fetchUserRefugeeSlice = createSlice({
  name: "fetchUserRefugee",
  initialState,
  reducers: {
    fetchUserRefugeeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserRefugeeSuccess: (state, action) => {
      state.loading = false;
      state.refugees = action.payload;
    },
    fetchUserRefugeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = fetchUserRefugeeSlice;

export const fetchUserRefugee = () => async (dispatch) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const config = {
    headers: {
      Authorization: token,
    },
  };

  dispatch(actions.fetchUserRefugeeStart());

  try {
    const response = await axios.post(
      `/api/common/fetchownrefugees`,
      { token },
      config
    );
    // Access the data property of the response object
    const responseData = response.data;
    dispatch(actions.fetchUserRefugeeSuccess(responseData.refugees));

    // Return the response object to be used in the .then block
    return response;
  } catch (error) {
    dispatch(actions.fetchUserRefugeeFailure(error.message));
  }
};

export default fetchUserRefugeeSlice.reducer;
