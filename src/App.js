/** @jsxRuntime classic */
/** @jsx jsx */
import logo from './logo.svg';
import './App.css';
import create from 'zustand'
import { subscribeWithSelector, devtools } from 'zustand/middleware'
import { computed } from 'zustand-middleware-computed-state'
import shallow from 'zustand/shallow'

import ThemeContextProvider from "./ThemeStore"
import { Button, CssBaseline, Switch, Typography } from '@mui/material';


import { ThemeProvider, useTheme, createTheme, experimental_sx as sx } from '@mui/material/styles';
import React, { useState, memo, useEffect } from "react"

import { createContext, useContextSelector } from 'use-context-selector';
///** @jsx jsx */ import { jsx } from '@emotion/core'
import { css ,jsx} from'@emotion/react/macro'



const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log('  applying', args)
      set(...args)
      console.log('  new state', get())
    },
    get,
    api
  )




const useStore = create(devtools(subscribeWithSelector(

  (set, get, api) => ({
    bears: 100,
    bees: 3,
    fullName: 8888,
    obj: { a: "a", b: "b", c: "c", random: Math.random() },




    increasePopulation: () => {


      set((state) => ({ bears: state.bears + 1 }), false)
      //  set((state) => ({ ...state, bears: state.bears + 1 }), true)

    },
    removeAllBears: () => {


      set((state) => ({}), true)

    },
    setObj: () => {

      set((state) => {

        state.obj.e = Date.now()
        return { obj: { ...state.obj } }
      })
    }
  }))))

const unsub4 = useStore.subscribe(
  (state) => [state.bears, state.bees],
  ([bears, bees], [preBears, preBees]) => {
    useStore.setState((state) => ({ fullName: state.bears + state.bees }))

  },
  { equalityFn: shallow, fireImmediately: true }
)

console.log(useStore.getState())
// const unsubscribe = useStore.subscribe((newValue, oldValue) => {
//   console.log(
//     "new Value " + JSON.stringify(newValue) + ", old Value:" + JSON.stringify(oldValue)
//   );
// });


const Context = createContext()
const ContextProvider = ({ children }) => {

  const [state1, setState1] = useState(1)
  const [state2, setState2] = useState(2)

  return (
    <Context.Provider value={{ state1, setState1, state2, setState2 }}>
      {children}


      <div
        css={{
          backgroundColor: 'hotpink',
          '&:hover': {
            color: 'lightgreen',
            backgroundColor:"gray",
          }
        }}
      >
        This has a hotpink background.
      </div>

<Button sx={{backgroundColor:"yellow"}}>TEST</Button>
    </Context.Provider>
  )

}

function App() {


  // const fullName = useStore(state => state.fullName)
  // const obj = useStore(state => state.obj)
  // const setObj = useStore(state => state.setObj)
  //const increasePopulation = useStore(state => state.increasePopulation)

  const { fullName, obj, setObj, removeAllBears, increasePopulation } = useStore(({ fullName, obj, setObj, removeAllBears, increasePopulation }) =>
    ({ fullName, obj, setObj, removeAllBears, increasePopulation }), shallow)




  return (
    <ContextProvider>
      <div className="App">


        <ThemeContextProvider>

          <Compo />
          <Button onClick={function () {


          }}>aaa</Button></ThemeContextProvider>

        <h1>{fullName}</h1>
        <button onClick={function () {
          // increasePopulation()
          useStore.setState((preState) => { return { bears: preState.bears + 1 } }, false)
          //removeAllBears()
        }}>+</button>
        {JSON.stringify(obj)}
        <button onClick={function () {
          setObj()

        }}>setObj</button>

        <SubCompo />
      </div>
    </ContextProvider>
  );
}

export default App;


const SubCompo = memo(function () {

  const computedCount = useStore(state => state.computedCount) // to avaoid rerendder when other prop in store updates


  //Cannot use de-structor or de-array to acheive partial update
  //const { state1, setState1 } = useContextSelector(Context, (state) => ({ state1:state.state1, setState1:state.setState1 }));
  const state1 = useContextSelector(Context, (state) => (state.state1));
  const setState1 = useContextSelector(Context, (state) => (state.setState1));


  const { bees } = useStore(({ bees }) =>
    ({ bees }), shallow)

  useEffect(function () {
    console.log("subcompo =====")
  })

  return (
    <div style={{ background: "lightblue" }}>
      <h1>computedCount {computedCount}</h1>
      <h3>state1 {state1}</h3>
      <h4>bees {bees}</h4>
      <button onClick={function () {
        setState1(pre => pre + 1)
      }}>state1</button>
    </div>
  )
})


const Compo = memo(function () {

  const natureTheme = useTheme()

  const { bears } = useStore(({ bears }) =>
    ({ bears }), shallow)
  const state2 = useContextSelector(Context, (state) => (state.state2));
  const setState2 = useContextSelector(Context, (state) => (state.setState2));

  useEffect(function () {
    console.log("compo =====")
  })


  return <div style={{ background: "lightyellow" }}>
    <Button onClick={function () {
      natureTheme.toggleMode()
    }}>natureTheme</Button>

    <h3>state2 {state2}</h3>
    <h4>bears {bears}</h4>
    <button onClick={function () {
      setState2(pre => pre + 1)
    }}>state2</button>
  </div>
})