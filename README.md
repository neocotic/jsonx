## API

> *JSONX*.**build**(value)

TODO: Method description

**Parameters:**

* *{String|Array}* **value**  
TODO: Parameter description

**Returns:**

*{Node[]}* TODO: Return description

> *JSONX*.**parse**(value)

TODO: Method description

**Parameters:**

* *{String|Node|Node[]|NodeList}* **value**  
TODO: Parameter description

**Returns:**

*{Array}* TODO: Return description

> *JSONX*.**stringify**(value)

TODO: Method description

**Parameters:**

* *{Array|Node|Node[]|NodeList}* **value**  
TODO: Parameter description

**Returns:**

*{String}* TODO: Return description

## Grammar ([BNF](http://en.wikipedia.org/wiki/Backus%E2%80%93Naur_Form))

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