import { BaseCommand, CommandConstructorArgs } from '../../commands'
import {
  DataParameter,
  DataTypeParameter,
  ListParameter,
  NumberParameter,
  PathParameter,
  ResultParameter,
  StringParameter,
} from '../../params'

export class EEMSRead extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'EEMSRead'
    this.displayName = 'Read'
    this.inputs = {
      ...this.inputs,
      InFileName: new PathParameter(true),
      InFieldName: new StringParameter(),
      ReturnType: new DataTypeParameter(undefined, false),
      NewFieldName: new StringParameter(false),
      MissingVal: new NumberParameter(false),
      DataType: new DataTypeParameter({ Float: (n: number) => n, Integer: (n: number) => Math.floor(n) }),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class EEMSWrite extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'EEMSWrite'
    this.displayName = 'Write'
    this.inputs = {
      ...this.inputs,
      OutFileName: new PathParameter(false),
      OutFieldNames: new ListParameter(new ResultParameter(new DataParameter())),
    }
  }

  execute = () => {}
}
