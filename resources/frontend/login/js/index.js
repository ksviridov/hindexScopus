;(() => {
    const fields = document.querySelectorAll('.js-form-item__field')
    const errorBlock = document.querySelector('.js-error')

    const closeErrorBlock = () => errorBlock.style.display = 'none'

    errorBlock.querySelector('.js-error__close').addEventListener('click', closeErrorBlock)

    const error = message => {
        errorBlock.style.display = 'flex'
        errorBlock.querySelector('.js-error__message').innerHTML = message
    }

    document.querySelector('.js-form__submit').addEventListener('click', () => {
        let data = {}

        closeErrorBlock()

        fields.forEach(item => data[item.name] = item.value)

        if (!Object.values(data).every(Boolean)) {
            error('Не все поля заполнены!')
        } else {
            axios.post('/login', data)
                .then()
                .catch(error)
        }
    })
})();