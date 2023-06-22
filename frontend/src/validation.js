export function validateUsername(username) {


    const   VALID_CHARACTERS  = /^[a-zA-Z0-9]+$/.test(username);                // проверка на соответсвующие символы
    const   NOT_NULL          = (username !== ''),                                // проверка на пустое значение
            VALID_LENGTH      = username.length > 3 || username.length < 20;    // проверка на соответствие длины


    // результат валидации
    return (VALID_CHARACTERS && NOT_NULL && VALID_LENGTH);
}

export function validatePasswordAuth(password) {
    

    const   VALID_LENGTH    = password.length >= 8;     // проверка на соответствие длины 
    
    // Возвращаем результат валидации
    return VALID_LENGTH;
}

export function validatePassword(password) {
    

    const   VALID_LENGTH    = password.length >= 8,     // проверка на соответствие длины 
            HAS_UPPERCASE   = /[A-Z]/.test(password),   // имеет хотя б одну прописную букву
            HAS_LOWERCASE   = /[a-z]/.test(password),   // имеет хотя б одну строчную букву
            HAS_NUMBER      = /\d/.test(password);      // имеет хотя б одну цифру
    
    // Возвращаем результат валидации
    return (
      VALID_LENGTH &&
      HAS_UPPERCASE &&
      HAS_LOWERCASE &&
      HAS_NUMBER
    );
}

export function validateEmail(email) {
    
    const VALID_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);   // проверка на совпадение символов
    
    // возвращает результат
    return VALID_REGEX;
}

export function validateField(checkboxCheckedCount) {

    const VALID_COUNT = checkboxCheckedCount >= 3;  // проверка на совпадение количества выбранных
  
    return VALID_COUNT;
}

export function validatePasswordConfirmation(password, confirmPassword) {
    return password === confirmPassword;
}
  