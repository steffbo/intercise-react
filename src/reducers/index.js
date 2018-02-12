export default intervalReducer = (state, action) => {
    switch(action.type) {
        case "ADD_EXERCISE": {
            console.log(action.payload)
            return state
        }
    }
    return state
}