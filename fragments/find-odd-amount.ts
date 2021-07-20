export function findOddAmount(numbers: Array<number>): number {
    let xor = 0;
    for (let i = 0; i < numbers.length; i++) xor = xor ^ numbers[i];
    return xor;
    /*
    PSUEDOCODE
    Convert decimal notation to binary notation:
        7 ^ 10 => 0111 ^ 1010
    Let’s build our binary value one index at a time.
    We’ll start from the left.
    The first digit of the first number is 0 and the first digit of the second number is 1.
    Since they are not the same, our XOR operator returns 1:
        0 ^ 1 => 1
    As we move through the numbers, we build a new binary value
        1 ^ 0 = 1
        1 ^ 1 = 0
        1 ^ 0 = 1
    So 7 ^ 10 => 0111 ^ 1010 => 1101 => 13

    An example:
    array = [1,4,10,4,4,10,1,10,10]
        0 ^ 1 => 1
        1 ^ 4 => 5
        5 ^ 10 => 15
        15 ^ 4 => 11
        11 ^ 4 => 15
        15 ^ 10 => 5
        5 ^ 1 => 4
        4 ^ 10 => 14
        14 ^ 10 => 4
    4 appeared three times, 1 appeared twice, 5 appeared 4 times.
    4 was the right answer

    We might also notice that the XOR operator seems to group numbers in threes.
    The two numbers we use for our comparison generate a third that,
    when compared with one of the original two, will return the other:
        a ^ b => c
        c ^ b => a
        c ^ a => b
    This is the key to this solution.
    After we set xor to the first integer in our array (value 1),
    we compare it with the next integer (value 2), generating a third value (value 3).
    If we come across value 1 again while traversing the array,
    value 3 will be transformed into value 2.
    If we come across value 2, value 3 will be transformed into value 1.
    */
}
