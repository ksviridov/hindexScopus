;(() => {
    const fields = document.querySelectorAll('.js-login-form__item-field')
    const requiredFields = document.querySelectorAll('.js-form-require')

    const error = (message, configs) => {
        new Noty(Object.assign({
            theme: 'relax',
            type: 'error',
            timeout: 2000,
            text: message
        }, configs || {})).show();
    }

    const checkRequiredFields = () => {
        const emptyFields = []

        requiredFields.forEach(field => !field.value && emptyFields.push(field.dataset.name))

        if(emptyFields.length) {
            error(`Обязательные поля: ${emptyFields.join(', ')} не заполнены!`, { timeout: 4000 });
        }

        return !emptyFields.length
    }

    document.querySelector('.js-register-form__submit').addEventListener('click', () => {
        if (!checkRequiredFields()) {
            return
        }

        let data = {}

        fields.forEach(item => data[item.name] = item.value)

        axios.post('/api/register', data)
            .then()
            .catch(() => error('Ошибка авторизации'))
    })
})();
