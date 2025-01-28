export const enumerate = (number: number, enumeration: Array<string>): string => {
    if (number > 100) number = number % 100
    if (number <= 20 && number >= 10) return enumeration[2]
    if (number > 20) number = number % 10
    return number === 1 ? enumeration[0] : number > 1 && number < 5 ? enumeration[1] : enumeration[2]
}
