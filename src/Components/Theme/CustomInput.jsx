import ErrorMessageStyle from "./ErrorMessageStyle.jsx";

const CustomInput = ({field, form, meta,id,type='text',pl=null}) => {
    return <>

        <input type={type}
               className="form-control"
               id={id}
               placeholder={pl}
               {...field}
        />
        {/*{meta.error && meta.touched ?*/}
        {/*    <small className={' text-danger'}>{meta.error}</small> : null}*/}
        {meta.error && meta.touched ?
            <ErrorMessageStyle>
                {meta.error}
            </ErrorMessageStyle>
            : null}
    </>
}

export default CustomInput;