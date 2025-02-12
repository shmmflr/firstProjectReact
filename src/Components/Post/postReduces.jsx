export const init = {
    post: {
        id: '', userId: '', title: '', body: '',
    }, users: [],
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'getUsers':
            return {
                ...state, users: action.payload
            }

        case 'updatePost':
            return {
                ...state, post: action.payload
            };


        case 'getInputValue':
            return {
                ...state, post: {
                    ...state.post, [action.propName]: action.propValue
                }
            };


        default:
            return state;
    }
}