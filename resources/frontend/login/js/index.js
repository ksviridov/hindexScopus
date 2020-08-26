;(() => {
    const fields = document.querySelectorAll('.js-login-form__item-field')

    const error = message => {
        new Noty({
            theme: 'relax',
            type: 'error',
            timeout: 2000,
            text: message,
        }).show();
    }

    document.querySelector('.js-login-form__submit').addEventListener('click', () => {
        let data = {}

        fields.forEach(item => data[item.name] = item.value)

        if (!Object.values(data).every(Boolean)) {
            error('Не все поля заполнены!')
        } else {
            axios.post('/login', data)
                .then()
                .catch(() => error('Ошибка авторизации'))
        }
    })
})();