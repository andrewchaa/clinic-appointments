export default (state=[], action) => {
  switch (action.type) {
    case 'appointment-added':
      return [
        ...state,
        action.appointment
      ];
      break;
    default:
      return state;

  }
}
