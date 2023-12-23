import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  onCallUser: null,
};

const onCallSlice = createSlice({
  name: "onCall",
  initialState,
  reducers: {
    onCallStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    onCallSuccess: (state, action) => {
      state.loading = false;
      state.onCallUser = action.payload;
    },
    onCallFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = onCallSlice;

export const fetchOnCallUser = () => async (dispatch) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  const config = {
    headers: {
      Authorization: token,
    },
  };

  dispatch(actions.onCallStart());

  try {
    const response = await axios.get(`/api/user/oncall`, config);
    const responseData = response.data;
    dispatch(actions.onCallSuccess(responseData.onCallUser));
    return response;
  } catch (error) {
    dispatch(actions.onCallFailure(error.message));
  }
};

export const updateOnCallUser = (userId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };

  dispatch(actions.onCallStart());

  try {
    const response = await axios.post(`/api/user/oncall`, { userId }, config);
    const responseData = response.data;
    dispatch(actions.onCallSuccess(responseData.onCallUser));
    return response;
  } catch (error) {
    dispatch(actions.onCallFailure(error.message));
  }
};

export default onCallSlice.reducer;
