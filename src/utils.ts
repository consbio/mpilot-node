import { CommandNode } from './parser/mpilot'

const EEMS_COMMANDS = {
  READ: 'EEMSRead',
  CVTTOFUZZY: 'CvtToFuzzy',
  CVTTOFUZZYCURVE: 'CvtToFuzzyCurve',
  CVTTOFUZZYCAT: 'CvtToFuzzyCat',
  MEANTOMID: 'MeanToMid',
  COPYFIELD: 'Copy',
  NOT: 'FuzzyNot',
  OR: 'FuzzyOr',
  AND: 'FuzzyAnd',
  ORNEG: 'FuzzyAnd',
  XOR: 'FuzzyXOr',
  SUM: 'Sum',
  MULT: 'Multiply',
  DIVIDE: 'ADividedByB',
  MIN: 'Minimum',
  MAX: 'Maximum',
  MEAN: 'Mean',
  UNION: 'FuzzyUnion',
  DIF: 'AMinusB',
  SELECTEDUNION: 'FuzzySelectedUnion',
  WTDUNION: 'FuzzyWeightedUnion',
  WTDMEAN: 'WeightedMean',
  WTDSUM: 'WeightedSum',
  SCORERANGEBENEFIT: 'ScoreRangeBenefit',
  SCORERANGECOST: 'ScoreRangeCost',
} as any

// eslint-disable-next-line import/prefer-default-export
export const convertEems2Commands = (commandNodes: CommandNode[]): CommandNode[] => {
  const findArgument = (node: CommandNode, name: string): string | void =>
    node.arguments.find(a => a.name === name)?.value.value

  return commandNodes
    .map((node: CommandNode) => {
      const resultName = node.resultName || findArgument(node, 'NewFieldName') || findArgument(node, 'InFieldName')
      if (!resultName) {
        throw new Error('Cannot convert from EEMS 2.0: No InFieldName argument for command without a result name.')
      }

      return {
        resultName,
        command: EEMS_COMMANDS[node.command] || node.command,
        arguments: node.arguments.filter(a => !['NewFieldName', 'OutFileName'].includes(a.name)),
        lineno: node.lineno,
      } as CommandNode
    })
    .filter((node: CommandNode) => node.resultName !== 'CSVIndex')
}
