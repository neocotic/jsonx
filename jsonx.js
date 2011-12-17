// [jsonx](http://neocotic.com/jsonx) 1.0.0  
// (c) 2011 Alasdair Mercer  
// jsonx is freely distributable under the MIT license.  
// Portions of jsonx are inspired or borrowed from jQuery.  
// For all details and documentation:  
// <http://neocotic.com/jsonx>  
// Some parts are based on jQuery JavaScript Library v1.6.2  
// <http://jquery.com>  
// © 2011 John Resig  
// Dual licensed under the MIT or GPL Version 2 licenses.  
// <http://jquery.org/license>

var JSONX = JSONX || {};
(function (window, undefined) {

  var
    document = window.document,
    rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    rclickable = /^a(?:rea)?$/i,
    rfocusable = /^(?:button|input|object|select|textarea)$/i,
    rinvalidChar = /\:|^on/,
    rtype = /^(?:button|input)$/i,
    boolHook,
    formHook,
    helper = {
      attr: function (ele, notXml, name, value) {
        var hooks, ret;
        if (!('getAttribute' in ele)) {
          return helper.prop(ele, notXml, name, value);
        }
        name = notXml && helper.attrFix[name] || name;
        hooks = helper.attrHooks[name];
        if (!hooks) {
          if (rboolean.test(name)) {
              hooks = boolHook;
          } else if (formHook && name !== 'className' &&
                    (helper.nodeName(ele, 'form') ||
                     rinvalidChar.test(name))) {
            hooks = formHook;
          }
        }
        if (value !== undefined) {
          if (value === null) {
            return undefined;
          } else if (hooks && 'set' in hooks && notXml &&
                    (ret = hooks.set(ele, value, name)) !== undefined) {
            return ret;
          } else {
            ele.setAttribute(name, '' + value);
            return value;
          }
        } else if (hooks && 'get' in hooks && notXml &&
                  (ret = hooks.get(ele, name)) !== null) {
          return ret;
        } else {
          ret = ele.getAttribute(name);
          return ret === null ? undefined : ret;
        }
      },
      attributes: function (ele, map) {
        var
          name,
          notXml = ele.nodeType !== 1 || !helper.isXml(ele);
        if (map === undefined) {
          map = {};
          if (ele.attributes.length > 0) {
            for (var i = 0; i < ele.attributes.length; i++) {
              name = ele.attributes[i].name;
              name = notXml && helper.propFix[name] || name;
              map[name] = helper.attr(ele, notXml, name);
            }
          }
          return map;
        } else {
          for (name in map) helper.attr(ele, notXml, name, map[name]);
        }
      },
      attrFix: {
        tabindex: 'tabIndex'
      },
      attrHooks: {
        tabIndex: {
          get: function (ele) {
            var
              attrNode = ele.getAttributeNode('tabIndex'),
              ret;
            if (attrNode && attrNode.specified) {
              ret = parseInt(attrNode.value, 10);
            } else if (rfocusable.test(ele.nodeName) ||
                       rclickable.test(ele.nodeName) && ele.href) {
              ret = 0;
            }
            return ret;
          }
        },
        type: {
          set: function (ele, value) {
            var val;
            if (rtype.test(ele.nodeName) && ele.parentNode) {
              throw new Error('Can\'t change attribute: type');
            } else if (!helper.support.radioValue && value === 'radio' &&
                       helper.nodeName(ele, 'input')) {
              val = ele.value;
              ele.setAttribute('type', value);
              if (val) ele.value = val;
              return value;
            }
          }
        },
        value: {
          get: function (ele, name) {
            if (formHook && helper.nodeName(ele, 'button')) {
              return formHook.get(ele, name);
            }
            return name in ele ? ele.value : null;
          },
          set: function (ele, value, name) {
            if (formHook && helper.nodeName(ele, 'button')) {
              return formHook.set(ele, value, name);
            }
            ele.value = value;
          }
        }
      },
      classToType: {},
      contents: function (ele) {
        if (helper.nodeName(ele, 'iframe')) {
          ele = ele.contentDocument || ele.contentWindow.document;
        }
        return helper.makeArray(ele.childNodes);
      },
      each: function (obj, callback, delimiter) {
        var name;
        if (delimiter === undefined) delimiter = ' ';
        switch (helper.type(obj)) {
        case 'string':
          obj = obj.split(delimiter);
        case 'array':
          for (name in obj) {
            if (callback.call(obj[name], name, obj[name]) === false) break;
          }
          break;
        case 'object':
          for (var i = 0; i < obj.length;) {
            if (callback.call(obj[i], i, obj[i++]) === false) break;
          }
        }
        return obj;
      },
      isArray: Array.isArray || function (obj) {
        return helper.type(obj) === 'array';
      },
      isEmptyObject: function (obj) {
        var name;
        for (name in obj) return false;
        return true;
      },
      isPlainObject: function (obj) {
        var key;
        if (!obj || helper.type(obj) !== 'object' || obj.nodeType ||
            helper.isWindow(obj)) {
          return false;
        }
        if (obj.constructor &&
           !Object.prototype.hasOwnProperty.call(obj, 'constructor') &&
           !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
          return false;
        }
        for (key in obj) {}
        return key === undefined || Object.prototype.hasOwnProperty.call(obj, key);
      },
      isWindow: function (obj) {
        return obj && helper.type(obj) === 'object' && 'setInterval' in obj;
      },
      isXml: function (ele) {
        ele = (ele ? ele.ownerDocument || ele : 0).documentElement;
        return ele ? ele.nodeName.toLowerCase() !== 'html' : false;
      },
      makeArray: function (array) {
        var ret = [], type;
        if (array !== null) {
          type = helper.type(array);
          if (array.length === null || type === 'string' ||
              type === 'function' || type === 'regexp' ||
              helper.isWindow(array)) {
            Array.prototype.push.call(ret, array);
          } else {
            helper.merge(ret, array);
          }
        }
        return ret;
      },
      merge: function (first, second) {
        var
          i = first.length,
          j = 0,
          k;
        if (helper.type(second.length) === 'number') {
          for (k = second.length; j < k; j++) first[i++] = second[j];
        } else {
          while (second[j] !== undefined) first[i++] = second[j++];
        }
        first.length = i;
        return first;
      },
      nodeName: function (ele, name) {
        return ele.nodeName && ele.nodeName.toUpperCase() === name.toUpperCase();
      },
      prop: function (ele, notXml, name, value) {
        var hooks, ret;
        name = notXml && helper.propFix[name] || name;
        hooks = helper.propHooks[name];
        if (value !== undefined) {
          if (hooks && 'set' in hooks &&
             (ret = hooks.set(ele, value, name)) !== undefined) {
            return ret;
          } else {
            return (ele[name] = value);
          }
        } else {
          if (hooks && 'get' in hooks &&
             (ret = hooks.get(ele, name)) !== undefined) {
            return ret;
          } else {
            return ele[name];
          }
        }
      },
      propFix: {
        cellspacing     : 'cellSpacing',
        cellpadding     : 'cellPadding',
        'class'         : 'className',
        colspan         : 'colSpan',
        contenteditable : 'contentEditable',
        'for'           : 'htmlFor',
        frameborder     : 'frameBorder',
        maxlength       : 'maxLength',
        readonly        : 'readOnly',
        rowspan         : 'rowSpan',
        tabindex        : 'tabIndex',
        usemap          : 'useMap'
      },
      propHooks: {},
      support: (function () {
        var
          a,
          div = document.createElement('div'),
          input,
          opt,
          select;
        div.setAttribute('className', 't');
        div.innerHTML = '<a href="/a" style="top:1px;">a</a>';
        a = div.getElementsByTagName('a')[0];
        select = document.createElement('select');
        opt = select.appendChild(document.createElement('option'));
        var support = {
          hrefNormalized  : a.getAttribute('href') === '/a',
          getSetAttribute : div.className !== 't',
          optSelected     : opt.selected,
          style           : /top/.test(a.getAttribute('style'))
        };
        input = document.createElement('input');
        input.value = 't';
        input.setAttribute('type', 'radio');
        support.radioValue = input.value === 't';
        return support;
      }()),
      type: function (obj) {
        if (obj === null) return String(obj);
        return helper.classToType[Object.prototype.toString.call(obj)] || 'object';
      }
  };

  helper.each('Boolean Number String Function Array Date RegExp Object',
      function (i, name) {
          helper.classToType['[object ' + name + ']'] = name.toLowerCase();
      }
  );
  boolHook = {
    get: function (ele, name) {
      return helper.prop(ele, name) ? name.toLowerCase() : undefined;
    },
    set: function (ele, value, name) {
      var propName;
      if (value === true) {
        propName = helper.propFix[name] || name;
        if (propName in ele) ele[propName] = true;
        ele.setAttribute(name, name.toLowerCase());
      }
      return name;
    }
  };
  if (!helper.support.getSetAttribute) {
    helper.attrFix = helper.propFix;
    formHook = helper.attrHooks.name = helper.attrHooks.title = {
      get: function (ele, name) {
        var ret = ele.getAttributeNode(name);
        return ret && ret.nodeValue !== '' ? ret.nodeValue : undefined;
      },
      set: function (ele, value, name) {
        var ret = ele.getAttributeNode(name);
        if (ret) {
          ret.nodeValue = value;
          return value;
        }
      }
    };
    helper.each('width height', function (i, name) {
      helper.attrHooks[name] = helper.attrHooks[name] || {};
      helper.attrHooks[name].set = function (ele, value) {
        if (value === '') {
          ele.setAttribute(name, 'auto');
          return value;
        }
      };
    });
  }
  if (!helper.support.hrefNormalized) {
    helper.each('href src width height', function (i, name) {
      helper.attrHooks[name] = helper.attrHooks[name] || {};
      helper.attrHooks[name].get = function (ele) {
        var ret = ele.getAttribute(name, 2);
        return ret === null ? undefined : ret;
      };
    });
  }
  if (!helper.support.style) {
    helper.attrHooks.style = {
      get: function (ele) {
        return ele.style.cssText.toLowerCase() || undefined;
      },
      set: function (ele, value) {
        return (ele.style.cssText = '' + value);
      }
    };
  }
  if (!helper.support.optSelected) {
    helper.attrHooks.selected = helper.attrHooks.selected || {};
    helper.propHooks.selected.get = function (ele) {
      var parent = ele.parentNode;
      if (parent) {
        parent.selectedIndex;
        if (parent.parentNode) parent.parentNode.selectedIndex;
      }
    };
  }

  if (helper.type(JSONX.build) !== 'function') {
    // Build XML based on the JSON provided.  
    // If the argument is a string it is parsed in to JSON before being
    // processed.  
    // XML is built in the same hierarchy in which it is defined in the JSON
    // structure and all attributes are transferred.
    JSONX.build = function (value) {
      if (helper.type(value) === 'undefined') return;
      function convertJsonx(obj, parent) {
        var array = [], ele = {};
        if (helper.isArray(obj)) {
          if (!obj.length || helper.type(obj[0]) !== 'string') {
            throw new SyntaxError('JSONX.build');
          }
          ele = document.createElement(obj[0]);
          if (obj.length > 1) {
            if (helper.isPlainObject(obj[1])) {
              helper.attributes(ele, obj[1]);
              if (obj.length > 2) array = Array.prototype.slice.call(obj, 2);
            } else {
              array = Array.prototype.slice.call(obj, 1);
            }
            if (array.length) convertJsonx(array, ele);
          }
        } else if (helper.type(obj) === 'string') {
          parent.appendChild(obj);
        }
        return parent;
      }
      if (helper.type(value) === 'string') value = JSONX.parse(value);
      if (!helper.isArray(value)) throw new TypeError('JSONX.build');
      return helper.contents(convertJsonx(value, document.createElement('x')));
    };
  }

  if (helper.type(JSONX.parse) !== 'function') {
    // Parse the object provided in to JSON.  
    // If the argument is a string it is parsed in to JSON. This basically acts
    // as a shortcut method to `JSON.parse` in this case.  
    // JSON is built in the same hierarchy in which it is defined in the XML
    // structure and all attributes are transferred.
    JSONX.parse = function (value) {
      if (helper.type(value) === 'undefined') return;
      function convertNodes(array) {
        var attrs, contents, obj, ret = [];
        for (var i = 0; i < array.length; i++) {
            var j;
            obj = array[i];
            contents = helper.contents(obj);
            Array.prototype.push.call(ret, obj.nodeName.toLowerCase());
            attrs = helper.attributes(obj);
            if (!helper.isEmptyObject(attrs)) {
              Array.prototype.push.call(ret, attrs);
            }
            if (contents.length) {
              for (j = 0; j < contents.length; j++) {
                if (contents[j].nodeType === 3) {
                  Array.prototype.push.call(ret, contents[j].textContent);
                } else {
                  Array.prototype.push.call(ret, convertNodes([contents[j]]));
                }
              }
            }
        }
        return ret;
      }
      switch (helper.type(value)) {
      case 'string':
        return JSON.parse(value);
      case 'array':
        return convertNodes(value);
      case 'object':
        if (helper.type(value.nodeType) === 'number') {
          return convertNodes([value]);
        }
        if (helper.type(value.length) === 'number') {
          return convertNodes(helper.makeArray(value));
        }
      }
      throw new TypeError('JSONX.parse');
    };
  }

  if (helper.type(JSONX.stringify) !== 'function') {
    // Transform the XML or JSON provided in to a string representation of
    // themselves.  
    // If the argument is XML then it is parsed in to JSON before being
    // transformed in to a string.
    JSONX.stringify = function (value) {
      var type = helper.type(value);
      if (type === 'undefined') return;
      if ((type === 'array' && value.length > 0 && value[0].nodeType) ||
          type === 'object') {
        value = JSONX.parse(value);
      }
      if (helper.isArray(value)) return JSON.stringify(value);
      throw new TypeError('JSONX.stringify');
    };
  }

}(window));