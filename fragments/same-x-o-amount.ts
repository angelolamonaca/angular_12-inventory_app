export function sameXOAmount(str: string): boolean {
    const xAmount = (str.toLowerCase().match(/x/g) || []).length;
    const oAmount = (str.toLowerCase().match(/o/g) || []).length;
    return xAmount === oAmount;
}
