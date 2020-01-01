const initialState = {
    counter: 100,
    results: []
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + 1
            }
        case 'ADD':
            return {
                ...state,
                counter: state.counter + action.val
            }
        case 'SUBTRACT':
            return {
                ...state,
                counter: state.counter - action.val
            }
        case 'DECREMENT':
            return {
                ...state,
                counter: state.counter - 1
            }
        case 'STORE_RESULT':
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.result})
            }
        case 'DELETE_RESULT':
            //need to create a copy of the results array and removed the element identifie

            const updatedArray = state.results.filter(result => result.id !== action.resultEleId);
            return {
                ...state,
                results: updatedArray
            }
    }
    return state;
};

export default reducer;