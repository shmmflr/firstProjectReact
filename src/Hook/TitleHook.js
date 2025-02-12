import {useEffect} from "react";

const useTitle = (title) => {
    useEffect(() => {

        document.title = `پنل کاربری | ${title}`

    });

}

export default useTitle;