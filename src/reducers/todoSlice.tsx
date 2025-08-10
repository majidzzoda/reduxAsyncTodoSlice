import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const api = "https://680167ea81c7e9fbcc427768.mockapi.io/tableUsers"
export const GetData = createAsyncThunk("todos/GetData", async () => {
    try {
        const { data } = await axios.get(api);
        return data;
    } catch (error) {
        console.error(error);
    }
})

export const DeleteData = createAsyncThunk("todos/DeleteData", async (id) => {
    try {
        await axios.delete(`${api}/${id}`);
        return id;
    } catch (error) {
        console.error(error);
    }
})
export const EditData = createAsyncThunk("todos/EditData", async ({ id, name }) => {
    try {
        const { data } = await axios.put(`${api}/${id}`, { name });
        return data;
    } catch (error) {
        console.error(error);
    }
})
export const AddData = createAsyncThunk("todos/AddData", async ({ name }) => {
    try {
        const { data } = await axios.post(api, { name });
        return data;
    } catch (error) {
        console.error(error);
    }
})

const TodoSlice = createSlice({
    name: "todos",
    initialState: {
        data: [],
        loading: false,
        error: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetData.pending, (state) => {
            state.loading = true;
        })
            .addCase(GetData.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload
            })
            .addCase(GetData.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(DeleteData.fulfilled, (state, { payload }) => {
                state.data = state.data.filter((e) => e.id != payload)
            })
            .addCase(DeleteData.rejected, (state, action) => {
                state.error == action.payload || "Error!"
            })
            .addCase(EditData.fulfilled, (state, action) => {
                const user = state.data.find((e) => e.id == action.payload.id);
                if (user) {
                    user.name = action.payload.name;
                }
            })  
            .addCase(AddData.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
    }
})

export default TodoSlice.reducer;