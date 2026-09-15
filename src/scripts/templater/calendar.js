import moment from 'moment'

const datePathFormat = 'YYYY/MM/DD'

function dateToPath(date) {
  return date.format(datePathFormat)
}

function formatIsoDate(date) {
  return date.format('YYYY-MM-DD')
}

function formatReadableDate(date) {
  return date.format('D.M.YYYY')
}

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
