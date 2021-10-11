import { createSlice } from '@reduxjs/toolkit'

export const stateSlice = createSlice({
  name: 'slice',
  initialState: {
    //Declaring a 'single source of truth' object which manage the derived states between elements
    //The objects stores the states in accordance of the 3 phases of the application:
    //1. Pre progress 2. In progress 3. post progress
    value: { 'allStore': {'Pre-Progress':{"message":"","btnStatus":true,"progress":0,"progressBar":"hidden","imageDisplay":"hidden","source":"","waitingStat":"hidden","currentFile":undefined,"selectedFiles":undefined},'In-Progress':{"btnStatus":true,"progressBar":"visible","source":"","waitingStat":"visible"},'Post-Progress':{"progressBar":"hidden","progress":100,"imageDisplay":"visible","waitingStat":"hidden","selectedFiles":undefined}}, "currentStore":{"message":"","btnStatus":true,"progress":0,"progressBar":"hidden","imageDisplay":"hidden","source":"","waitingStat":"hidden","currentFile":undefined,"selectedFiles":undefined}},
  },
  //There are two reducers:
  //1. updateValues: Receives a JSON file that contains a partial update of the general JSON object that stores under the state "allStore"
  //2. selectedStatusObject: Pulling out a specific phase from the general JSON object later on, the UI components will be using this data. 
  reducers: {
    updateValues: (state, action) => {
      let values = action.payload
      if (typeof values === 'object' && values !== null) {
        Object.entries(values).map(([status, value]) => {
          if (typeof value === 'object' && value !== null){
            Object.entries(value).map(([key, value]) => {
                state.value["allStore"][status.toString()][key.toString()]=value;
              
            });
          }
        });
      }
     
    },
    selectedStatusObject: (state, action) => {
      state.value["currentStore"]=state.value["allStore"][action.payload]
    },
  }
})

// Action creators are generated for each case reducer function
export const { setCurrentFile, updateValues ,selectedStatusObject} = stateSlice.actions

export default stateSlice.reducer