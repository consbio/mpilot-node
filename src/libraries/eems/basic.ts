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

export class NormalizeZScore extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'NormalizeZScore'
    this.displayName = 'Normalize by Z Score'
    this.inputs = {
      ...this.inputs,
      InFieldName: new ResultParameter(new DataParameter(), false),
      TrueThresholdZScore: new NumberParameter(false),
      FalseThresholdZScore: new NumberParameter(false),
      StartVal: new NumberParameter(false),
      EndVal: new NumberParameter(false),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class NormalizeCat extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'NormalizeCat'
    this.displayName = 'Normalize by Category'
    this.inputs = {
      ...this.inputs,
      InFieldName: new ResultParameter(new DataParameter(), false),
      RawValues: new ListParameter(new NumberParameter()),
      NormalValues: new ListParameter(new NumberParameter()),
      DefaultNormalValue: new NumberParameter(),
      StartVal: new NumberParameter(false),
      EndVal: new NumberParameter(false),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class NormalizeCurve extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'NormalizeCurve'
    this.displayName = 'Normalize Curve'
    this.inputs = {
      ...this.inputs,
      InFieldName: new ResultParameter(new DataParameter(), false),
      RawValues: new ListParameter(new NumberParameter()),
      NormalValues: new ListParameter(new NumberParameter()),
      StartVal: new NumberParameter(false),
      EndVal: new NumberParameter(false),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class NormalizeMeanToMid extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'NormalizeMeanToMid'
    this.displayName = 'Mean to Mid'
    this.inputs = {
      ...this.inputs,
      InFieldName: new ResultParameter(new DataParameter(), false),
      IgnoreZeros: new BooleanParameter(),
      NormalValues: new ListParameter(new NumberParameter()),
      StartVal: new NumberParameter(false),
      EndVal: new NumberParameter(false),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class NormalizeCurveZScore extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'NormalizeCurveZScore'
    this.displayName = 'Normalize Curve by Z Score'
    this.inputs = {
      ...this.inputs,
      InFieldName: new ResultParameter(new DataParameter(), false),
      ZScoreValues: new ListParameter(new NumberParameter()),
      NormalValues: new ListParameter(new NumberParameter()),
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
