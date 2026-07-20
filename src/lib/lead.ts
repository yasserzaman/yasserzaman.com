// Pure lead-detection helpers, extracted so they can be unit-tested without a
// browser. The widget calls detectLead() on each turn; when a visitor has
// shared both an email and a phone number, it relays the lead to Yasser.

export const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/;
// Loose phone matcher; validated afterwards by counting digits (>= 7).
export const PHONE_RE = /\+?[\d][\d\s().-]{6,}\d/;

export interface Lead {
  email: string;
  phone: string;
  name: string;
}

export function digitsCount(s: string): number {
  return (s.match(/\d/g) || []).length;
}

export function extractName(userText: string): string {
  const patterns = [
    /\bmy name is\s+([A-Za-z][A-Za-z .'-]{1,60})/i,
    /\bi am\s+([A-Za-z][A-Za-z .'-]{1,60})/i,
    /\bi'?m\s+([A-Za-z][A-Za-z .'-]{1,60})/i,
    /\bthis is\s+([A-Za-z][A-Za-z .'-]{1,60})/i,
    /\bname\s*[:-]\s*([A-Za-z][A-Za-z .'-]{1,60})/i,
  ];
  for (const re of patterns) {
    const m = userText.match(re);
    if (m && m[1]) {
      return m[1].replace(/\b(and|my|the|from|here|email|phone|number)\b.*$/i, "").trim().slice(0, 60);
    }
  }
  return "";
}

// Returns the captured lead once both an email and a valid phone are present in
// the visitor's messages, otherwise null.
export function detectLead(userMessages: string[]): Lead | null {
  const userText = userMessages.join("\n");
  const email = userText.match(EMAIL_RE);
  const phone = userText.match(PHONE_RE);
  if (email && phone && digitsCount(phone[0]) >= 7) {
    return { email: email[0], phone: phone[0].trim(), name: extractName(userText) };
  }
  return null;
}
