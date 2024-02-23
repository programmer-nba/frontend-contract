export const formatDate = (date: Date): string => {
  const originalDate = new Date(date)

  const options: object = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
    //second: "2-digit",
    //timeZoneName: "short",
  }

  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(originalDate)

  return formattedDate
}

export const formatDateTime = (date: Date): string => {
  const originalDate = new Date(date)
  const options: object = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
    //timeZoneName: "short",
  }

  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(originalDate)

  return formattedDate
}
