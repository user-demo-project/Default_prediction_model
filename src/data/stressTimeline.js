export const stressTimeline = [
  {
    date: "15 Jan 2026",
    title: "Primary buyer begins delaying payments",
    description: "Average collection period from Apex Mobility Systems increased from 54 to 67 days.",
    type: "counterparty",
    severity: "amber",
    evidenceId: "EVD-101"
  },
  {
    date: "12 Feb 2026",
    title: "Receivable days cross historical range",
    description: "Receivable days increased from 48 to 62, outside the borrower’s normal seasonal range.",
    type: "cashflow",
    severity: "amber",
    evidenceId: "EVD-102"
  },
  {
    date: "18 Mar 2026",
    title: "Working-capital utilisation exceeds 80%",
    description: "Cash-credit utilisation reached 82% and continued rising.",
    type: "facility",
    severity: "amber",
    evidenceId: "EVD-103"
  },
  {
    date: "21 Apr 2026",
    title: "Supplier payments begin slowing",
    description: "Average supplier-payment delay increased by 14 days.",
    type: "payments",
    severity: "amber",
    evidenceId: "EVD-104"
  },
  {
    date: "19 May 2026",
    title: "GST sales show material decline",
    description: "Trailing three-month GST sales declined by 11% against the comparable period.",
    type: "gst",
    severity: "red",
    evidenceId: "EVD-105"
  },
  {
    date: "25 Jun 2026",
    title: "Liquidity compression becomes critical",
    description: "Working-capital utilisation reached 94% while receivable days reached 91.",
    type: "liquidity",
    severity: "red",
    evidenceId: "EVD-106"
  },
  {
    date: "Prediction",
    title: "Repayment stress expected",
    description: "The ensemble model predicts material repayment stress within seven to nine months.",
    type: "prediction",
    severity: "red",
    evidenceId: "EVD-107"
  }
];
