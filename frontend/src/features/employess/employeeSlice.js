import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import employeeService from './employeeService'

const initialState = {
  emloyees: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new employee
export const createEmployees = createAsyncThunk(
  'employees/create',
  async (employeeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await employeeService.createEmployees(employeeData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get employess
export const getEmployees = createAsyncThunk(
  'employees/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await employeeService.getEmployees(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete employees
export const deleteEmploees = createAsyncThunk(
  'employess/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await employeeService.deleteEmploees(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEmployees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createEmployees.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.emloyees.push(action.payload)
      })
      .addCase(createEmployees.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getEmployees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.emloyees = action.payload
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteEmploees.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteEmploees.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.emloyees = state.goals.filter(
          (employee) => employee._id !== action.payload.id
        )
      })
      .addCase(deleteEmploees.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = employeeSlice.actions
export default employeeSlice.reducer
