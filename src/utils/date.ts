


export  const formatDate = (date: string | number | Date) => {
    const newDate = new Date(date)
    return new Intl.DateTimeFormat('es-CL', {dateStyle: 'long'}).format(newDate)
}