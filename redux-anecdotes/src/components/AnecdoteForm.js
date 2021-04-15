import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))

    let message = `You added: ${content}`
    dispatch(createNotification(message))
    setTimeout(() => 
      dispatch(deleteNotification()),5000)
  }
  return (
    <div>
      <h2>New anecdote</h2>
    <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>

    </div>

  )
}

export default AnecdoteForm