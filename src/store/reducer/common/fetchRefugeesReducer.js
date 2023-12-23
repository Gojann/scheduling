import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  refugees: [],
};

const fetchRefugeesSlice = createSlice({
  name: "fetchRefugees",
  initialState,
  reducers: {
    fetchRefugeesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRefugeesSuccess: (state, action) => {
      state.loading = false;
      state.refugees = action.payload;
    },
    fetchRefugeesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = fetchRefugeesSlice;

export const fetchRefugees = () => async (dispatch) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const config = {
    headers: {
      Authorization: token,
    },
  };

  dispatch(actions.fetchRefugeesStart());

  try {
    const response = await axios.get(`/api/common/fetchrefugies`, config);
    // Access the data property of the response object
    const responseData = response.data;
    dispatch(actions.fetchRefugeesSuccess(responseData.refugees));

    // Return the response object to be used in the .then block
    return response;
  } catch (error) {
    dispatch(actions.fetchRefugeesFailure(error.message));
  }
};

export default fetchRefugeesSlice.reducer;
