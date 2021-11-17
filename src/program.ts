import parse from './parser'
import { CommandClass, BaseCommand, Argument, ListArgument } from './commands'
import defaultLookup, { CommandLookup } from './libraries'
import { ExpressionNode, ProgramNode } from './parser/mpilot'
import { ResultParameter, AnyParameter } from './params'
import { convertEems2Commands } from './utils'

const flatten = (arr: any[]) => {
  let result: any[] = []

  arr.forEach(item => {
    if (Array.isArray(item)) {
      result = [...result, ...flatten(item)]
    } else {
      result.push(item)
    }
  })

  return result
}

export default class Program {
  static fromSource = (source: string, lookup: CommandLookup = defaultLookup) => {
    const resolveList = (name: string, expressionNode: ExpressionNode): ListArgument =>
      ({
        name,
        value: expressionNode.value.map((n: any) => {
          if (Array.isArray(n.value)) {
            return resolveList(name, n)
          }

          return n.value
        }),
      } as ListArgument)

    const program = new Program(lookup)
    let programNode = parse(source)

    if (programNode.version === 2) {
      programNode = { commands: convertEems2Commands(programNode.commands), version: 3 } as ProgramNode
    }

    programNode.commands.forEach(cmdNode => {
      const args: Argument[] = cmdNode.arguments.map(argNode => {
        if (Array.isArray(argNode.value.value)) {
          return resolveList(argNode.name, argNode.value)
        }
        if (typeof argNode.value.value === 'object') {
          const value: any = {}
          Object.entries(argNode.value.value).forEach(([key, v]) => (value[key] = (v as ExpressionNode).value))
          return {
            name: argNode.name,
            value,
            lineno: argNode.lineno,
          } as Argument
        }

        return {
          name: argNode.name,
          value: argNode.value.value,
          lineno: argNode.lineno,
        } as Argument
      })

      const cls = lookup[cmdNode.command]
      if (!cls) {
        throw new Error(`The command "${cmdNode.command}" does not exist.`)
      }

      program.addCommand(cls, cmdNode.resultName, args, cmdNode.lineno)
    })

    program.validate()
    return program
  }

  lookup: CommandLookup

  commands: { [name: string]: BaseCommand } = {}

  constructor(lookup: CommandLookup = defaultLookup) {
    this.lookup = lookup
  }

  addCommand = (CommandCls: CommandClass, resultName: string, args: Argument[], lineno?: number): void => {
    if (Object.keys(this.commands).includes(resultName)) {
      throw new Error(`The result name "${resultName}" is duplicated in the command file.`)
    }

    const command = new CommandCls(resultName, args, this, lineno || 0)

    const params: any = {}
    args.forEach(arg => (params[arg.name] = arg.value))

    const requiredInputs = Object.entries(command.inputs)
      .filter(([, value]) => value.required)
      .map(([key]) => key)
    const allInputs = Object.keys(command.inputs)

    const missingParams = requiredInputs.filter(p => !Object.keys(params).includes(p))
    if (missingParams.length) {
      throw new Error(
        `The command ${command.name} is missing the following required parameters: ${missingParams.join(', ')}.`,
      )
    }

    Object.entries(params).forEach(([name]) => {
      if (!allInputs.includes(name)) {
        if (!command.allowExtraArguments) {
          throw new Error(`The command ${command.name} has no parameter named "${name}".`)
        }
      }
    })

    this.commands[resultName] = command
  }

  validate = () => {
    Object.values(this.commands).forEach(cmd => {
      cmd.isValid()
    })
  }

  getDependencyLookup = () => {
    const lookup: {
      dependents: { [resultName: string]: string[] }
      dependencies: { [resultName: string]: string[] }
    } = {
      dependents: {},
      dependencies: {},
    }

    Object.values(this.commands).forEach(command => {
      let references: string[] = []

      command.args.forEach(arg => {
        let value: any
        if (command.inputs[arg.name]) {
          const inp = command.inputs[arg.name]
          value = inp.clean(arg.value, this, arg.lineno)

          if ((inp as AnyParameter) instanceof ResultParameter) {
            references.push(value instanceof BaseCommand ? value.resultName : value)
          }
          if (Array.isArray(value)) {
            references = [
              ...references,
              ...flatten(value)
                .filter(item => item instanceof BaseCommand)
                .map(item => (item instanceof BaseCommand ? item.resultName : item)),
            ]
          }
        }
      })

      lookup.dependencies[command.resultName] = references

      references.forEach(reference => {
        lookup.dependents[reference] = lookup.dependents[reference] || []
        if (!lookup.dependents[reference].includes(command.resultName)) {
          lookup.dependents[reference].push(command.resultName)
        }
      })
    })

    return lookup
  }

  run = () => {
    const { dependents } = this.getDependencyLookup()

    Object.values(this.commands)
      .filter(command => !dependents[command.resultName])
      .forEach(command => {
        command.run()
      })
  }
}
