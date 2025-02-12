import {useEffect, useState} from "react";
import {getPostsService, deletePostService} from "../../Services/PostService.js";
import {confirmAlert} from "../../Until/Alert.js";
import {useNavigate} from "react-router-dom";
import useTitle from "../../Hook/TitleHook.js";

const Blogs = () => {
    const navigation = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPostsService(setPosts);
    }, [])

    const handleDeletePost = (id) => {
        return confirmAlert(`آیا برای حذف پست ${id} اطمینان دارید؟`, 'بله، حذف شود!')
            .then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    deletePostService(posts, setPosts, id);
                }
            });
    };

    useTitle("مقالات")

    return (<>
        <section className="intro mt-2">
            <div className="gradient-custom-2 h-100">
                <div className="mask d-flex align-items-center h-100">
                    <div className="container">
                        <div className='d-flex justify-content-between mb-3'>
                            <p>لیست مقالات</p>
                            <button className='btn btn-success'
                                    onClick={() => {
                                        navigation('/blog')
                                    }}
                            >
                                <i className='fa fa-plus'></i>
                            </button>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-12">
                                {posts.length ? (<div className="table-responsive">
                                    <table className="table table-dark table-bordered mb-0">
                                        <thead>
                                        <tr>
                                            <th scope="col">ردیف</th>
                                            <th scope="col">نویسنده</th>
                                            <th scope="col">عنوان</th>
                                            <th scope="col">محتوا</th>
                                            <th scope="col">عملیات</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {posts.map((post, index) => <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{post.userId}</td>
                                            <td>{post.title}</td>
                                            <td>{post.body}</td>
                                            <td>
                            <span>
                              <button className="btn btn-warning"
                                      onClick={() => navigation(`/blog/edit/${post.id}`)}>
                                <i className="fa fa-expeditedssl"></i>
                              </button>
                              <button className="btn btn-danger mx-2"
                                      onClick={() => {
                                          handleDeletePost(post.id)
                                      }}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </span>
                                            </td>
                                        </tr>)}

                                        </tbody>
                                    </table>
                                </div>) : (<p className="text-center alert alert-danger">
                                    اطلاعاتی دریافت نشد!!!!
                                </p>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}
export default Blogs;
