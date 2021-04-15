import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes:0
  }
}

//export const createAnecdote = (newAnecdote) => {
  //return {
    //type: 'NEW_ANECDOTE',
    //data: newAnecdote
  //}

//}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type:'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const addVote = id => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.addLikes(id)
    dispatch({
      type:'VOTE',
      data:votedAnecdote
    })
  }
}

//export const addVote = (id) => {
  //return {
    //type: 'VOTE',
    //data: { id }
  //}
//}

//export const initializeAnecdotes = (anecdotes) => {
 // return {
   // type: 'INIT_ANECDOTES',
    //data: anecdotes
  //}
//}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type:'INIT_ANECDOTES',
      data:anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n=> n.id === id)
      const votedAnecdote = {
        ...anecdoteToChange, votes: anecdoteToChange.votes+1
      }
      return state.map(anecdote => anecdote.id!==id ? anecdote : votedAnecdote)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data


    default:
      return state
    
  }
}

export default anecdoteReducer