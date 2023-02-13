import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IQuizApi, IQuizGroup} from "../../api/quiz.api";

export interface quizGrop {
    quizGrop: IQuizGroup[];
}

const initialState: quizGrop = {
    quizGrop: [] as IQuizGroup[]
}

export const getQuizGroupsFromRequest = createAsyncThunk('/getQuizGroupsFromRequest', async () => {

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
        changeTitleQuizGroup: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const {id, title} = action.payload;
            const group = state.quizGrop.find(elem => elem.id === id);
            if (!group) return;
            group.title = title;
        },
        removeQuizGroup: (state, action: PayloadAction<string>) => {
            state.quizGrop = state.quizGrop.filter(elem => elem.id !== action.payload);
        },
        changeQuizGroup: (state, action: PayloadAction<IQuizGroup>) => {
            const index = state.quizGrop.findIndex(elem => elem.id === action.payload.id);
            state.quizGrop.splice(index, 1, action.payload);
        },
        changeAllQuiz: (state, action: PayloadAction<{ id: string, quiz: IQuizApi[] }>) => {
            const group = state.quizGrop.find(elem => elem.id === action.payload.id);
            if (!group) return;
            group.quiz = action.payload.quiz;
        },
        changeOneQuiz: (state, action: PayloadAction<{ id: string, quiz: IQuizApi }>) => {
            const group = state.quizGrop.find(elem => elem.id === action.payload.id);
            if (!group) return;
            const index = group.quiz.findIndex(elem => elem.id === action.payload.quiz.id);
            group.quiz.splice(index, 1, action.payload.quiz);
        },
        deleteQuiz: (state, action: PayloadAction<{ id: string, idQuiz: string }>) => {
            const {id, idQuiz} = action.payload;
            const group = state.quizGrop.find(elem => elem.id === id);
            if (!group) return;
            const index = group.quiz.findIndex(elem => elem.id === idQuiz);
            index !== -1 && group.quiz.splice(index, 1);
        },
        changeQuestion: (state, action: PayloadAction<{ id: string, idQuiz: string, text: string }>) => {
            const {id, idQuiz, text} = action.payload;
            const group = state.quizGrop.find(elem => elem.id === id);
            if (!group) return;
            const question = group.quiz.find(elem => elem.id === idQuiz);
            if (!question) return;
            question.question = text;
        }
    }
})

export const {
    setQuizGroups,
    changeTitleQuizGroup,
    addQuizGroup,
    removeQuizGroup,
    changeAllQuiz,
    changeOneQuiz,
    deleteQuiz,
    changeQuizGroup,
    changeQuestion
} = quizGropSlice.actions;

export default quizGropSlice.reducer;