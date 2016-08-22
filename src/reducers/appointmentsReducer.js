export default (state=[], action) => {
  switch (action.type) {
    case 'appointment-added':
      return [
        ...state,
        action.appointment
      ];
    case 'appointment-changed':
      return action.appointments;
    default:
      return state;

  }
}
