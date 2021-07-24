import Program from './program'
import { AnyParameter, Parameter } from './params'

export interface Argument {
  name: string
  value: any
  lineno?: number
}

export interface ListArgument extends Argument {
  listLinenos?: number[]
}

export interface Command {
  name: string
  displayName: string
  inputs: { [name: string]: Parameter }
  output: Parameter
  finished: boolean

  getResult(): any
  getMetadata(): { [key: string]: string } | null
  getArgumentValue(name: string, defaultValue?: any): any
  validateParams(params: any): any
  isValid(): boolean

  run(): void
}

export type CommandClass = { new (resultName: string, args: Argument[], program: Program, lineno: number): Command }

export class BaseCommand implements Partial<Command> {
  name = 'BaseCommand'

  inputs: { [name: string]: Parameter } = {}

  output = new AnyParameter()

  allowExtraArguments = false

  finished = false

  result: any = null

  resultName: string

  args: Argument[]

  program: Program

  lineno: number

  argumentLines: { [arg: string]: number }

  constructor(resultName: string, args: Argument[], program: Program, lineno: number) {
    this.resultName = resultName
    this.args = args
    this.program = program
    this.lineno = lineno
    this.argumentLines = {}

    this.args.forEach(arg => (this.argumentLines[arg.name] = arg.lineno || 0))
  }

  getResult = () => {
    if (!this.finished) {
      this.run()
    }

    return this.result
  }

  getMetadata = (): { [key: string]: string } | null => {
    const metadata = this.args.find(arg => arg.name === 'Metadata')
    if (!metadata) {
      return null
    }

    return this.inputs.Metadata?.clean(metadata.value, this.program, this.argumentLines[metadata.name])
  }

  getArgumentValue = (name: string, defaultValue?: any) => {
    const value = this.args.find(arg => arg.name === name)?.value
    if (value === undefined) {
      return defaultValue
    }
    return value
  }

  validateParams = (params: any): any => {
    const requiredInputs = Object.entries(this.inputs)
      .filter(([, value]) => value.required)
      .map(([key]) => key)
    const allInputs = Object.keys(this.inputs)

    const missingParams = requiredInputs.filter(p => !Object.keys(params).includes(p))
    if (missingParams.length) {
      throw new Error(
        `The command ${this.name} is missing the following required parameters: ${missingParams.join(', ')}`,
      )
    }

    const cleaned = {} as any
    Object.entries(params).forEach(([name, value]) => {
      if (!allInputs.includes(name)) {
        if (!this.allowExtraArguments) {
          throw new Error(`The command ${this.name} has no parameter named "${name}".`)
        } else {
          cleaned[name] = value
        }
      } else {
        cleaned[name] = this.inputs[name].clean(value, this.program, this.argumentLines[name])
      }
    })

    return cleaned
  }

  isValid = (): boolean => {
    const params: any = {}
    this.args.forEach(arg => (params[arg.name] = arg.value))

    try {
      this.validateParams(params)
      return true
    } catch {
      return false
    }
  }

  run = () => {
    if (this.finished) {
      return
    }

    const params: any = {}
    this.args.forEach(arg => (params[arg.name] = arg.value))

    this.result = this.execute(this.validateParams(params))
    this.finished = true
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute = (params: any): any => null
}
