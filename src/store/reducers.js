import { update_config } from './actions'

export function configReducer(state = {}, action) {
  switch (action.type) {
    // action creator can be used directly as the type for comparisons
    case 'update_config': {
      // console.log(action)
      return {...state, config: action.payload}
    }
    default:
      return state
  }
}