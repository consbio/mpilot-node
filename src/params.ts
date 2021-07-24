import Program from './program'

export interface Parameter {
  required: boolean

  clean: (value: any, program?: Program, lineno?: number) => any
  accepts?: (parameterCls: { new (): Parameter }) => boolean
}

export class AnyParameter implements Parameter {
  required: boolean

  constructor(required: boolean = true) {
    this.required = required
  }

  clean(value: any): any {
    return value
  }
}

export class StringParameter extends AnyParameter {
  clean(value: any): string {
    return `${value}`
  }

  static accepts(parameterCls: { new (): Parameter }): boolean {
    // Todo
    return !!parameterCls
  }
}

export class NumberParameter extends AnyParameter {
  clean(value: any): number {
    if (typeof value === 'number') {
      return value
    }

    const parsed = Number.parseFloat(value)
    if (Number.isNaN(parsed)) {
      throw new Error(`${value} is not a number`)
    }

    return parsed
  }
}

export class BooleanParameter extends AnyParameter {
  clean(value: any): boolean {
    if (typeof value === 'boolean') {
      return value
    }

    if (typeof value === 'number') {
      return value !== 0
    }

    if (typeof value === 'string') {
      if (value.toLowerCase() === 'true') {
        return true
      }
      if (value.toLowerCase() === 'false') {
        return false
      }

      const number = Number.parseFloat(value)
      if (Number.isNaN(number)) {
        return this.clean(number)
      }
    }

    throw new Error(`${value} is not a boolean`)
  }
}

export class PathParameter extends StringParameter {}

export class ResultParameter extends AnyParameter {
  outputType: Parameter

  isFuzzy: boolean | null

  constructor(outputType: Parameter, isFuzzy?: boolean | null, required?: boolean) {
    super(required)

    this.outputType = outputType
    this.isFuzzy = isFuzzy === undefined ? null : isFuzzy
  }

  // todo: add return type
  clean(value: any, program?: Program, lineno?: number): any {
    let _value = value

    if (typeof _value === 'string' && program) {
      if (_value in program.commands) {
        _value = program.commands[_value]
      } else {
        throw new Error(`The command ${_value} does not exist`)
      }
    }

    // Todo check for command type

    if (this.isFuzzy === true && !_value.isFuzzy) {
      throw new Error(`The command ${_value} is not fuzzy`)
    }

    if (this.isFuzzy === false && _value.isFuzzy === true) {
      throw new Error(`The command ${_value} is fuzzy`)
    }

    if (!this.outputType) {
      return _value
    }

    if (_value.isFinished) {
      this.outputType.clean(_value.getResult(), program, lineno)
      return _value
    }
    if (_value.output) {
      let isValid
      if (this.outputType.accepts) {
        isValid = this.outputType.accepts(_value.output)
      } else {
        isValid = _value.output instanceof Object.getPrototypeOf(this.outputType)
      }
      if (!isValid) {
        throw new Error(`The command ${_value} does not return the correct type`)
      }
    }

    return _value
  }
}

export class ListParameter extends AnyParameter {
  valueType: Parameter

  constructor(valueType: Parameter, required?: boolean) {
    super(required)

    this.valueType = valueType
  }

  clean(value: any, program?: Program, lineno?: number): any[] {
    if (!Array.isArray(value)) {
      throw new Error(`${value} is not a list`)
    }

    return value.map(item => this.valueType.clean(item.value, program, lineno)) // todo check if item is Argument
  }
}

export class TupleParameter extends AnyParameter {
  clean(value: any): any {
    if (value === []) {
      return value
    }

    if (Object.prototype.toString.call(value) !== '[object Object]') {
      throw new Error(`${value} is not a tuple`)
    }

    return value
  }
}
