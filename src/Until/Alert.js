import Swal from "sweetalert2";

export const confirmAlert = (message, textBtn) => {
    return Swal.fire({
        title: message,
        showCancelButton: true,
        cancelButtonText: 'انصراف',
        confirmButtonText: textBtn,
        confirmButtonColor: 'red'
    });
};

export const messageAlert = (message, icon, /*textBtn*/) => {
    return Swal.fire({
        title: message,
        icon: icon,
        confirmButtonText: 'بستن',
    });
};