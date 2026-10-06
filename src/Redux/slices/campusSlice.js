import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { campusService } from '../../services/campusService';

export const fetchCampuses = createAsyncThunk(
  'campuses/fetchCampuses',
  async (params, { rejectWithValue }) => {
    try {
      return await campusService.getCampuses(params);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCampusStats = createAsyncThunk(
  'campuses/fetchCampusStats',
  async (_, { rejectWithValue }) => {
    try {
      return await campusService.getCampusStats();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCampus = createAsyncThunk(
  'campuses/addCampus',
  async (campusData, { rejectWithValue }) => {
    try {
      return await campusService.createCampus(campusData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCampus = createAsyncThunk(
  'campuses/updateCampus',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await campusService.updateCampus(id, data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCampus = createAsyncThunk(
  'campuses/deleteCampus',
  async (id, { rejectWithValue }) => {
    try {
      await campusService.deleteCampus(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const campusSlice = createSlice({
  name: 'campuses',
  initialState: {
    items: [],
    stats: {
      totalCampuses: 4,
      auCount: 3,
      svuCount: 1,
      totalEnrolled: 28450,
      totalIntake: 4400,
      academicDepartments: '7 Engg + Sciences',
    },
    selectedCampus: null,
    loading: false,
    statsLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    setSelectedCampus: (state, action) => {
      state.selectedCampus = action.payload;
    },
    clearSelectedCampus: (state) => {
      state.selectedCampus = null;
    },
    clearCampusMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Campuses
      .addCase(fetchCampuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampuses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCampuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Stats
      .addCase(fetchCampusStats.pending, (state) => {
        state.statsLoading = true;
      })
      .addCase(fetchCampusStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchCampusStats.rejected, (state) => {
        state.statsLoading = false;
      })
      // Add Campus
      .addCase(addCampus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCampus.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.successMessage = `Campus ${action.payload.name} (${action.payload.code}) successfully registered.`;
      })
      .addCase(addCampus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Campus
      .addCase(updateCampus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCampus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedCampus?._id === action.payload._id) {
          state.selectedCampus = action.payload;
        }
        state.successMessage = `Campus ${action.payload.name} successfully updated.`;
      })
      .addCase(updateCampus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Campus
      .addCase(deleteCampus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCampus.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((c) => c._id !== action.payload);
        if (state.selectedCampus?._id === action.payload) {
          state.selectedCampus = null;
        }
        state.successMessage = 'Campus successfully archived / inactivated.';
      })
      .addCase(deleteCampus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedCampus, clearSelectedCampus, clearCampusMessages } = campusSlice.actions;
export default campusSlice.reducer;
