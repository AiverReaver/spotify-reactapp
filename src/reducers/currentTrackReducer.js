export default (state = [], action) => {
    if (action.type === 'FETCH_CURRENT_TRACK') {
        return action.payload;
    }

    return state;
};
