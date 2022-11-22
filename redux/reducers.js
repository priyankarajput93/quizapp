import { createSlice } from "@reduxjs/toolkit";

const BASE_URL = 'https://opentdb.com/api.php';

/*export const getQuestionsList = createAsyncThunk("appData/getQuestionsList", async (count, level) => {
    //const { count, level } = params;
    const getCount = count;
    const getLevel = level;
    try {
        // const response = await fetch(BASE_URL + `?amount=${count}&difficulty=${level}`);
        const response = await fetch(BASE_URL + `?amount=10&difficulty=easy`);
        const json = await response.json();
     /*   json.map((object) => {
            console.log(object);
            //object["allAnswerOptions"] = object.incorrect_answers;
          //  object["allAnswerOptions"].push(object.correct_answer);
        });
        //console.log(json);
        return json;
    } catch (error) {
        console.log("error " + error);
        return error.message;
    }
})*/

const appSlice = createSlice({
    name: 'appData',
    initialState: {
        userName: '',
        userPassword: '',
        level: 'easy',
        questionList: [],
        status: 'idle',
        error: 'error'
    },
    reducers: {
        addUserName: (state, action) => {
            state.userName = (action.payload);
        },
        addUserPassword: (state, action) => {
            state.userPassword = (action.payload);
        },
        gameLevel: (state, action) => {
            state.level = (action.payload);
        },
        apiStatus: (state, action) => {
            state.status = (action.payload);
        },
        errorValue: (state, action) => {
            state.error = (action.payload);
        },
        setQuestionList: (state, action) => {
            state.questionList = (action.payload);
        },
        clearData: (state, action) => {
            state.userName = '';
            state.userPassword = '';
            state.status = 'idle';
            state.error = '';
            state.questionList = [];
        }
        /*extraReducers(builder) {
            builder
                .addCase(getQuestionsList.pending, (state, action) => {
                    state.status = "loading";
                    console.log("builder " + getQuestionsList.pending);
                    console.log("builder status " + state.status);
                })
                .addCase(getQuestionsList.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.questionList = (action.payload.results);
                    console.log("Question List results");
                   // console.log(state.questionList);
                    //console.log("builder request status " + action.meta.requestStatus);
                })
                .addCase(getQuestionsList.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message;
                })*/
    }
})

export const addUserName = appSlice.actions.addUserName;
export const addUserPassword = appSlice.actions.addUserPassword;
export const gameLevel = appSlice.actions.gameLevel;
export const setQuestionList = appSlice.actions.setQuestionList;
export const errorValue = appSlice.actions.errorValue;
export const apiStatus = appSlice.actions.apiStatus;
export const clearData = appSlice.actions.clearData;

/*
export const allQuestionList = (state) => state.appData.questionList;
export const getError = (state) => state.appData.error;
export const getStatus = (state) => state.appData.status;
*/
export default appSlice.reducer;