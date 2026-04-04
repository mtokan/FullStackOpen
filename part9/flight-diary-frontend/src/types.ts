import { z } from 'zod'

export const EntrySchema = z.object({
  id: z.number(),
  date: z.string(),
  visibility: z.enum(['great', 'good', 'ok', 'poor']),
  weather: z.enum(['sunny', 'rainy', 'cloudy', 'stormy', 'windy']),
  comment: z.string().optional(),
})

export const EntriesSchema = z.array(EntrySchema)
export type Entry = z.infer<typeof EntrySchema>
export const visibilityOptions = EntrySchema.shape.visibility.options
export const weatherOptions = EntrySchema.shape.weather.options
export type NewEntry = Omit<Entry, 'id'>
