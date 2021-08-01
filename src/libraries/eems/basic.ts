import { BaseCommand, CommandConstructorArgs } from '../../commands'
import {
  BooleanParameter,
  DataParameter,
  ListParameter,
  NumberParameter,
  PathParameter,
  ResultParameter,
} from '../../params'

export class Copy extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'Copy'
    this.displayName = 'Copy'
    this.inputs = {
      ...this.inputs,
      InFieldName: new ResultParameter(new DataParameter()),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class AMinusB extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'AMinusB'
    this.displayName = 'A Minus B'
    this.inputs = {
      ...this.inputs,
      A: new ResultParameter(new DataParameter(), false),
      B: new ResultParameter(new DataParameter(), false),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class Sum extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'Sum'
    this.displayName = 'Sum'
    this.inputs = {
      ...this.inputs,
      InFieldNames: new ListParameter(new ResultParameter(new DataParameter(), false)),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class WeightedSum extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'WeightedSum'
    this.displayName = 'Weighted Sum'
    this.inputs = {
      ...this.inputs,
      InFieldNames: new ListParameter(new ResultParameter(new DataParameter(), false)),
      Weights: new ListParameter(new NumberParameter()),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class Multiply extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'Multiply'
    this.displayName = 'Multiply'
    this.inputs = {
      ...this.inputs,
      InFieldNames: new ListParameter(new ResultParameter(new DataParameter(), false)),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class ADividedByB extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'ADividedByB'
    this.displayName = 'A Divided By B'
    this.inputs = {
      ...this.inputs,
      A: new ResultParameter(new DataParameter(), false),
      B: new ResultParameter(new DataParameter(), false),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class Minimum extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'Minimum'
    this.displayName = 'Minimum'
    this.inputs = {
      ...this.inputs,
      InFieldName: new ListParameter(new ResultParameter(new DataParameter(), false)),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class Maximum extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'Maximum'
    this.displayName = 'Maximum'
    this.inputs = {
      ...this.inputs,
      InFieldNames: new ListParameter(new ResultParameter(new DataParameter(), false)),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class Mean extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'Mean'
    this.displayName = 'Mean'
    this.inputs = {
      ...this.inputs,
      InFieldNames: new ListParameter(new ResultParameter(new DataParameter(), false)),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class WeightedMean extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'WeightedMean'
    this.displayName = 'Weighted Mean'
    this.inputs = {
      ...this.inputs,
      InFieldNames: new ListParameter(new ResultParameter(new DataParameter(), false)),
      Weights: new ListParameter(new NumberParameter()),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class Normalize extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'Normalize'
    this.displayName = 'Normalize'
    this.inputs = {
      ...this.inputs,
      InFieldName: new ResultParameter(new DataParameter(), false),
      StartVal: new NumberParameter(false),
      EndVal: new NumberParameter(false),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class PrintVars extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'PrintVars'
    this.displayName = 'Print variable(s) to screen or file'
    this.inputs = {
      ...this.inputs,
      InFieldNames: new ListParameter(new ResultParameter()),
      OutFileName: new PathParameter(false, false),
    }
    this.output = new BooleanParameter()
  }

  execute = () => {}
}
