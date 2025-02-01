
// Swiper init
const swiper = new Swiper('.swiper', {
    effect: 'fade',
    loop: true,
    navigation: {
        nextEl: '.gallery__right',
        prevEl: '.gallery__left',
    },
})


const TELEGRAM_CHATID = ''
const TELEGRAM_TOKEN = ''

const sendTg = (name, number) => {
    let msg = '<b>Новая заявка:</b><br>'
    msg += name ? `<b>ФИО</b>: ${name}<br>` : ``
    msg += number ? `<b>Номер</b>: ${number}<br>` : ``
    fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHATID}&text=${msg.replace(/<br>/g, '%0A')}&parse_mode=HTML`)
}

const toggleOpen = () => {
    const quizBlocks = document.querySelectorAll('.modal-req__block')
    quizBlocks.forEach(el => el.classList.toggle('open'))
}

const reqForm = document.getElementById('modal-req-form')
const reqName = document.getElementById('modal-req-name')
const reqNumber = document.getElementById('modal-req-number')

reqName.addEventListener('input', e => {
    reqName.classList.remove('error')
})
reqNumber.addEventListener('input', e => {
    reqNumber.classList.remove('error')
})

const onFormSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const name = data.get('name')
    const number = data.get('number')
    if (name.length < 3 || number.length < 3 ) {
        if (name.length < 3) {
            reqName.classList.add('error')
        }
        if (number.length < 3) {
            reqNumber.classList.add('error')
        }
        return false
    }
    console.log(`Name: ${name}`)
    console.log(`Number: ${number}`)
    // sendTg(name, number)
    toggleOpen()
}
reqForm.addEventListener('submit', onFormSubmit)

const modalReq = document.getElementById('modal-req')
const modalReqClose = document.getElementById('modal-req-close')
modalReqClose.addEventListener('click', e => {
    modalReq.classList.remove('open')
})

//modal-req open handling
{
    const problemReqBtn1 = document.getElementById('problem-req-1')
    const problemReqBtn2 = document.querySelectorAll('.prices__btn')
    problemReqBtn1.addEventListener('click', e => {
        modalReq.classList.add('open')
    })
    problemReqBtn2.forEach(el=> el.addEventListener('click', e => {
        modalReq.classList.add('open')
    }))
}