import emailjs from "emailjs-com";

export function sendEmail(values) {
  values.contact_number = new Date().getTime();
  const emailUser = process.env.REACT_APP_EMAIL_USER;
  const emailSecret = process.env.REACT_APP_EMAIL_SECRET;
  return emailjs.send(emailUser, "pet_adoption", values, emailSecret);
}
