import {
    createSlice
} from "@reduxjs/toolkit";
import { MENU_ITEMS, COLORS } from "@/components/constant";
import menuSlice from "./menuSlice";
const initialState = {
    [MENU_ITEMS.PENCIL]: {
        color: COLORS.BLACK,
        size: 3
    },
    [MENU_ITEMS.ERASER]: {
        color: COLORS.WHITE,
        size: 3
    },
    [MENU_ITEMS.UNDO]: {}, 
    [MENU_ITEMS.REDO]: {}, 
    [MENU_ITEMS.DOWNLOAD]: {}
}

export const toolboxSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        changeColor: (state, action) => {
            state[action.payload.item].color = action.payload.color
        },
        changeBruchSize: (state, action) => {
             state[action.payload.item].size = action.payload.size
        }
    }
})

export const { changeColor, changeBruchSize } = toolboxSlice.actions

export default toolboxSlice.reducer