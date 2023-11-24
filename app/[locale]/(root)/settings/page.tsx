"use client";

import "@/sass/layout/_pageHeader.scss";
import { useSearchParams } from "next/navigation";
import Personal from "@/components/Personal/Personal";
import Withdrawal from "@/components/Withdrawal/Withdrawal";

const Settings = () => {
  const searchParams = useSearchParams();
  const isTabs = searchParams.has("withdrawal");

  return <main>{isTabs ? <Withdrawal /> : <Personal />}</main>;
};
export default Settings;
