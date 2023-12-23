import { NextRequest, NextResponse } from "next/server";

import { mailOptions, transporter } from "@/lib/utils/nodemailer";

import { createHTMLTemplate } from "@/constants/htmlTemp";

interface StateValues {
  [key: string]: string;
  user: string;
  mail: string;
  subject: string;
  message: string;
}

const CONTACT_MESSAGE_FIELDS: StateValues = {
  user: "Name",
  mail: "Email",
  subject: "Subject",
  message: "Message",
};

const generateEmailContent = (data: StateValues) => {
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    "",
  );
  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`);
  }, "");

  return {
    text: stringData,
    html: createHTMLTemplate(htmlData),
  };
};

export async function POST(request: NextRequest) {
  const reqBody = await request.json();

  const formValues = reqBody.formValues;

  if (
    !formValues ||
    !formValues.user ||
    !formValues.mail ||
    !formValues.subject ||
    !formValues.message
  ) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  try {
    await transporter.sendMail({
      ...mailOptions,
      ...generateEmailContent(formValues),
      subject: formValues.subject,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
