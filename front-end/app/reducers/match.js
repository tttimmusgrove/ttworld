export var matchReducer = (state = {}, action) => {
    switch(action.type) {
        case "START MATCH":
            return {}
        default:
            return state
    }
};
