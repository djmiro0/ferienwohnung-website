import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { getMessages } from "@/lib/i18n";
import { createHomeMetadata } from "@/lib/metadata";

const messages = getMessages("de");

export const metadata: Metadata = createHomeMetadata("de", messages);

export default function GermanHomePage() {
  return <HomePage locale="de" messages={messages} />;
}
