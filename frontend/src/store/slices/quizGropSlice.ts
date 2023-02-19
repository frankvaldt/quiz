import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IQuiz, IQuizGroup} from "../../api/quiz.interface";
import {getQuizGroupHttp} from "../../api/quiz.api";

export interface quizGrop {
    quizGrop: IQuizGroup[];
}

const initialState: quizGrop = {
    quizGrop: [] as IQuizGroup[]
}

export const getQuizGroupsFromRequest = createAsyncThunk('/getQuizGroupsFromRequest', async () => {
    const response = await getQuizGroupHttp();
    return response.data;
});

const quizGropSlice = createSlice({
    name: 'quizGrop',
    initialState,
    reducers: {
        setQuizGroups: (state, action: PayloadAction<IQuizGroup[]>) => {
            state.quizGrop = action.payload;
        },
        addQuizGroup: (state, action: PayloadAction<IQuizGroup>) => {
            state.quizGrop.push(action.payload);
        },
        removeQuizGroup: (state, action: PayloadAction<string>) => {
            state.quizGrop = state.quizGrop.filter(elem => elem.id !== action.payload);
        },
        changeQuizGroup: (state, action: PayloadAction<IQuizGroup>) => {
            const index = state.quizGrop.findIndex(elem => elem.id === action.payload.id);
            state.quizGrop.splice(index, 1, action.payload);
        },
        addQuestionToStart: (state, action: PayloadAction<{ id: string, quiz: IQuiz }>) => {
            const group = state.quizGrop.find(elem => elem.id === action.payload.id);
            if (!group) return;
            group.quiz.unshift(action.payload.quiz);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getQuizGroupsFromRequest.fulfilled, (state, action) => {
            state.quizGrop = action.payload;
        });
    },
})

export const {
    setQuizGroups,
    addQuizGroup,
    removeQuizGroup,
    changeQuizGroup,
    addQuestionToStart
} = quizGropSlice.actions;

export default quizGropSlice.reducer;