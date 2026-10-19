import moment from 'moment'

const datePathFormat = 'YYYY/MM/YYYY-MM-DD'
const isoDateFormat = 'YYYY-MM-DD'

/**
 * Get a file path from a moment date.
 *
 * @param {moment.Moment} date
 * @returns {string}
 */
export function dateToPath(date) {
  return date.format(datePathFormat)
}

/**
 * Format a moment date as an ISO date string (YYYY-MM-DD).
 *
 * @param {moment.Moment} date
 * @returns {string}
 */
export function formatIsoDate(date) {
  return date.format(isoDateFormat)
}

/**
 * Format a moment date as a human-readable date string (D.M.YYYY).
 *
 * @param {moment.Moment} date
 * @returns {string}
 */
export function formatReadableDate(date) {
  return date.format('D.M.YYYY')
}

/**
 * Get the today, yesterday, and tomorrow dates from a moment date.
 *
 * @param {moment.Moment} today
 * @returns {{ today: moment.Moment, yesterday: moment.Moment, tomorrow: moment.Moment }}
 */
export function getAdjacentDates(today) {
  const yesterday = today.clone().subtract(1, 'day')
  const tomorrow = today.clone().add(1, 'day')
  return {
    today,
    yesterday,
    tomorrow,
  }
}

/**
 * Get the moment date from a file name.
 *
 * @param {string} fileName
 * @returns {moment.Moment}
 */
export function fileNameToDate(fileName) {
  let today
  if (typeof fileName === 'string') {
    const hasDate = /^\d{4}-\d{2}-\d{2}/.test(fileName)
    if (hasDate) {
      const dateSegment = fileName.slice(0, isoDateFormat.length)
      today = moment(dateSegment, isoDateFormat, true)
    }
  }
  if (!today || !today.isValid()) {
    today = moment()
  }
  return today
}
