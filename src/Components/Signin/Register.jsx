import {ErrorMessage, FastField, Field, FieldArray, Form, Formik} from "formik";
import * as Yup from "yup";
import ErrorMessageStyle from "../Theme/ErrorMessageStyle.jsx";
import CustomInput from "../Theme/CustomInput.jsx";
import CustomArrayField from "../Theme/CustomArrayField.jsx";
import {messageAlert} from "../../Until/Alert.js";
import InputController from "../FromElements/InputController.jsx";


const initialValues = {
    name: '', email: '', password: '', bio: '', address: {city: '', postalCode: ''}, phone: ['', ''], fav: [''],
}
const validationSchema = Yup.object({
    name: Yup.string().required('وارد کردن نام الزامی می باشد'),
    email: Yup.string().required('وارد کردن ایمیل الزامی می باشد').email('لطفا قالب ایمیل را درست وارد کنید:aaa@bbb.com'),
    bio: Yup.string().max(10, 'نمیتوانید بیش از 10 کلمه بنویسید'),
    password: Yup.string().required('وارد کردن پسورد الزامی می باشد').min(8, 'رمز عبور نباید کمتر از 8 کاراکتر باشد'),
    address: Yup.object({
        city: Yup.string().required('لطفا نام شهر خود را وارد کنید'),
        postalCode: Yup.string().required('لطفا شماره پلاک منزل خود را وارد کنید'),
    }),
    phone: Yup.array().of(Yup.string().required('الزامی است')),
    fav: Yup.array().of(Yup.string().required('اینم الزامی است'))
})

const onSubmit = (value, submitProps) => {
    setTimeout(() => {
        submitProps.setSubmitting(false);
        submitProps.resetForm();
        messageAlert('اطلاعات با موفقیت ثبت شد', 'success')
    }, 5000)
}
const Register = () => {

    // const formik = useFormik({
    //     initialValues: {
    //         name: '', email: '', password: ''
    //     }, validationSchema: Yup.object({
    //         name: Yup.string().required('وارد کردن نام الزامی می باشد'),
    //         email: Yup.string().required('وارد کردن ایمیل الزامی می باشد').email('لطفا قالب ایمیل را درست وارد کنید:aaa@bbb.com'),
    //         password: Yup.string().required('وارد کردن پسورد الزامی می باشد').min(8, 'رمز عبور نباید کمتر از 8 کاراکتر باشد'),
    //     }), onSubmit: values => {
    //         console.log(values)
    //     },
    //
    // });

    return (<Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        // validateOnBlur={false}
        // validateOnChange={false}
        validateOnMount
    >
        {formik => {
            console.log(formik)
            return < div className="p-5" style={{borderRadius: '10px', backgroundColor: 'antiquewhite'}}>
                <Form
                    className="needs-validation">
                    < div
                        className="form-row">
                        {/* <div className="col-md-6 mb-3 mx-auto">
                        <label htmlFor="name">نام نام خانوادگی</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="حسن خناری"
                               value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        />
                        {formik.errors.name && formik.touched.name ?
                            <p className={"text-danger"}>{formik.errors.name}</p> : null}
                    </div>*/}

                        <div className="col-md-6 mb-3 mx-auto">
                            <label htmlFor="name">نام نام خانوادگی</label>
                            <Field name="name">
                                {(props) => <CustomInput {...props} id={'name'} type={'text'}/>}
                            </Field>
                        </div>
                        <div className="col-md-6 mb-3 mx-auto">
                            <label htmlFor="validationCustomUsername">ایمیل</label>
                            <div className="input-group ">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="email">@</span>
                                </div>
                                <FastField type="email" className="form-control" id="email" name="email"
                                           placeholder="example@test.com"
                                />
                            </div>
                            <ErrorMessage name={'email'}>
                                {error => <small className={' text-danger'}>{error}</small>}
                            </ErrorMessage>
                        </div>
                        <div className="col-md-6 mb-3 mx-auto">
                            <label htmlFor="bio">بیوگرافی</label>
                            <FastField type="text" className="form-control" id="bio" name="bio" component='textarea'
                            />
                            <ErrorMessage name={'bio'} component={ErrorMessageStyle}/>
                        </div>
                        <div className="col-md-6 mb-3 mx-auto">
                            <label htmlFor="password">رمز عبور</label>
                            <FastField type="password" className="form-control" id="password" name="password"
                            />
                            <ErrorMessage name={'password'} component={ErrorMessageStyle}/>
                        </div>
                        <div className={'row d-flex justify-content-center'}>
                            <div className="col-md-3 mb-3 ">
                                <label htmlFor="city">شهر</label>
                                <FastField name="address.city"
                                >
                                    {(props) => <CustomInput {...props} id={'city'} type={'text'} pl={'ساری'}/>}
                                </FastField>
                            </div>
                            <div className="col-md-3 mb-3 ">
                                <label htmlFor="postalCode">کد پستی</label>
                                <FastField type="text" className="form-control" id="postalCode"
                                           name="address.postalCode"
                                />
                                <ErrorMessage name={'address.postalCode'} component={ErrorMessageStyle}/>
                            </div>
                        </div>
                        <div className={'row d-flex justify-content-center'}>
                            <div className="col-md-3 mb-3 ">
                                <label htmlFor="mobile">موبایل</label>
                                <FastField name="phone[0]"
                                >
                                    {(props) => <CustomInput {...props} id={'mobile'} type={'text'} pl={'09...'}/>}
                                </FastField>
                            </div>
                            <div className="col-md-3 mb-3 ">
                                <label htmlFor="tel">تلفن ثابت</label>
                                <FastField type="text" className="form-control" id="tel" name="phone[1]"
                                />
                                <ErrorMessage name={"phone[1]"} component={ErrorMessageStyle}/>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3 mx-auto">
                            <label htmlFor="fav">علایق</label>
                            <FieldArray type="text" className="form-control" id="fav" name="fav"
                            >
                                {(props) => <CustomArrayField {...props} />}
                            </FieldArray>
                        </div>

                        <div className="col-md-6 mb-3 mx-auto">
                            <button className="btn btn-primary w-100" type="submit"
                                    disabled={formik.isSubmitting || !formik.isValid}>
                                {formik.isSubmitting ? <>
                                    <span role="status">در حال ارسال...</span>
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"/>
                                </> : 'ثبت نام'}

                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        }}
    </Formik>)

}
export default Register;