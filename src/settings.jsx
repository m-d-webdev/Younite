import { createSlice } from "@reduxjs/toolkit";

// -----------------------------------


export const ThemSlice = createSlice({
    name: "theme",
    initialState: {
        currentTheme: localStorage.getItem('YouniteTheme') || "light",
    }, reducers: {

        changeTheme: (state) => {
            if (state.currentTheme == "light") {
                state.currentTheme = "dark";
                localStorage.setItem("YouniteTheme", "dark");
                document.body.classList.add("darkMode");
            } else {
                state.currentTheme = "light";
                localStorage.setItem("YouniteTheme", "light");
                document.body.classList.remove("darkMode");
            }
        },

        checkTheme: (state) => {
            if (state.currentTheme == "light") {
                document.body.classList.remove("darkMode");
            } else {
                document.body.classList.add("darkMode");
            }
        }
    }
});

export const { changeTheme, checkTheme } = ThemSlice.actions


//-----------------------------------