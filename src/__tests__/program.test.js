import Program from '../program'
import { BaseCommand } from '../commands'
import { ListParameter, NumberParameter, ResultParameter, StringParameter } from '../params'

class SimpleCommand extends BaseCommand {
  constructor(...args) {
    super(...args)

    this.name = 'SimpleCommand'
    this.displayName = 'Simple Command'
    this.inputs = {
      ...this.inputs,
      A: new StringParameter(),
      B: new NumberParameter(),
      C: new ListParameter(new NumberParameter()),
      D: new StringParameter(false),
    }
    this.output = new ListParameter()
  }

  execute = params => {
    const result = [params.A, params.B, params.C]
    if (params.D) {
      result.push(params.D)
    }
    return result
  }
}

class DependentCommand extends BaseCommand {
  constructor(...args) {
    super(...args)

    this.name = 'DependentCommand'
    this.displayName = 'Dependent Command'
    this.inputs = {
      ...this.inputs,
      A: new ResultParameter(new ListParameter()),
      Z: new StringParameter(false),
    }
    this.output = new ListParameter()
  }

  execute = params => params.A.getResult()
}

class InvalidDependencyCommand extends BaseCommand {
  constructor(...args) {
    super(...args)

    this.name = 'InvalidDependencyCommand'
    this.displayName = 'Invalid Dependency Command'
    this.output = new NumberParameter()
  }
}

class ExtraInputsCommand extends BaseCommand {
  constructor(...args) {
    super(...args)

    this.name = 'ExtraInputsCommand'
    this.displayName = 'Extra Inputs Command'
    this.inputs = {
      ...this.inputs,
      A: new StringParameter(),
    }
    this.allowExtraArguments = true
  }

  execute = params => params.Extra
}

describe('Program', () => {
  test('can load and run a simple command', () => {
    const source = 'Result = SimpleCommand(A=Test, B=3, C=[1,2,3])'
    const program = Program.fromSource(source, { SimpleCommand })
    program.run()

    expect(program.commands.Result.result).toEqual(['Test', 3, [1, 2, 3]])
  })

  test('optional argument works correctly', () => {
    const source = 'Result = SimpleCommand(A=Test, B=3, C=[1,2,3], D=Optional)'
    const program = Program.fromSource(source, { SimpleCommand })
    program.run()

    expect(program.commands.Result.result).toEqual(['Test', 3, [1, 2, 3], 'Optional'])
  })

  test('invalid command throws an exception', () => {
    const source = 'Result = InvalidCommand()'
    expect(() => Program.fromSource(source)).toThrowError('The command "InvalidCommand" does not exist.')
  })

  test('missing argument throw an exception', () => {
    const source = 'Result = SimpleCommand(A=Test)'
    expect(() => Program.fromSource(source, { SimpleCommand })).toThrowError(
      'The command SimpleCommand is missing the following required parameters: B, C.',
    )
  })

  test('extra argument throws an exception', () => {
    const source = 'Result = SimpleCommand(A=Test, B=3, C=[1,2,3], E=Invalid)'
    expect(() => Program.fromSource(source, { SimpleCommand })).toThrowError(
      'The command SimpleCommand has no parameter named "E".',
    )
  })

  test('metadata is handled correctly', () => {
    const source = 'Result = SimpleCommand(A=Test, B=3, C=5, Metadata=[DisplayName:"The Command"])'
    const program = Program.fromSource(source, { SimpleCommand })

    expect(program.commands.Result.getMetadata()).toEqual({ DisplayName: 'The Command' })
  })

  test('parameter referring to another result works correctly', () => {
    const source = `
      Result_A = SimpleCommand(A=Test, B=3, C=[1,2,3])
      Result_B = DependentCommand(A=Result_A)
    `
    const program = Program.fromSource(source, { SimpleCommand, DependentCommand })
    program.run()

    expect(program.commands.Result_B.result).toEqual(['Test', 3, [1, 2, 3]])
  })

  test('extra parameter is allowed', () => {
    const source = 'Result = ExtraInputsCommand(A = Foo, Extra = 5)'
    const program = Program.fromSource(source, { ExtraInputsCommand })
    program.run()

    expect(program.commands.Result.getResult()).toBe(5)
  })

  test('missing result throws an exception', () => {
    const source = 'Result = DependentCommand(A=Result_A)'
    const program = Program.fromSource(source, { DependentCommand })

    expect(() => program.run()).toThrowError('The command Result_A does not exist.')
  })

  test('invalid result throws an exception', () => {
    const source = `
      Result_A = InvalidDependencyCommand()
      Result_B = DependentCommand(A=Result_A)
    `
    const program = Program.fromSource(source, { DependentCommand, InvalidDependencyCommand })

    expect(() => program.run()).toThrowError('The command Result_A does not return the correct type.')
  })
})
