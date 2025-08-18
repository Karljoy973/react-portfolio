import { expect,  test } from 'vitest'

test("hello world", () => {
    const hello = "hello world"
    expect(hello).toBe("hello world")

})
test('tostring', () => {
const result = toString(0)
expect(result).toMatchSnapshot()
})


function toString(value: any) {
    return `${value}`
}