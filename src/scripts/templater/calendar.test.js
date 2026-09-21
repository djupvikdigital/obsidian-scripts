import moment from 'moment'
import { describe, expect, it } from 'vitest'

import calendar from './calendar.js'

describe('dateToPath', () => {
  it('formats a moment date as a path', () => {
    const date = moment('2024-01-02', 'YYYY-MM-DD', true)
    expect(calendar.dateToPath(date)).toBe('2024/01/02')
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

describe('pathToDates', () => {
  it('extracts a date from a path and returns today, yesterday, and tomorrow', () => {
    const dates = calendar.pathToDates('daily/2024/01/02/note.md')

    expect(dates.today.format('YYYY-MM-DD')).toBe('2024-01-02')
    expect(dates.yesterday.format('YYYY-MM-DD')).toBe('2024-01-01')
    expect(dates.tomorrow.format('YYYY-MM-DD')).toBe('2024-01-03')
  })

  it('falls back to today if unable to find date in path', () => {
    const dates = calendar.pathToDates('daily/note.md')

    const today = moment().format('YYYY-MM-DD')
    expect(dates.today.format('YYYY-MM-DD')).toBe(today)
    expect(dates.yesterday.format('YYYY-MM-DD')).toBe(
      moment().subtract(1, 'day').format('YYYY-MM-DD'),
    )
    expect(dates.tomorrow.format('YYYY-MM-DD')).toBe(
      moment().add(1, 'day').format('YYYY-MM-DD'),
    )
  })
})
