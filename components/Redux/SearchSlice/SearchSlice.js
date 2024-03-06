import { createSlice } from '@reduxjs/toolkit';


const SearchSlice = createSlice({
  name: 'search',
  initialState: '',
  reducers: {
    setSearch: (state, action) => {
      return action.payload;
    },

  },
});

export const { setSearch } = SearchSlice.actions;
export default SearchSlice.reducer;
 