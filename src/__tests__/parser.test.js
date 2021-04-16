import parse from '../parser'

describe('parser', () => {
  test('basic parsing works correctly', () => {
    const source = `
    Result_A = Command1(
        Param_A = Foo
    )
    Result_B = Command2(
        Param_A = Bar,
        Param_B = "Hi."
    )
    `

    const program = parse(source.trim())

    expect(program.version).toBe(3)
    expect(program.commands).toEqual([
      {
        resultName: 'Result_A',
        command: 'Command1',
        arguments: [{ name: 'Param_A', value: { value: 'Foo', lineno: 2 }, lineno: 2 }],
        lineno: 1,
      },
      {
        resultName: 'Result_B',
        command: 'Command2',
        arguments: [
          { name: 'Param_A', value: { value: 'Bar', lineno: 5 }, lineno: 5 },
          { name: 'Param_B', value: { value: 'Hi.', lineno: 6 }, lineno: 6 },
        ],
        lineno: 4,
      },
    ])
  })

  test('numbers parse correctly', () => {
    expect(parse('A = Command(P = 1)').commands[0].arguments[0].value.value).toBe(1)
    expect(parse('A = Command(P = 1.)').commands[0].arguments[0].value.value).toBe(1.0)
    expect(parse('A = Command(P = .13E10)').commands[0].arguments[0].value.value).toBe(1300000000.0)
    expect(parse('A = Command(P = -1)').commands[0].arguments[0].value.value).toBe(-1)
    expect(parse('A = Command(P = +1)').commands[0].arguments[0].value.value).toBe(1)
  })

  test('plain strings parse correctly', () => {
    expect(parse('A = Command(P = /Path/To/123.txt)').commands[0].arguments[0].value.value).toBe('/Path/To/123.txt')
    expect(parse('A = Command(P = Foo)').commands[0].arguments[0].value.value).toBe('Foo')
    expect(parse('A = Command(P = C:\\path\\to\\thing)').commands[0].arguments[0].value.value).toBe(
      'C:\\path\\to\\thing',
    )
    expect(parse('A = Command(P = A+/-B)').commands[0].arguments[0].value.value).toBe('A+/-B')
  })

  test('quoted strings parse correctly', () => {
    expect(parse('A = Command(P = "/Path/To/123.txt")').commands[0].arguments[0].value.value).toBe('/Path/To/123.txt')
    expect(parse("A = Command(P = '/Path/To/123.txt')").commands[0].arguments[0].value.value).toBe('/Path/To/123.txt')
    expect(parse("A = Command(P = 'A+, \\n')").commands[0].arguments[0].value.value).toBe('A+, \\n')
  })

  test('lists parse correctly', () => {
    expect(parse('A = Command(P = [1, 2, 3])').commands[0].arguments[0].value.value).toEqual([
      { value: 1, lineno: 1 },
      { value: 2, lineno: 1 },
      { value: 3, lineno: 1 },
    ])
    expect(parse('A = Command(P = [1])').commands[0].arguments[0].value.value).toEqual([{ value: 1, lineno: 1 }])
    expect(parse('A = Command(P = [])').commands[0].arguments[0].value.value).toEqual([])
  })

  test('tuples parse correctly', () => {
    expect(parse('A = Command(P = ["A": "abc"])').commands[0].arguments[0].value.value).toEqual({
      A: { value: 'abc', lineno: 1 },
    })
    expect(parse('A = Command(P = [A: abc, B: b])').commands[0].arguments[0].value.value).toEqual({
      A: { value: 'abc', lineno: 1 },
      B: { value: 'b', lineno: 1 },
    })
  })

  test('An EEMS 2.0 READ command parses correctly and is identified as version 2', () => {
    const program = parse('READ(InFileName = foo.gdb, InFieldName = Test)')
    expect(program.version).toBe(2)
    expect(program.commands[0].command).toBe('READ')
  })

  test("comments aren't interpreted", () => {
    const source = `
    # This is a comment
    Result_A = Command1(
        Param_A = Foo
    )
    `

    const program = parse(source.trim())
    expect(program.commands).toEqual([
      {
        resultName: 'Result_A',
        command: 'Command1',
        arguments: [{ name: 'Param_A', value: { value: 'Foo', lineno: 3 }, lineno: 3 }],
        lineno: 2,
      },
    ])

    const source2 = `
    # Result_B = Command1(Param_A = Bar)
    Result_A = Command1(
        Param_A = Foo
    )
    `

    const program2 = parse(source2.trim())
    expect(program2.commands).toEqual([
      {
        resultName: 'Result_A',
        command: 'Command1',
        arguments: [{ name: 'Param_A', value: { value: 'Foo', lineno: 3 }, lineno: 3 }],
        lineno: 2,
      },
    ])
  })
})
