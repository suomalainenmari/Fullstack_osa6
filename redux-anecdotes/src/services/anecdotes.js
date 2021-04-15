import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/`)
  return response.data

}

const createNew = async (content) => {
  const object = {content, votes:0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addLikes = async (id) => {
  const current = await getOne(id)
  current.votes = current.votes+1
  const response = await axios.put(`${baseUrl}/${id}`, current)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll, 
  createNew,
  addLikes
}