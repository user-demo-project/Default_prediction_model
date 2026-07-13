export const interventionScenarios = [
  {
    id: "sc-1",
    name: "Scenario 1: No intervention",
    details: [
      { label: "12M PD", value: "79%" },
      { label: "Risk grade", value: "R5" },
      { label: "Liquidity gap (6M)", value: "₹42 lakh" },
    ],
    recommendation: "Avoid",
    color: "danger"
  },
  {
    id: "sc-2",
    name: "Scenario 2: Verified receivable financing",
    details: [
      { label: "Facility", value: "₹30 lakh" },
      { label: "12M PD", value: "43%" },
      { label: "Risk grade", value: "R3" },
      { label: "Liquidity improvement", value: "₹28 lakh" },
      { label: "Implementation period", value: "14–21 days" },
    ],
    recommendation: "Preferred",
    color: "success"
  },
  {
    id: "sc-3",
    name: "Scenario 3: Extend repayment tenure",
    details: [
      { label: "Extension", value: "Six months" },
      { label: "12M PD", value: "55%" },
      { label: "Risk grade", value: "R4" },
      { label: "EMI relief", value: "₹3.8 lakh per quarter" },
    ],
    recommendation: "Partial relief",
    color: "amber"
  },
  {
    id: "sc-4",
    name: "Scenario 4: Additional unsecured working capital",
    details: [
      { label: "Additional exposure", value: "₹35 lakh" },
      { label: "12M PD", value: "82%" },
      { label: "Risk grade", value: "R5" },
      { label: "Leverage impact", value: "Negative" },
    ],
    recommendation: "Do not proceed",
    color: "danger"
  },
  {
    id: "sc-5",
    name: "Scenario 5: Buyer diversification programme",
    details: [
      { label: "Target", value: "Reduce top-buyer concentration from 61% to 42%" },
      { label: "12M PD", value: "38%" },
      { label: "Risk grade", value: "R3" },
      { label: "Time horizon", value: "Six to nine months" },
    ],
    recommendation: "Strategic action",
    color: "information"
  }
];
