export const counterpartyNodes = [
  {
    id: 'center',
    type: 'default',
    data: { label: 'Shakti Auto Components Pvt. Ltd.' },
    position: { x: 400, y: 300 },
    style: { background: 'var(--surface)', color: 'var(--idbi-teal-deep)', border: '2px solid var(--idbi-teal)', borderRadius: '8px', padding: '16px', fontWeight: 'bold' }
  },
  {
    id: 'buyer-1',
    type: 'default',
    data: { 
      label: 'Apex Mobility Systems Ltd.', 
      details: 'Relationship: Primary buyer\nRevenue contribution: 61%\nAverage payment cycle: 88 days (was 52 days)\nRisk level: High\nLitigation signal: Present\nPayment trend: Deteriorating'
    },
    position: { x: 700, y: 150 },
    style: { background: 'var(--danger-light)', color: 'var(--danger)', border: '1px solid var(--danger)', borderRadius: '8px', padding: '12px' }
  },
  {
    id: 'buyer-2',
    type: 'default',
    data: { 
      label: 'Nova Auto Assemblies Pvt. Ltd.',
      details: 'Revenue contribution: 22%\nPayment cycle: 46 days\nRisk level: Low\nPayment trend: Stable'
    },
    position: { x: 750, y: 300 },
    style: { background: 'var(--success-light)', color: 'var(--success)', border: '1px solid var(--success)', borderRadius: '8px', padding: '12px' }
  },
  {
    id: 'supplier-1',
    type: 'default',
    data: { 
      label: 'Vector Metals LLP',
      details: 'Relationship: Primary supplier\nPurchase concentration: 44%\nSupplier-payment delay: 24 days\nRisk level: Medium'
    },
    position: { x: 100, y: 200 },
    style: { background: 'var(--amber-light)', color: 'var(--amber)', border: '1px solid var(--amber)', borderRadius: '8px', padding: '12px' }
  },
  {
    id: 'related-1',
    type: 'default',
    data: { 
      label: 'Director Entity B',
      details: 'Relationship: Related entity\nTransaction value: ₹18 lakh over 12 months\nRisk flag: Review\nFinding: Some transfers require purpose validation'
    },
    position: { x: 150, y: 450 },
    style: { background: 'var(--surface-muted)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', borderStyle: 'dashed' }
  },
  {
    id: 'facility-1',
    type: 'default',
    data: { 
      label: 'IDBI Cash Credit Facility',
      details: 'Utilisation: 94%\nLimit: ₹2.50 Cr\nStatus: Standard'
    },
    position: { x: 400, y: 100 },
    style: { background: 'var(--idbi-teal-light)', color: 'var(--idbi-teal-dark)', border: '1px solid var(--idbi-teal)', borderRadius: '8px', padding: '12px' }
  },
  {
    id: 'guarantor-1',
    type: 'default',
    data: { 
      label: 'Guarantor: Rajiv Mehta',
      details: 'Net worth: ₹4.2 Cr\nCIBIL Score: 782'
    },
    position: { x: 400, y: 500 },
    style: { background: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px' }
  },
  {
    id: 'cluster-1',
    type: 'default',
    data: { 
      label: 'Pune Manufacturing Cluster',
      details: 'Sector: Auto Components\nMacro Trend: Stable'
    },
    position: { x: 700, y: 500 },
    style: { background: 'var(--information-light)', color: 'var(--information)', border: '1px solid var(--information)', borderRadius: '8px', padding: '12px' }
  }
];

export const counterpartyEdges = [
  { id: 'e1', source: 'center', target: 'buyer-1', animated: true, style: { stroke: 'var(--danger)' }, label: 'Sells to (61%)' },
  { id: 'e2', source: 'center', target: 'buyer-2', style: { stroke: 'var(--success)' }, label: 'Sells to (22%)' },
  { id: 'e3', source: 'supplier-1', target: 'center', animated: true, style: { stroke: 'var(--amber)' }, label: 'Buys from (44%)' },
  { id: 'e4', source: 'center', target: 'related-1', style: { stroke: 'var(--border)' }, label: 'Transfers to' },
  { id: 'e5', source: 'facility-1', target: 'center', style: { stroke: 'var(--idbi-teal)' }, label: 'Funds' },
  { id: 'e6', source: 'guarantor-1', target: 'center', style: { stroke: 'var(--border)' }, label: 'Guarantees' },
  { id: 'e7', source: 'center', target: 'cluster-1', style: { stroke: 'var(--border)', strokeDasharray: '5,5' }, label: 'Belongs to' }
];
