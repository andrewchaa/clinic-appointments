export default (state=[], action) => {
  switch (action.type) {
    case 'appointment-added':
      [
        ...state,
        action.appointment
      ]
      break;
    default:
      return state;

  }
}
