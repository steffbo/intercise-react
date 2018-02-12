import { createStore } from "redux"
// import intervalReducer from "./reducers"

const initialState = {
    users: [
        {
            id: 1,
            name: "stefan"
        }
    ],
    intervals: [
        {
            id: 1,
            userid: 1,
            items: [
                {
                    id: 0,
                    isBreak: false,
                    name: "Burpees",
                    duration: "60"
                },
                {
                    id: 1,
                    isBreak: true,
                    name: "Break",
                    duration: "20"
                }
            ]
        }
    ]
}

const intervalReducer = (state = initialState, action) => {

    console.log("new action: " + action.type)
    console.log("payload: " + action.payload)

    switch (action.type) {

        case "ADD_USER":
        case "ADD_EXERCISE":
        case "REMOVE_EXERCISE":
        default: {
            return state
        }
    }
}

export default createStore(intervalReducer)