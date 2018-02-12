export function addExercise(name, duration) {
    return {
        type: "ADD_EXERCISE",
        payload: {
            name: name,
            duration: duration
        }
    }
}