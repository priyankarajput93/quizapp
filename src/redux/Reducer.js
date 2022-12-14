import {createSlice} from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'appData',
  initialState: {
    userName: '',
    userPassword: '',
    level: 'easy',
    questionList: [],
    status: 'idle',
    error: 'error',
  },
  reducers: {
    addUserName: (state, action) => {
      state.userName = action.payload;
    },
    addUserPassword: (state, action) => {
      state.userPassword = action.payload;
    },
    gameLevel: (state, action) => {
      state.level = action.payload;
    },
    apiStatus: (state, action) => {
      state.status = action.payload;
    },
    errorValue: (state, action) => {
      state.error = action.payload;
    },
    setQuestionList: (state, action) => {
      state.questionList = action.payload;
    },
    clearData: (state, action) => {
      state.userName = '';
      state.userPassword = '';
      state.status = 'idle';
      state.error = '';
      state.questionList = [];
    },
  },
});

export const addUserName = appSlice.actions.addUserName;
export const addUserPassword = appSlice.actions.addUserPassword;
export const gameLevel = appSlice.actions.gameLevel;
export const setQuestionList = appSlice.actions.setQuestionList;
export const errorValue = appSlice.actions.errorValue;
export const apiStatus = appSlice.actions.apiStatus;
export const clearData = appSlice.actions.clearData;

export default appSlice.reducer;
