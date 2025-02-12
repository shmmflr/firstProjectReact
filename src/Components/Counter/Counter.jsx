import {useReducer} from "react";
import useTitle from "../../Hook/TitleHook.js";

const init = {
    count1: 0, count2: 1,
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'plus':
            return {
                ...state, count1: state.count1 + 1
            };
        case 'minus':
            return {
                ...state, count1: state.count1 - 1
            };
        case 'reset':
            return init;
        default:
            return state;

    }

}
const Counter = () => {
    const [count, dispatch] = useReducer(reducer, init);

    useTitle('شمارنده')
    return <>

        <div className='text-center'>
            <h1>
                این شمارنده من هستش!!
            </h1>

            <h1>{count.count1}</h1>
            <div>
                <button onClick={() => {
                    dispatch({type: 'plus'})
                }} className='btn btn-danger'>+1
                </button>
                <button onClick={() => {
                    dispatch({type: 'minus'})
                }} className='btn btn-warning mx-2 '>-1
                </button>
                <button onClick={() => {
                    dispatch({type: 'reset'})
                }} className='btn btn-success'>reset
                </button>
            </div>

        </div>

    </>

}
export default Counter;