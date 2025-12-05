import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    creatorCourseData: [],
    courseData: [],
    SelectedCourseData: null,
  },
  reducers: {
    setCreatorCourseData: (state, action) => {
      state.creatorCourseData = action.payload;
    },
    setCourseData: (state, action) => {
      state.courseData = action.payload;
    },
    setSelectedCourseData: (state, action) => {
      state.SelectedCourseData = action.payload;
    },
  },
});

export const { setCreatorCourseData, setCourseData, setSelectedCourseData } =
  courseSlice.actions;
export default courseSlice.reducer;