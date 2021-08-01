import { CommandClass } from '../commands'
import { EEMSRead, EEMSWrite } from './eems/io'
import {
  Copy,
  AMinusB,
  Sum,
  WeightedSum,
  Multiply,
  ADividedByB,
  Minimum,
  Maximum,
  Mean,
  WeightedMean,
  Normalize,
  PrintVars,
} from './eems/basic'
import {
  CvtToFuzzy,
  CvtToFuzzyZScore,
  CvtToFuzzyCat,
  CvtToFuzzyCurve,
  CvtToFuzzyMeanToMid,
  CvtToFuzzyCurveZScore,
  CvtToBinary,
  FuzzyUnion,
  FuzzyWeightedUnion,
  FuzzySelectedUnion,
  FuzzyOr,
  FuzzyAnd,
  FuzzyXOr,
  FuzzyNot,
  CvtFromFuzzy,
} from './eems/fuzzy'

export type CommandLookup = { [name: string]: CommandClass }

export default {
  EEMSRead,
  EEMSWrite,

  Copy,
  AMinusB,
  Sum,
  WeightedSum,
  Multiply,
  ADividedByB,
  Minimum,
  Maximum,
  Mean,
  WeightedMean,
  Normalize,
  PrintVars,

  CvtToFuzzy,
  CvtToFuzzyZScore,
  CvtToFuzzyCat,
  CvtToFuzzyCurve,
  CvtToFuzzyMeanToMid,
  CvtToFuzzyCurveZScore,
  CvtToBinary,
  FuzzyUnion,
  FuzzyWeightedUnion,
  FuzzySelectedUnion,
  FuzzyOr,
  FuzzyAnd,
  FuzzyXOr,
  FuzzyNot,
  CvtFromFuzzy,
} as CommandLookup
