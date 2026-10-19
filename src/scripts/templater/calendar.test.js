import moment from 'moment'
import { describe, expect, it } from 'vitest'

import * as calendar from './calendar.js'

describe('dateToPath', () => {
  it('formats a moment date as a path', () => {
    const date = moment('2024-01-02', 'YYYY-MM-DD', true)
    expect(calendar.dateToPath(date)).toBe('2024/01/2024-01-02')
  })
})

describe('formatIsoDate', () => {
  it('formats a moment date as an ISO date', () => {
    const date = moment('2024-01-02', 'YYYY-MM-DD', true)
    expect(calendar.formatIsoDate(date)).toBe('2024-01-02')
  })
})

describe('formatReadableDate', () => {
  it('formats a moment date as a readable date', () => {
    const date = moment('2024-01-02', 'YYYY-MM-DD', true)
    expect(calendar.formatReadableDate(date)).toBe('2.1.2024')
  })
})

describe('getAdjacentDates', () => {
  it('returns the previous and next dates relative to a given date', () => {
    const date = moment('2024-01-02', 'YYYY-MM-DD', true)
    const adjacentDates = calendar.getAdjacentDates(date)

    expect(adjacentDates.today.format('YYYY-MM-DD')).toBe('2024-01-02')
    expect(adjacentDates.yesterday.format('YYYY-MM-DD')).toBe('2024-01-01')
    expect(adjacentDates.tomorrow.format('YYYY-MM-DD')).toBe('2024-01-03')
  })
})

describe('fileNameToDate', () => {
  it('extracts a date from the start of a filename', () => {
    const date = calendar.fileNameToDate('2024-01-02 note.md')

    expect(date.format('YYYY-MM-DD')).toBe('2024-01-02')
  })

  it('falls back to today if unable to find date in path', () => {
    const date = calendar.fileNameToDate('note.md')

    const today = moment().format('YYYY-MM-DD')
    expect(date.format('YYYY-MM-DD')).toBe(today)
  })
})
