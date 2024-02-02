import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 576,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    typography: {
        fontFamily: [
            "Roboto",
            "sans-serif",
            "Nunito",
            "Helvetica Neue",
            "Arial",
        ].join(",")
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#B74FD1',
        },
        secondary: {
            main: '#ff4f0d',
        },
        info: {
            main: '#fafafa',
        },
    },
});

export const darkTheme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 576,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    typography: {
        fontFamily: [
            "Roboto",
            "sans-serif",
            "Nunito",
            "Helvetica Neue",
            "Arial",
        ].join(",")
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#B74FD1',
        },
        secondary: {
            main: '#ff4f0d',
        },
        info: {
            main: '#fafafa',
        },
    },
});
