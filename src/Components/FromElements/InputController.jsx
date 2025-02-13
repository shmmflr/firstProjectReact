const InputController = (props) => {
    switch (props.type) {
        case 'input':
            return 1;
        case 'textarea':
            return 2;
        default:
            return 3;

    }
}

export default InputController;