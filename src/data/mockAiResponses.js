export const getDemoAnswer = (query) => {
  const q = query.toLowerCase();

  if (q.includes("why") && q.includes("risk increase")) {
    return `The borrower’s 12-month probability of default increased from 29% to 68% because three connected indicators deteriorated simultaneously: receivable days rose from 48 to 91, working-capital utilisation increased from 68% to 94%, and 61% of revenue became dependent on a buyer whose payment cycle increased to 88 days. EMI payments remain regular, so this is an emerging-liquidity warning rather than current delinquency.

**Supporting evidence:** EVD-101, EVD-102, EVD-103 and EVD-106.

**Confidence:** High. The principal limitation is that the top receivables have not yet been independently verified.

**Recommended next step:** Validate the top five receivables and contact the borrower within seven days.`;
  }

  if (q.includes("seasonal")) {
    return `This behavior is unlikely to be purely seasonal. While receivable days fluctuate naturally across the year, the current 91-day cycle is significantly outside the historical 48-62 day range observed in the past 12 months.

**Supporting evidence:** EVD-102 (Cash-Flow Sequence Agent finding).

**Confidence:** High.

**Recommended next step:** Verify the cause of the payment delay directly with the primary buyer.`;
  }

  if (q.includes("evidence") && q.includes("buyer concentration")) {
    return `The Counterparty Contagion Agent determined that 61% of the borrower's incoming operating cash flow over the last 90 days originated from a single buyer (Apex Mobility Systems Ltd.). This buyer's average payment cycle has deteriorated from 52 days to 88 days.

**Supporting evidence:** EVD-101.

**Confidence:** Very High (based on approved bank transaction aggregation).

**Recommended next step:** Review the contract and relationship stability with Apex Mobility Systems.`;
  }
  
  if (q.includes("receivable financing") && q.includes("preferred")) {
    return `Receivable financing is preferred because it directly addresses the liquidity gap caused by the buyer's delayed payments. The simulation shows this facility (₹30 lakh) would improve short-term liquidity by ₹28 lakh and reduce the 12-month probability of default from 79% to 43%.

**Supporting evidence:** Intervention Lab (Scenario 2).

**Confidence:** Medium. This assumes the receivables are genuine and recoverable.

**Recommended next step:** Approve the recommendation to verify receivables and structure the financing.`;
  }

  if (q.includes("what changed") && q.includes("90 days")) {
    return `Over the last 90 days, the borrower's liquidity profile deteriorated rapidly. Receivable days extended from 79 to 91, pushing working-capital utilisation from 89% to 94%. Consequently, supplier payments began to delay significantly, currently averaging 24 days late.

**Supporting evidence:** EVD-104, EVD-106.

**Confidence:** High.

**Recommended next step:** Intervene immediately before supplier delays trigger supply chain disruptions.`;
  }

  return `I can help you understand the emerging stress pathways, agentic findings, and intervention scenarios for this borrower based on the available evidence.

**Supporting evidence:** Demo Intelligence.

**Recommended next step:** Select one of the suggested questions.`;
};
