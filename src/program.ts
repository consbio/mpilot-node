import parse from './parser'
import { CommandClass, Command, Argument, ListArgument } from './commands'
import defaultLookup, { CommandLookup } from './libraries'
import { ExpressionNode } from './parser/mpilot'

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
    const programNode = parse(source)

    if (programNode.version === 2) {
      throw new Error('EEMS v2 files are not supported.')
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

  commands: { [name: string]: Command } = {}

  constructor(lookup: CommandLookup = defaultLookup) {
    this.lookup = lookup
  }

  addCommand = (CommandCls: CommandClass, resultName: string, args: Argument[], lineno?: number): void => {
    if (Object.keys(this.commands).includes(resultName)) {
      throw new Error(`The result name "${resultName}" is duplicated in the command file.`)
    }

    this.commands[resultName] = new CommandCls(resultName, args, this, lineno || 0)
  }

  validate = () => {
    Object.values(this.commands).forEach(cmd => {
      cmd.isValid()
    })
  }

  run = () => {
    // Not implemented
  }
}
