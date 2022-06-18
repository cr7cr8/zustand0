import logo from './logo.svg';
import './App.css';
import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { computed } from 'zustand-middleware-computed-state'
import shallow from 'zustand/shallow'


import React, { memo, useEffect } from "react"

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




const useStore = create(subscribeWithSelector(

  (set, get, api) => ({
    bears: 100,
    bees: 3,
    fullName: 8888,
    obj: { a: "a", b: "b", c: "c", random: Math.random() },


    increasePopulation: () => {


      set((state) => ({ bears: state.bears + 1 }),false)
    //  set((state) => ({ ...state, bears: state.bears + 1 }), true)

    },
    removeAllBears: () => {


      set((state) => ({}), true)

    },
    setObj: () => {
      console.log("xxx")
      set((state) => {

        state.obj.e = Date.now()
        return { obj: { ...state.obj } }
      })
    }
  })))

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

function App() {

  // const fullName = useStore(state => state.fullName)
  // const obj = useStore(state => state.obj)
  // const setObj = useStore(state => state.setObj)
  //const increasePopulation = useStore(state => state.increasePopulation)

  const { fullName, obj, setObj, removeAllBears, increasePopulation } = useStore(({ fullName, obj, setObj, removeAllBears, increasePopulation }) =>
   ({ fullName, obj, setObj, removeAllBears, increasePopulation }), shallow)



  return (
    <div className="App">
      <h1>{fullName}</h1>
      <button onClick={function () {
       // increasePopulation()
          useStore.setState((preState) => { return { bears: preState.bears + 1 } },false)
        //removeAllBears()
      }}>+</button>
      {JSON.stringify(obj)}
      <button onClick={function () {
        setObj()

      }}>setObj</button>

      <SubCompo />
    </div>
  );
}

export default App;


const SubCompo = memo(function () {

  const computedCount = useStore(state => state.computedCount) // to avaoid rerendder when other prop in store updates

  useEffect(function () {
    console.log("subcompo =====")
  })

  return (
    <h1>{computedCount}</h1>
  )
})