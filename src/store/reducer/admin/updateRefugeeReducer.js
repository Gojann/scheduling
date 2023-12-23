import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
};

const updateRefugeeSlice = createSlice({
  name: "updateRefugee",
  initialState,
  reducers: {
    updateRefugeeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateRefugeeSuccess: (state) => {
      state.loading = false;
      // Additional state updates can be done upon successful update
    },
    updateRefugeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions } = updateRefugeeSlice;

export const updateRefugee =
  (refugeeId, assignedToUserId) => async (dispatch) => {
    dispatch(actions.updateRefugeeStart());

    try {
      const response = await axios.post(`/api/admin/updaterefugee`, {
        refugeeId,
        assignedToUserId,
      });
      dispatch(actions.updateRefugeeSuccess(response.data));
      console.log(response);
    } catch (error) {
      dispatch(actions.updateRefugeeFailure(error.message));
    }
  };

export default updateRefugeeSlice.reducer;
