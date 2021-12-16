# MPilot JS

This is the JavaScript implementation of the [MPilot](https://github.com/consbio/mpilot) environmental modeling 
framework.

MPilot is an environmental modeling framework based on a bottom-up, many-to-many workflow that can be represented by a 
directed (not iterating) graph. Mpilot is descended from the Environmental Evaluation Modeling System (EEMS), which was
initially a fuzzy logic modeling package based on EMDS.

MPilot JS is currently capable of parsing models, but cannot run them.

# Creating models

MPilot models are contained in "command files", using a simple scripting language. Here is an example model, which 
loads two columns of integer data from a CSV file, sums them, and writes the result to a second CSV file.

```text
A = EEMSRead(
    InFileName = "input.csv",
    InFieldName = "A",
    DataType = "Integer"
)
B = EEMSRead(
    InFileName = "input.csv",
    InFieldName = "B",
    DataType = "Integer"
)
APlusB = Sum(
    InFieldNames = [A, B]
)
Out = EEMSWrite(
    OutFileName = "output.csv",
    OutFieldNames = [A, B, APlusB]
)
```
