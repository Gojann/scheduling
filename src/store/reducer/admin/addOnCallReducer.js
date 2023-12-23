import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  onCallUsers: [],
  loading: false,
  error: null,
};

const onCallSlice = createSlice({
  name: "onCall",
  initialState,
  reducers: {
    addOnCallUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addOnCallUserSuccess: (state, action) => {
      state.loading = false;
      state.onCallUsers.push(action.payload);
    },
    addOnCallUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = onCallSlice;

export const addOnCallUser = (userData) => async (dispatch) => {
  dispatch(actions.addOnCallUserStart());

  try {
    const response = await axios.post(`/api/admin/oncall`, userData);
    dispatch(actions.addOnCallUserSuccess(response.data));
    console.log(response);
  } catch (error) {
    dispatch(actions.addOnCallUserFailure(error.message));
  }
};

export default onCallSlice.reducer;
