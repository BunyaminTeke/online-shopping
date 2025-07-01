import React from 'react'



function InputField() {
    return (
        <div className="input-field">

            <input className='input-style' type="text" placeholder="username" />

            <input className='input-style' type="password" placeholder="password" />

            <input className='button-style' value="Giriş Yap" type="submit" />
            <p>Hesabınız yok mu? <a href='/register' className='register-link'>Kayıt Ol</a></p>

        </div>
    )
}

export default InputField