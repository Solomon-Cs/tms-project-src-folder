import { createSlice } from '@reduxjs/toolkit';


const FilterSlice = createSlice({
  name: 'filters',
  initialState: '',
  reducers: {
    setFilters: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFilters } = FilterSlice.actions;
export default FilterSlice.reducer;
 