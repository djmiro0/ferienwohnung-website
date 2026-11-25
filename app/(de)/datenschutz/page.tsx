import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getMessages } from "@/lib/i18n";
import { createLegalMetadata } from "@/lib/metadata";

const messages = getMessages("de");

export const metadata: Metadata = createLegalMetadata("de", messages, "privacy");

export default function GermanPrivacyPage() {
  return <LegalPage locale="de" messages={messages} page="privacy" />;
}
