     __                                
    /\_\    ____   ___    ___   __  _  
    \/\ \  /',__\ / __`\/' _ `\/\ \/'\ 
     \ \ \/\__, `\\ \L\ \\ \/\ \/>  </ 
     _\ \ \/\____/ \____/ \_\ \_\\_/\_\
    /\ \_\ \/___/ \/___/ \/_/\/_///\/_/
    \ \____/                           
     \/___/                            

[jsonx][] is a pure JavaScript library to support XML to JSON transformations
and vice versa.

## JSON to XML

``` javascript
JSONX.build(Object[]|String)
```

## XML to JSON

``` javascript
JSONX.parse(Node|Node[]|NodeList|String)
```

## Stringify

``` javascript
JSONX.stringify(Node|Node[]|NodeList|String)
```

## Grammar

The following grammar (BNF) represents the XML to JSON transformation;

```
element
  = '[' element-name ',' attributes ',' element-list ']'
  | '[' element-name ',' attributes ']'
  | '[' element-name ',' element-list ']'
  | '[' element-name ']'
  | string
  ;
element-name
  = string
  ;
attributes
  = '{' attribute-list '}'
  | '{' '}'
  ;
attribute-list
  = attribute ',' attribute-list
  | attribute
  ;
attribute
  = attribute-name ':' attribute-value
  ;
attribute-name
  = string
  ;
attribute-value
  = string
  | number
  | 'true'
  | 'false'
  | 'null'
  ;
element-list
  = element ',' element-list
  | element
  ;
```

## Bugs

If you have any problems with this library or would like to see the changes
currently in development you can do so here;

https://github.com/neocotic/jsonx/issues

## Questions?

Take a look at the documentation to get a better understanding of what the code
is doing.

If that doesn't help, feel free to follow me on Twitter, [@neocotic][].

However, if you want more information or examples of using this library please
visit the project's homepage;

http://neocotic.com/jsonx

[@neocotic]: https://twitter.com/#!/neocotic
[jsonx]: http://neocotic.com/jsonx