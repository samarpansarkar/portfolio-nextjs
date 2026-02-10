const { default: API } = require("@/utils/AxiosInstance");
const { createSlice } = require("@reduxjs/toolkit");
const { createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchSkills = createAsyncThunk(
  "skills/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/skills");
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Faild to fetch skills.",
      );
    }
  },
  //!Request caching condition (avoid double fetch)
  {
    condition: (_, { getState }) => {
      const { skills } = getState();

      if (skills.loading) return false;
      if (skills.projects.length) return false;
    },
  },
);

const initialState = {
  skills: [],
  loading: false,
  error: null,
};

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default skillSlice.reducer;
