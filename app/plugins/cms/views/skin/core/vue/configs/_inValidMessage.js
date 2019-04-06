/*--- custom config ---*/
let formInvalidMessages = {
    name: {
        required: 'Vui lòng nhập Name'
    },
    email: {
        required: 'Vui lòng nhập Email.',
        email: 'Email không hợp lệ.'
    },
    password: {
        required: 'Vui lòng nhập mật khẩu.',
        min: 'Mật khẩu quá ngắn.'
    },
    cfpassword: {
        required: 'Vui lòng nhập mật khẩu.',
        min: 'Mật khẩu quá ngắn.',
        confirmed: 'Mật khẩu không khớp'
    },
    message: {
        required: "Vui lòng nhập message"
    }
};

export default formInvalidMessages;