import { expect, test } from 'vitest'
import { getByText, render } from '@testing-library/react'
import { screen } from "@testing-library/dom"
import { Welcome } from '@/welcome/welcome'

test("hello world", () => {
    const hello = "hello world"
    expect(hello).toBe("hello world")

})
test('tostring', () => {
const result = toString(0)
expect(result).toMatchSnapshot()
})

test("first render", async () => {
    render(<Welcome />)
    expect(screen.getByText(/hello/i))
})




function toString(value: any) {
    return `${value}`
}