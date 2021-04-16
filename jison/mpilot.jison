%lex

%%
\s+                                           /* skip whitespace */
"#".*                                         /* ignore comments */
":"                                           return "COLON";
","                                           return "COMMA";
"="                                           return "EQUAL";
"False"                                       return "FALSE";
[\-\+]?((\d+\.\d*)|(\.\d+))([eE][\+\-]?\d+)?  return "FLOAT";
[a-zA-Z_][a-zA-Z_0-9]*                        return "ID";
[\-\+]?\d+                                    return "INT";
"["                                           return "LBRACK";
"("                                           return "LPAREN";
[^\#\:\,\=\(\)\[\]\"\'\r\n]+                  return "PLAIN_STRING";
"]"                                           return "RBRACK";
")"                                           return "RPAREN";
(\"(\\.|[^\"\\])*\")|(\'(\\.|[^\'\\])*\')     return "STRING";
"True"                                        return "TRUE";
<<EOF>>                                       return "EOF";

/lex

%start program

%%

program
    : commands EOF
        {return {commands: $1, version: yy.parser.EEMSv2 ? 2 : 3};}
    ;

commands
    : command commands
        {$$ = [].concat([$1], $2);}
    | command
        {$$ = [$1];}
    ;

command
    : ID EQUAL ID arguments
        {$$ = {resultName: $1, command: $3, arguments: $4, lineno: this._$.first_line};}
    | ID arguments
        {yy.parser.EEMSv2 = true; $$ = {resultName: null, command: $1, arguments: $2, lineno: this._$.first_line};}
    ;

arguments
    : LPAREN argument_list RPAREN
        {$$ = $2;}
    | LPAREN RPAREN
        {$$ = [];}
    ;

argument_list
    : argument COMMA argument_list
      {$$ = [].concat([$1], $3);}
    | argument COMMA
      {$$ = [$1];}
    | argument
      {$$ = [$1];}
    ;

argument
    : ID EQUAL expression
        {$$ = {name: $1, value: $3, lineno: this._$.first_line};}
    ;

expression
    : ID
        {$$ = {value: yytext, lineno: this._$.first_line};}
    | plain_string
        {$$ = {value: $1, lineno: this._$.first_line};}
    | STRING
        {$$ = {value: yytext.substr(1, yytext.length-2), lineno: this._$.first_line};}
    | number
        {$$ = {value: $1, lineno: this._$.first_line};}
    | list
        {$$ = {value: $1, lineno: this._$.first_line};}
    | boolean
        {$$ = {value: $1, lineno: this._$.first_line};}
    | ID expression
        {$$ = {value: $1 + $2.value, lineno: this._$.first_line};}
    ;

plain_string
    : PLAIN_STRING
        {$$ = yytext;}
    | ID
        {$$ = yytext;}
    | PLAIN_STRING COLON plain_string
        {$$ = $1 + ":" + $3;}
    | ID COLON plain_string
        {$$ = $1 + ":" + $3;}
    ;

number
    : INT
        {$$ = Number.parseInt(yytext);}
    | FLOAT
        {$$ = Number.parseFloat(yytext);}
    ;

list
    : LBRACK elements RBRACK
        {$$ = $2;}
    | LBRACK RBRACK
        {$$ = [];}
    ;

elements
    : element COMMA elements
        {$$ = [].concat([$1], $3);}
    | element COMMA
        {$$ = [$1];}
    | element
        {$$ = [$1];}
    | tuple_pairs
        {$$ = $1;}
    ;

element
    : expression
        {$$ = $1;}
    ;

tuple_pairs
    : tuple_pair COMMA tuple_pairs
        {$$ = Object.assign({}, $3, $1);}
    | tuple_pair COMMA
        {$$ = $1;}
    | tuple_pair
        {$$ = $1;}
    ;

tuple_pair
    : STRING COLON expression
        {$$ = {[$1.substr(1, $1.length-2)]: $3};}
    | PLAIN_STRING COLON expression
        {$$ = {[$1]: $3};}
    | ID COLON expression
        {$$ = {[$1]: $3};}
    ;

boolean
    : TRUE
        {$$ = true;}
    | FALSE
        {$$ = false;}
    ;
