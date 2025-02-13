const ErrorMessageStyle = ({children}) => {
    return <>
        <small className={' text-danger'} style={{fontSize: '12px'}}>
            {children}
        </small>
    </>
}

export default ErrorMessageStyle;