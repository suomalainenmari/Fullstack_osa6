import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  anecdotes.sort((a,b) => {
    return b.votes-a.votes
  })

  const vote = (id, anecdote) => {
    console.log('vote', id)
    dispatch(addVote(id))
    let message = `You voted: ${anecdote}`
    dispatch(createNotification(message))
    setTimeout(() =>
      dispatch(deleteNotification()),5000)
  }


  return (
    <div>
    <h3> Anecdotes</h3>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id,anecdote.content)}>vote</button>
        </div>
      </div>
    )}</div>
  )
}

export default AnecdoteList