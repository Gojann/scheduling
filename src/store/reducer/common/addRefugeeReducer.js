import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  refugees: [],
  loading: false,
  error: null,
};

const refugeeSlice = createSlice({
  name: "refugee",
  initialState,
  reducers: {
    addRefugeeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addRefugeeSuccess: (state, action) => {
      state.loading = false;
      state.refugees.push(action.payload);
    },
    addRefugeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = refugeeSlice;

export const addRefugee = (formData) => async (dispatch) => {
  dispatch(actions.addRefugeeStart());

  try {
    const response = await axios.post(`/api/common/addrefugee`, formData);
    dispatch(actions.addRefugeeSuccess(response.data));
    console.log(response);
  } catch (error) {
    dispatch(actions.addRefugeeFailure(error.message));
  }
};

export default refugeeSlice.reducer;
