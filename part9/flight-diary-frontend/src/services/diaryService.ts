import axios from 'axios'
import { EntriesSchema, type Entry, type NewEntry } from '../types.ts'

const baseUrl = 'http://localhost:3000/api/diaries'

const getAllDiaries = () => axios.get<unknown>(baseUrl).then(response => EntriesSchema.parse(response.data))

const createDiary = (object: NewEntry) => axios.post<Entry>(baseUrl, object).then(response => response.data)

export { getAllDiaries, createDiary }
