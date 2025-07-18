export default (error: unknown, isFatal: boolean = false) => {
    const typedError = error as { statusCode: number }
    throw createError({
        statusCode: typedError.statusCode,
        fatal: isFatal,
    })
}
