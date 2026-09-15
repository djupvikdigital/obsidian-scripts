import moment from 'moment'

const datePathFormat = 'YYYY/MM/DD'

/**
 * Get a file path from a moment date.
 *
 * @param {moment.Moment} date
 * @returns {string}
 */
function dateToPath(date) {
  return date.format(datePathFormat)
}

/**
 * Format a moment date as an ISO date string (YYYY-MM-DD).
 *
 * @param {moment.Moment} date
 * @returns {string}
 */
function formatIsoDate(date) {
  return date.format('YYYY-MM-DD')
}

/**
 * Format a moment date as a human-readable date string (D.M.YYYY).
 *
 * @param {moment.Moment} date
 * @returns {string}
 */
function formatReadableDate(date) {
  return date.format('D.M.YYYY')
}

/**
 * Get the today, yesterday, and tomorrow dates from a file path.
 *
 * @param {string} path
 * @returns {{ today: moment.Moment, yesterday: moment.Moment, tomorrow: moment.Moment }}
 */
function pathToDates(path) {
  let today, yesterday, tomorrow
  if (typeof path === 'string') {
    const dateIndex = path.search(/\d{4}\/\d{2}\/\d{2}/)
    if (~dateIndex) {
      const dateSegment = path.slice(
        dateIndex,
        dateIndex + datePathFormat.length,
      )
      today = moment(dateSegment, datePathFormat, true)
    }
  }
  if (!today || !today.isValid()) {
    today = moment()
  }
  yesterday = today.clone().subtract(1, 'day')
  tomorrow = today.clone().add(1, 'day')
  return {
    today,
    yesterday,
    tomorrow,
  }
}

export default { dateToPath, formatIsoDate, formatReadableDate, pathToDates }
