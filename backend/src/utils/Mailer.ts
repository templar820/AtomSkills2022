import nodemailer from 'nodemailer';
import send_mail_lib from 'sendmail';
import CONSTANT from '../config/CONSTANT';

async function createUserEmailCredentials(cb) {
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    if (err) {
      return cb({
        email: 'aokmrpeslznkcvoy@ethereal.email',
        email_password: 'NpYvZFabq9RseHbnRw',
      });
    }
    cb({
      email: account.user,
      email_password: account.pass,
    });
  });
}

function sendMail({ email, text, subject }, cb?: (err, reply) => void) {
  send_mail_lib()({
    from: CONSTANT.COMPANY_EMAIL,
    to: email,
    subject: subject || 'Уведомление',
    html: text,
  }, (err, reply) => {
    if (cb) {
      cb(err, reply);
    } else {
      console.log('ERROR:', err);
      console.log('REPLY:', reply);
    }
  });
}

export { sendMail, createUserEmailCredentials };
