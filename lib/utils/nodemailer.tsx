import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD;

interface IOptions {
  service: string;
  auth: {
    user: string | undefined;
    pass: string | undefined;
  };
}

const transporterOptions: IOptions = {
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
};

export const transporter = nodemailer.createTransport(transporterOptions);

export const mailOptions = { from: email, to: email };
