import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    pickUpLocation: null,

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
    },

});

export const {setOrigin ,setDestination,  setTravelTimeInformation, setPickUpLocation} = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin

export const selectDestination = (state) => state.nav.destination

export const selectTravelTimeInformation = (state) => state.nav.travelTimeInformation

export const selectPickUpLocation = (state) => state.nav.pickUpLocation

const navReducer = navSlice.reducer

export default navReducer;
