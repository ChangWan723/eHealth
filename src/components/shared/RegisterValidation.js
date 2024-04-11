const nameRegex = /^.{1,50}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9._#]{8,}$/;
const postcodeRegex = /^[A-Z]{1,2}[0-9][0-9A-Z]? [0-9][A-Z]{2}$/i;

function isValidDate(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return false;
    }

    const today = new Date();
    return date < today;
}

function RegisterValidation(values) {
    let errorMessage = '';
    const nameRegex = /^.{1,50}$/;
    const addressRegex = /^.{1,300}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9._#]{8,}$/;
    const postcodeRegex = /^[A-Z]{1,2}[0-9][0-9A-Z]? [0-9][A-Z]{2}$/i;

    if (!(String(values.firstName).trim())) {
        errorMessage += '・First Name is required.\n';
    } else if (!nameRegex.test(String(values.firstName))) {
        errorMessage += '・First Name must not exceed 50 characters.\n';
    }

    if (!(String(values.lastName).trim())) {
        errorMessage += '・Last Name is required.\n';
    } else if (!nameRegex.test(String(values.lastName))) {
        errorMessage += '・Last Name must not exceed 50 characters.\n';
    }

    if (!(String(values.email).trim())) {
        errorMessage += '・Email is required.\n';
    } else if (!emailRegex.test(String(values.email))) {
        errorMessage += '・Invalid email format.\n';
    }

    if (!(String(values.postcode).trim())) {
        errorMessage += '・Postcode is required.\n';
    } else if (!postcodeRegex.test(String(values.postcode))) {
        errorMessage += '・Invalid postcode format.\n';
    }

    if (!(String(values.address).trim())) {
        errorMessage += '・Address is required.\n';
    } else if (!addressRegex.test(String(values.postcode))) {
        errorMessage += '・Address must not exceed 300 characters.\n';
    }

    if (!(String(values.birthday).trim())) {
        errorMessage += '・Birthday is required.\n';
    } else if (!isValidDate(String(values.birthday))) {
        errorMessage += '・Invalid birthday format or it must be earlier than today.\n';
    }

    if (!(String(values.gender).trim())) {
        errorMessage += '・Gender is required.\n';
    }

    return errorMessage;
}

export default RegisterValidation;
