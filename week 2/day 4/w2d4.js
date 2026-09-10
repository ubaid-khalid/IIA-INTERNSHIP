// script.js — function declarations, expressions, parameters, custom messages

// ----- function declaration (hoisted) -----
function validateField(value, type, customMessage) {
  // parameters: value (string), type (string), customMessage (string)
  // returns: { valid: boolean, message: string }
  let isValid = false;
  let message = '';

  switch (type) {
    case 'name':
      isValid = value.trim().length >= 2 && /^[a-zA-Z\s\-']+$/.test(value.trim());
      message = isValid ? '' : (customMessage || 'Please enter a valid name (letters, spaces, hyphens).');
      break;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value.trim());
      message = isValid ? '' : (customMessage || 'Enter a valid email address (e.g., name@domain.com).');
      break;
    case 'password':
      isValid = value.length >= 8;
      message = isValid ? '' : (customMessage || 'Password must be at least 8 characters.');
      break;
    case 'confirm':
      // confirm is handled separately; we'll pass a custom message directly
      isValid = value.length >= 8; // basic length check, but we use it for confirm field too
      message = isValid ? '' : (customMessage || 'Password confirmation is required.');
      break;
    case 'terms':
      isValid = value === true || value === 'checked';
      message = isValid ? '' : (customMessage || 'You must agree to the terms to continue.');
      break;
    default:
      isValid = true;
      message = '';
  }
  return { valid: isValid, message };
}

// ----- function expression (arrow) for reusability -----
const setFieldError = (fieldId, errorMsg, isError) => {
  // parameters: fieldId (string), errorMsg (string), isError (boolean)
  const errorSpan = document.getElementById(fieldId);
  const input = document.getElementById(fieldId.replace('Error', ''));

  if (errorSpan) {
    errorSpan.textContent = isError ? errorMsg : '';
  }
  if (input) {
    if (isError) {
      input.classList.add('error-input');
    } else {
      input.classList.remove('error-input');
    }
  }
};

// ----- main validation function (declaration) -----
function validateSignupForm(event) {
  event.preventDefault(); // prevent default form submission

  // get values
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const termsChecked = document.getElementById('termsCheck').checked;

  // custom validation messages (for demonstration)
  const nameMsg = 'Full name must be at least 2 letters and contain only letters, spaces, hyphens.';
  const emailMsg = 'Please provide a valid email (e.g., user@domain.com).';
  const passMsg = 'Password requires minimum 8 characters.';
  const confirmMsg = 'Passwords do not match.';
  const termsMsg = 'Please accept the terms of service.';

  // 1. validate each field using the function (passing custom messages)
  const nameResult = validateField(fullName, 'name', nameMsg);
  const emailResult = validateField(email, 'email', emailMsg);
  const passResult = validateField(password, 'password', passMsg);
  
  // confirm password: check both length and match (custom logic)
  let confirmResult = { valid: false, message: '' };
  if (password.length >= 8 && confirmPassword.length >= 8) {
    if (password === confirmPassword) {
      confirmResult = { valid: true, message: '' };
    } else {
      confirmResult = { valid: false, message: confirmMsg };
    }
  } else if (confirmPassword.length > 0 && confirmPassword.length < 8) {
    confirmResult = { valid: false, message: 'Confirmation must be at least 8 characters.' };
  } else if (confirmPassword.length === 0) {
    confirmResult = { valid: false, message: 'Please confirm your password.' };
  } else {
    // if password itself is invalid, we still check confirm but we'll show both errors.
    // but we keep it consistent: if password is short, we don't require match? we'll handle gracefully.
    if (password !== confirmPassword && confirmPassword.length > 0) {
      confirmResult = { valid: false, message: confirmMsg };
    } else if (confirmPassword.length === 0) {
      confirmResult = { valid: false, message: 'Confirm your password.' };
    } else {
      confirmResult = { valid: false, message: 'Password must be at least 8 characters.' };
    }
  }
  
  // terms validation
  const termsResult = validateField(termsChecked, 'terms', termsMsg);

  // 2. display errors via function expression
  setFieldError('fullNameError', nameResult.message, !nameResult.valid);
  setFieldError('emailError', emailResult.message, !emailResult.valid);
  setFieldError('passwordError', passResult.message, !passResult.valid);
  setFieldError('confirmError', confirmResult.message, !confirmResult.valid);
  setFieldError('termsError', termsResult.message, !termsResult.valid);

  // 3. overall validity
  const isValid = nameResult.valid && emailResult.valid && passResult.valid && confirmResult.valid && termsResult.valid;

  const statusDiv = document.getElementById('formStatus');
  if (isValid) {
    statusDiv.className = 'form-status success';
    statusDiv.textContent = '✅ Account created! Welcome aboard.';
    // you could reset form or redirect, but we keep it clean.
    // (in production you'd send data to server)
  } else {
    statusDiv.className = 'form-status error';
    statusDiv.textContent = '⚠️ Please fix the highlighted fields.';
  }

  // return the validity (for any additional handling)
  return isValid;
}

// ----- attach event listener (function expression) -----
const form = document.getElementById('signupForm');
// using function expression as callback (arguments: event)
form.addEventListener('submit', function(event) {
  // call the main validation function
  const valid = validateSignupForm(event);
  // you could return or log the result
  console.log('Form valid?', valid);
});

// ----- bonus: live validation on blur (to show understanding) -----
// using function expression with parameters
const handleBlur = (fieldId, type, customMsg) => {
  const input = document.getElementById(fieldId);
  if (!input) return;
  input.addEventListener('blur', function() {
    let value = input.value;
    if (type === 'terms') {
      // terms handled separately via checkbox change
      return;
    }
    const result = validateField(value, type, customMsg);
    const errorId = fieldId + 'Error';
    setFieldError(errorId, result.message, !result.valid);
  });
};

// apply blur validation (except terms)
handleBlur('fullName', 'name', 'Please enter a valid name (letters, spaces, hyphens).');
handleBlur('email', 'email', 'Enter a valid email address.');
handleBlur('password', 'password', 'Password must be at least 8 characters.');
handleBlur('confirmPassword', 'confirm', 'Confirm password (min 8 chars).');

// terms checkbox real-time validation
document.getElementById('termsCheck').addEventListener('change', function(e) {
  const checked = e.target.checked;
  const result = validateField(checked, 'terms', 'You must agree to the terms.');
  setFieldError('termsError', result.message, !result.valid);
});

// additional: reset error styling on focus (user-friendly)
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('focus', function() {
    this.classList.remove('error-input');
    const errorId = this.id + 'Error';
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) errorSpan.textContent = '';
    // also remove global status if needed
    const statusDiv = document.getElementById('formStatus');
    if (statusDiv) {
      statusDiv.className = 'form-status';
      statusDiv.textContent = '✏️ Fill in the fields.';
    }
  });
});