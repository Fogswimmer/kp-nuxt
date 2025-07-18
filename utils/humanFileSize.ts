export default (sizeInBytes: number) => {
    const units = ['B', 'KB', 'MB']
    let power = 0
    while (sizeInBytes > 1024) {
        power++
        sizeInBytes /= 1024
    }
    return `${sizeInBytes.toFixed(2)} ${units[power]}`
}
