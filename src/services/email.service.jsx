import emailjs from 'emailjs-com';

export function sendEmail(values){
    values.contact_number = new Date().getTime()
    console.log(values)
    return emailjs.send('gmail', 'pet_adoption', values, 'user_oIN6o7py9xTt9xjKEoy9l')
    
}