import Program from '../program'
import { BaseCommand } from '../commands'
import { StringParameter } from '../params'

class TestCommand extends BaseCommand {
  name = 'TestCommand'

  displayName = 'Test Command'

  inputs = { A: new StringParameter() }

  output = new StringParameter()
}

describe('Program', () => {
  test('can load a program from source', () => {
    const program = Program.fromSource('Result = TestCommand(A = Foo)', { TestCommand })
    expect(program.commands.Result).toBeTruthy()
    expect(program.commands.Result.name).toBe('TestCommand')
    expect(program.commands.Result.args).toEqual([{ name: 'A', value: 'Foo', lineno: 1 }])
  })
})
