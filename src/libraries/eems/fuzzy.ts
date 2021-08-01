import { BaseCommand, CommandConstructorArgs } from '../../commands'
import {
  BooleanParameter,
  DataParameter,
  ListParameter,
  NumberParameter,
  ResultParameter,
  StringParameter,
} from '../../params'

export class CvtToFuzzy extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.fuzzy = true
    this.name = 'CvtToFuzzy'
    this.displayName = 'Convert to Fuzzy'
    this.inputs = {
      ...this.inputs,
      InFieldName: new ResultParameter(new DataParameter(), false),
      TrueThreshold: new NumberParameter(false),
      FalseThreshold: new NumberParameter(false),
      Direction: new StringParameter(false),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class CvtToFuzzyZScore extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.fuzzy = true
    this.name = 'CvtToFuzzyZScore'
    this.displayName = 'Convert to Fuzzy by Z Score'
    this.inputs = {
      ...this.inputs,
      InFieldName: new ResultParameter(new DataParameter(), false),
      TrueThresholdZScore: new NumberParameter(),
      FalseThresholdZScore: new NumberParameter(),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class CvtToFuzzyCat extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.fuzzy = true
    this.name = 'CvtToFuzzyCat'
    this.displayName = 'Convert to Fuzzy by Category'
    this.inputs = {
      ...this.inputs,
      InFieldName: new ResultParameter(new DataParameter(), false),
      RawValues: new ListParameter(new NumberParameter()),
      FuzzyValues: new ListParameter(new NumberParameter()),
      DefaultFuzzyValue: new NumberParameter(),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class CvtToFuzzyCurve extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.fuzzy = true
    this.name = 'CvtToFuzzyCurve'
    this.displayName = 'Convert to Fuzzy Curve'
    this.inputs = {
      ...this.inputs,
      InFieldNames: new ResultParameter(new DataParameter(), false),
      RawValues: new ListParameter(new NumberParameter()),
      FuzzyValues: new ListParameter(new NumberParameter()),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class CvtToFuzzyMeanToMid extends CvtToFuzzyCurve {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.fuzzy = true
    this.name = 'CvtToFuzzyMeanToMid'
    this.displayName = 'Mean To Mid'
    this.inputs = {
      ...this.inputs,
      InFieldName: new ResultParameter(new DataParameter(), false),
      IgnoreZeros: new BooleanParameter(),
      FuzzyValues: new ListParameter(new NumberParameter()),
    }
    this.output = new DataParameter()
  }
}

export class CvtToFuzzyCurveZScore extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.fuzzy = true
    this.name = 'CvtToFuzzyCurveZScore'
    this.displayName = 'Convert to Fuzzy Curve by Z Score'
    this.inputs = {
      ...this.inputs,
      InFieldName: new ResultParameter(new DataParameter(), false),
      ZScoreValues: new ListParameter(new NumberParameter()),
      FuzzyValues: new ListParameter(new NumberParameter()),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class CvtToBinary extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.fuzzy = true
    this.name = 'CvtToBinary'
    this.displayName = 'Convert to Fuzzy Binary'
    this.inputs = {
      ...this.inputs,
      InFieldName: new ResultParameter(new DataParameter(), false),
      Threshold: new NumberParameter(),
      Direction: new StringParameter(),
    }
    this.output = new DataParameter()
  }

  export = () => {}
}

export class FuzzyUnion extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.fuzzy = true
    this.name = 'FuzzyUnion'
    this.displayName = 'Fuzzy Union'
    this.inputs = {
      ...this.inputs,
      InFieldNames: new ListParameter(new ResultParameter(new DataParameter(), true)),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class FuzzyWeightedUnion extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.fuzzy = true
    this.name = 'FuzzyWeightedUnion'
    this.displayName = 'Fuzzy Weighted Union'
    this.inputs = {
      ...this.inputs,
      InFieldNames: new ListParameter(new ResultParameter(new DataParameter(), true)),
      Weights: new ListParameter(new NumberParameter()),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class FuzzySelectedUnion extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.fuzzy = true
    this.name = 'FuzzySelectedUnion'
    this.displayName = 'Fuzzy Selected Union'
    this.inputs = {
      ...this.inputs,
      InFieldNames: new ListParameter(new ResultParameter(new DataParameter(), true)),
      TruestOrFalsest: new StringParameter(),
      NumberToConsider: new NumberParameter(),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class FuzzyOr extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.fuzzy = true
    this.name = 'FuzzyOr'
    this.displayName = 'Fuzzy Or'
    this.inputs = {
      ...this.inputs,
      InFieldNames: new ListParameter(new ResultParameter(new DataParameter(), true)),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class FuzzyAnd extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.fuzzy = true
    this.name = 'FuzzyAnd'
    this.displayName = 'Fuzzy And'
    this.inputs = {
      ...this.inputs,
      InFieldNames: new ListParameter(new ResultParameter(new DataParameter(), true)),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class FuzzyXOr extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.fuzzy = true
    this.name = 'FuzzyXOr'
    this.displayName = 'Fuzzy XOr'
    this.inputs = {
      ...this.inputs,
      InFieldNames: new ListParameter(new ResultParameter(new DataParameter(), true)),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class FuzzyNot extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.fuzzy = true
    this.name = 'FuzzyNot'
    this.displayName = 'Fuzzy Not'
    this.inputs = {
      ...this.inputs,
      InFieldName: new ResultParameter(new DataParameter(), true),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}

export class CvtFromFuzzy extends BaseCommand {
  constructor(...args: CommandConstructorArgs) {
    super(...args)

    this.name = 'CvtFromFuzzy'
    this.displayName = 'Convert from Fuzzy'
    this.inputs = {
      ...this.inputs,
      InFieldName: new ResultParameter(new DataParameter(), true),
      TrueThreshold: new NumberParameter(),
      FalseThreshold: new NumberParameter(),
    }
    this.output = new DataParameter()
  }

  execute = () => {}
}
