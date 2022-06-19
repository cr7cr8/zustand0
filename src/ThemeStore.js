import create from "zustand"
import { subscribeWithSelector, devtools } from 'zustand/middleware'
import shallow from 'zustand/shallow'


import { ThemeProvider, useTheme, createTheme, experimental_sx as sx } from '@mui/material/styles';
import { Typography } from "@mui/material";

const useStore = create(subscribeWithSelector(

    (set, get, api) => ({
        mode: "light",
        fontSize: 5,
        // get theme() {
        //     return {

        //     }
        // }
    })))

useStore.subscribe(
    (state) => [state.mode, state.fontSize],
    ([mode, fontSize], [preMode, preFontSize]) => {
        useStore.setState((state) => ({
            theme:

                //    console.log("=========", state.fontSize)
                createTheme({

                    typography: {
                        fontSize: state.fontSize === 5 ? 10 : 5,
                        button: {
                            //    textTransform: self.mode==="light"?"none":"capitalize"
                            backgroundColor: state.mode === "light" ? "pink" : "lightgreen"

                        },
                    },
                    toggleMode: function () {
                        console.log("tototototototototoo")
                        useStore.setState(statea => mode === "dark" ? statea.mode = "light" : statea.mode = "dark")
                    }
                })

        }))

    },
    { equalityFn: shallow, fireImmediately: true }

)



// useStore.subscribe(
//     (state) => [state.mode],
//     ([mode], [preMode]) => {
//         useStore.setState((state) => ({
//             get theme() {

//                 console.log("=========", state.mode)
//                 return createTheme({
//                     typography: {
//                         button: {
//                             //    textTransform: self.mode==="light"?"none":"capitalize"
//                             backgroundColor: state.mode === "light" ? "pink" : "lightgreen"
//                         }
//                     },
//                 })
//             }
//         }))

//     },
//     { equalityFn: shallow, fireImmediately: true }

// )




function ThemeContextProvider(props) {


    const mode = useStore(state => state.mode)
    const fontSize = useStore(state => state.fontSize)
    const theme = useStore(state => state.theme)

    return (
        <ThemeProvider theme={theme}> {props.children}
            <Typography>{mode}</Typography>

            <button onClick={function () {

                // useStore.setState(state => (state.mode = state.mode === "light" ? "dark" : "light"))
                theme.toggleMode()
                console.log(mode, theme)

            }}>change Mode</button>

            <button onClick={function () {

                useStore.setState(state => (state.fontSize = state.fontSize === 5 ? 10 : 5))
                console.log(fontSize, theme)

            }}>font Size</button>

        </ThemeProvider>
    )
}


export default ThemeContextProvider