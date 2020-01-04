import nodemailer from "nodemailer";
import mongoose from "mongoose";
import ejs from "ejs";
import _ from "lodash";

const EmailQueue = mongoose.model('EmailQueue');

export default class EmailSender {
  constructor(server, params = {}) {
    this.server = server;
    this.params = params;
    this.validate();
    this.createTransporter();
  }

  async perform() {
    let emailQueue = new EmailQueue(this.emailQueueData());

    try {
      let info = await this.transporter.sendMail(this.emailData());
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      emailQueue.transferStatus = 'success';
    } catch (error) {
      console.log("Error:", error);
      emailQueue.transferStatus = 'error';
    }

    await emailQueue.save();
  }

  createTransporter() {
    let mailer = this.server.configManager.get('mailer');

    this.transporter = nodemailer.createTransport(mailer.options, mailer.default);
  }

  validate() {
    let attrs = ['to', 'subject', 'content'];
    for (let i in attrs) {
      let attr = attrs[i];
      if (!this.params[attr])
        throw new Error('Missing params:', attr);
    }
  }

  emailData() {
    return {
      from: this.server.configManager.get('mailer.defaults.from'),
      to: this.params.to,
      subject: this.params.subject,
      html: ejs.render(this.params.content, this.params.context || {})
    };
  }

  emailQueueData() {
    return {
      from: this.server.configManager.get('mailer.defaults.from'),
      to: this.params.to,
      subject: this.params.subject,
      content: ejs.render(this.params.content, this.params.context || {}),
      context: this.params.context
    };
  }
}
