// actions.js
import { createAction } from 'redux-starter-kit'

export const update_config = createAction('update_config')

console.log(update_config)
// "increment"

const theAction = update_config({test: 'test'})
console.log(theAction)
// {type : "increment", payload : 5}

