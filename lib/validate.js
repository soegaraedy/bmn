export default function login_validate(values){
    const errors={};

    if(!values.email){
        errors.email='Required';

    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email='Invalid email address';
    }

    //validation for password
    if(!values.password){
        errors.password="Required";

    }else if(values.password.length<8 || values.password > 20){
        errors.password="Must be greater than 8 and less than 20 characters long";
    }else if(values.password.includes(" ")){
        errors.email="Invalid Password";
    }

    return errors;
}

export function registerBmnValidate(values){
    const errors={};


    return errors;
}


export function registerValidate(values){
    const errors={};

    if(!values.username){
        errors.username="Required"
    }else if(values.username.includes(" ")){
        errors.username="Invalid User"
    }

    //validate email
    if(!values.email){
        errors.email='Required';

    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email='Invalid email address';
    }

    //validation for password
    if(!values.password){
        errors.password="Required";

    }else if(values.password.length<8 || values.password > 20){
        errors.password="Must be greater than 8 and less than 20 characters long";
    }else if(values.password.includes(" ")){
        errors.email="Invalid Password";
    }

    //validate confirm password
    if(!values.cpassword){
        errors.cpassword="Required"
    }else if(values.password!==values.cpassword){
        errors.cpassword="Password Not Match"
    
    }else if(values.password.includes(" ")){
        errors.cpassword="Invalid Confirm Password"
    }

    return errors;
}