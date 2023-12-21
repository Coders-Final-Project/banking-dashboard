import axios from "axios";

export interface IProps {
  user: string;
  mail: string;
  subject: string;
  message: string;
}

export const sendContactForm = async (data: IProps) => {
  try {
    await axios.post("/api/contact", { formValues: data });
  } catch (error) {
    throw new Error("Failed to send message");
  }
};
