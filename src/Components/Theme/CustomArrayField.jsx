import {ErrorMessage, Field,} from "formik";
import ErrorMessageStyle from "./ErrorMessageStyle.jsx";

const CustomArrayField = (props) => {
    const {form, push, remove} = props;
    const {fav} = form.values;
    return <>
        <i className={'fa fa-plus-circle text-success '} style={{cursor: 'pointer'}} onClick={() => push('')}></i>
        {fav.map((f, index) => (<div key={index} >
            <div className={'d-flex align-items-center'}>
                <Field type="text" className="form-control mt-1" id={`fav[${index}]`} name={`fav[${index}]`}/>
                {fav.length > 1 ?
                    <i className={'fa fa-minus-circle pointer text-danger '}
                       style={{position: 'absolute', left: '385px', cursor: 'pointer'}}
                       onClick={() => remove('')}></i> : null}
            </div>
            <ErrorMessage name={`fav[${index}]`} component={ErrorMessageStyle}/>
        </div>))}
    </>
}

export default CustomArrayField;