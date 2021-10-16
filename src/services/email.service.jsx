import emailjs from 'emailjs-com';

export function sendEmail(values) {
    values.contact_number = new Date().getTime()
    console.log(values)
    return emailjs.send('service_8rjckzb', 'pet_adoption', values, 'user_mJSw8D1mqXr2SyGrUiotI')

}