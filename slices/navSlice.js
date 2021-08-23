import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    pickUpLocation: null,
    docID: null,

}

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload;
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload;
        },
        setPickUpLocation: (state, action) => {
            state.pickUpLocation = action.payload;
        },
        setDocID: (state, action) => {
            state.docID = action.payload;
        },
        
    },

});

export const {setOrigin ,setDestination,  setTravelTimeInformation, setPickUpLocation, setDocID} = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin

export const selectDestination = (state) => state.nav.destination

export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation

export const selectPickUpLocation = (state) => state.nav.pickUpLocation

export const selectDocID = (state) => state.nav.docID

const navReducer = navSlice.reducer

export default navReducer;
