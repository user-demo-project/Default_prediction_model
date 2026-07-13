export const initialState = {
  tourRunning: false,
  tourStepIndex: 0,
  groqKeyPresent: false,
  groqMode: 'demo',
  groqModel: 'llama-3.3-70b-versatile',
  chatMessages: [],
  selectedBorrowerId: 'MSME-1042',
  auditTrail: []
};

export function demoReducer(state, action) {
  switch (action.type) {
    case 'SET_TOUR_STATE':
      return { ...state, tourRunning: action.payload.run !== undefined ? action.payload.run : state.tourRunning, tourStepIndex: action.payload.stepIndex ?? state.tourStepIndex };
    case 'SET_GROQ_KEY_PRESENT':
      return { ...state, groqKeyPresent: action.payload };
    case 'SET_GROQ_MODE':
      return { ...state, groqMode: action.payload };
    case 'SET_GROQ_MODEL':
      return { ...state, groqModel: action.payload };
    case 'ADD_CHAT_MESSAGE':
      return { ...state, chatMessages: [...state.chatMessages, action.payload] };
    case 'CLEAR_CHAT':
      return { ...state, chatMessages: [] };
    case 'SET_SELECTED_BORROWER':
      return { ...state, selectedBorrowerId: action.payload };
    case 'ADD_AUDIT_LOG':
      return { ...state, auditTrail: [action.payload, ...state.auditTrail] };
    case 'RESET_DEMO':
      return { ...initialState };
    default:
      return state;
  }
}
