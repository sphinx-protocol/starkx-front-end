// Thousands separator + 2 decimal points
const formatNumber = (number: number) => {
    return number
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export { formatNumber }
