export interface ProgramNode {
  commands: CommandNode[]
  version: 2 | 3
}

export interface CommandNode {
  resultName: string
  command: string
  arguments: ArgumentNode[]
  lineno: number
}

export interface ArgumentNode {
  name: string
  value: ExpressionNode
  lineno: number
}

export interface ExpressionNode {
  value: any
  lineno: number
}

export function parse(input: string): ProgramNode
