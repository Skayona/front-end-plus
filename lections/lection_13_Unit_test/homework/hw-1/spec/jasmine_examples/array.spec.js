describe("Some", function () {
  const ARR = require('../../lib/jasmine_examples/array');

  describe("findById", function () {
    beforeEach(function () {
      id = 1;
      newArr = [{
        id
      }];
    });

    it("should be return array element with current id", function () {
      let resp = ARR.findById(newArr, id);

      expect(resp).toEqual(newArr[0]);
    })

    it("should be return an empty object", function () {
      let resp = ARR.findById([], id);

      expect(resp).toEqual({});
    })

    it("should be return an empty object", function () {
      let resp = ARR.findById(newArr);

      expect(resp).toEqual({});
    })

    it("should be return an empty object", function () {
      let resp = ARR.findById();

      expect(resp).toEqual({});
    })

  });

  describe('fromString', function () {
    beforeEach(function () {
      str_1 = 'some-string- --finish';
      str_2 = 'some,string,,,finish,'
      separator = '-';
    })

    it('should be return an array without dashes, length = 4', function () {
      let resp = ARR.fromString(str_1, separator);

      expect(resp).toEqual(['some', 'string', ' ', 'finish']);
      expect(resp.length).toEqual(4);
    })

    it('should be return an array without commas, length 3', function () {
      let resp = ARR.fromString(str_2);

      expect(resp).toEqual(['some', 'string', 'finish']);
      expect(resp.length).toEqual(3);
    })

    it('should be return an empty array', function () {
      let resp = ARR.fromString();

      expect(resp).toEqual([]);
    })

    it('should be return an error', function () {
      expect(function () {
        ARR.fromString(1);
      }).toThrowError('str.split is not a function');
    })
  })

  describe('_equals', function () {
    beforeEach(function () {
      a1 = 23;
      b1 = {
        0: 'd',
        1: '4',
        2: '3'
      };

      a2 = 'd43';
      b2 = {
        0: 'd',
        1: '4',
        2: 3
      };
      simple = true;
    })

    it('should be return false', function () {
      let resp = ARR._equals(a2, b2);

      expect(resp).toBe(false);
    })

    it('should be return false', function () {
      let resp = ARR._equals(a1, b1, simple);

      expect(resp).toBe(false);
    })

    it('should be return true', function () {
      let resp = ARR._equals(a2, b2, simple);

      expect(resp).toBe(true);
    })

    it('should be return true', function () {
      let resp = ARR._equals(a2, b1);

      expect(resp).toBe(true);
    })

    it('should be return an error', function () {
      expect(function () {
        ARR._equals();
      }).toThrowError('Cannot convert undefined or null to object');
    })
  })

  describe('find', function () {
    beforeEach(function () {
      arr1 = ['d43', 2, 10];
      arr2 = ['dsd43', 2, 10];
      obj1 = {
        0: 'd',
        1: '4',
        2: '3'
      };
      obj2 = {
        0: 'd',
        1: '4',
        2: 3
      };
      simple = true;
    })

    it('should be return {}', function () {
      let resp = ARR.find();

      expect(resp).toEqual({});
    })

    it('should be return array[i]', function () {
      let resp = ARR.find(arr1, obj1);

      expect(resp).toEqual('d43');
    })

    it('should be return array[i]', function () {
      let resp = ARR.find(arr1, obj2, simple);

      expect(resp).toEqual('d43');
    })

    it('should be return array[i]', function () {
      let resp = ARR.find(arr1, obj1, simple);

      expect(resp).toEqual('d43');
    })

    it('should be return {}', function () {
      let resp = ARR.find(arr2, obj2, simple);

      expect(resp).toEqual({});
    })

    it('should be return {}', function () {
      let resp = ARR.find(arr2, obj2);

      expect(resp).toEqual({});
    })

    it('should be return an error', function () {
      expect(function () {
        ARR.find(arr2);
      }).toThrowError('Cannot convert undefined or null to object');
    })
  })

  describe('filter', function () {
    beforeEach(function () {
      arr1 = ['d43', 2, 10];
      obj1 = {
        0: 'd',
        1: '4',
        2: '3'
      };
      obj2 = {
        0: 'd',
        1: '4',
        2: 3
      };
    })

    it('should be return []', function () {
      let resp = ARR.filter();

      expect(resp).toEqual([]);
    })

    it('should be return [array[i]]', function () {
      let resp = ARR.filter(arr1, obj1);

      expect(resp).toEqual(['d43']);
    })

    it('should be return []', function () {
      let resp = ARR.filter(arr1, obj2);

      expect(resp).toEqual([]);
    })

    it('should be return an error', function () {
      expect(function () {
        ARR.filter(arr1);
      }).toThrowError('Cannot convert undefined or null to object');
    })
  })

  describe('pluck', function () {
    beforeEach(function () {
      collection = {
        1: 1,
        2: {
          step: 1,
          undefined: 'undefined'
        }
      };
      prop = 'step'
    })

    it('should be return []', function () {
      let resp = ARR.pluck();

      expect(resp).toEqual([]);
    })

    it('should be return []', function () {
      let resp = ARR.pluck({
        1: 1,
        2: 2
      });

      expect(resp).toEqual([]);
    })

    it('should be return collection[i][prop]', function () {
      let resp = ARR.pluck(collection);

      expect(resp).toEqual([collection[2]['undefined']]);
    })

    it('should be return collection[i][prop]', function () {
      let resp = ARR.pluck(collection, prop);

      expect(resp).toEqual([collection[2].step]);
    })
  })

  describe('getByIndex', function () {
    beforeEach(function () {})

    it('should be return an error', function () {
      expect(function () {
        ARR.getByIndex();
      }).toThrowError("Cannot read property 'length' of undefined");
    })

    it('should be return an error', function () {
      expect(function () {
        ARR.getByIndex(null);
      }).toThrowError("Cannot read property 'length' of null");
    })

    it('should be return undefined', function () {
      let resp = ARR.getByIndex(2);

      expect(resp).toBe(undefined);
    })

    it('should be return 0', function () {
      let resp = ARR.getByIndex('123456', 6);

      expect(resp).toEqual(0);
    })

    it('should be return -1', function () {
      let resp = ARR.getByIndex('', -6);

      expect(resp).toEqual(-1);
    })

    it('should be return 5', function () {
      let resp = ARR.getByIndex('123456', 5);

      expect(resp).toEqual(5);
    })

    // it('should be return', function () {
    //   let resp = ARR.getByIndex('sad');
    // })
  })

  describe('remove', function () {
    beforeEach(function () {
      item = 'two';
      arr = ['one', item, 'three', undefined];
    })

    it('should be return [item]', function () {
      let resp = ARR.remove(arr, item);

      expect(resp).toEqual([item]);
    })

    it('should be return [undefined]', function () {
      let resp = ARR.remove(arr);

      expect(resp).toEqual([undefined]);
    })

    it('should be return undefined', function () {
      let resp = ARR.remove([]);

      expect(resp).toEqual(undefined);
    })

    it('should be return undefined', function () {
      let resp = ARR.remove('string');

      expect(resp).toEqual(undefined);
    })

    it('should be return an error', function () {
      expect(function () {
        ARR.remove('string', 'r');
      }).toThrowError('array.splice is not a function');
    })

    it('should be return undefined', function () {
      expect(function () {
        ARR.remove(0);
      }).toThrowError('array.indexOf is not a function');
    })

    it('should be return undefined', function () {
      expect(function () {
        ARR.remove({});
      }).toThrowError('array.indexOf is not a function');
    })
  })

  describe('stringStartsWith', function () {
    beforeEach(function () {
      prefix = 'prefix';
      str = `${prefix}fgdfg`;
    })

    it('should be return true', function () {
      let resp = ARR.stringStartsWith(str, prefix);

      expect(resp).toBe(true);
    })

    it('should be return an error', function () {
      expect(function () {
        ARR.stringStartsWith(str);
      }).toThrowError("Cannot read property 'length' of undefined")
    })

    it('should be return an error', function () {
      expect(function () {
        ARR.stringStartsWith();
      }).toThrowError("Cannot read property 'slice' of undefined")
    })

    it('should be return false', function () {
      let resp = ARR.stringStartsWith(str, 4);

      expect(resp).toBe(false);
    })

    it('should be return false', function () {
      let resp = ARR.stringStartsWith(['1', '2'], ['1']);

      expect(resp).toBe(false);
    })

    it('should be return an error', function () {
      expect(function () {
        ARR.stringStartsWith(1, '1');
      }).toThrowError('string.slice is not a function');
    })

  })

  describe('startsWith', function () {
    beforeEach(function () {
      item = 'item';
      arr1 = ['some', item, {}];
      arr2 = `some${item}sfasf`;
    })

    it('should be return an error', function () {
      expect(function () {
        ARR.startsWith();
      }).toThrowError("Cannot read property 'indexOf' of undefined");
    })

    it('should be return an error', function () {
      expect(function () {
        ARR.startsWith(arr1);
      }).toThrowError("Cannot read property 'length' of undefined");
    })

    it('should be return "item"', function () {
      let resp = ARR.startsWith(arr1, item);

      expect(resp).toEqual(item);
    })

    it('should be return "item"', function () {
      let resp = ARR.startsWith(arr2, item);

      expect(resp).toEqual(item);
    })

    it('should be return an error', function () {
      expect(function () {
        ARR.startsWith(arr1, []);
      }).toThrowError('string.slice is not a function');
    })

    it('should be return "undefined"', function () {
      let resp = ARR.startsWith('sdf', item);

      expect(resp).toEqual(undefined);
    })
  })

  describe('getIndex', function () {
    beforeEach(function () {
      el = ['two', 3];
      parent = ['one', el, 'three'];
    })

    it('should be return an error', function () {
      expect(function () {
        ARR.getIndex();
      }).toThrowError('Array.prototype.indexOf called on null or undefined');
    })

    it('should be retun -1', function () {
      let resp = ARR.getIndex(parent);

      expect(resp).toEqual(-1);
    })

    it('should be retun 1', function () {
      let resp = ARR.getIndex(parent, el);

      expect(resp).toEqual(1);
    })
  })

  describe('move', function () {
    beforeEach(function () {});

    it('should be return an error', function () {
      expect(function () {
        ARR.move();
      }).toThrowError('angular is not defined');
    })
  })

  describe('uniq', function () {
    beforeEach(function () {
      arr = ['sa', 'sa', 2];
    })

    it('should be return filtered array', function () {
      let resp = ARR.uniq(arr);

      expect(resp).toEqual(['sa', 2]);
    })

    it('should be return []', function () {
      let resp = ARR.uniq([]);

      expect(resp).toEqual([]);
    })

    it('should be return an error', function () {
      expect(function () {
        ARR.uniq();
      }).toThrowError("Cannot read property 'filter' of undefined");
    })

    it('should be return an error', function () {
      expect(function () {
        ARR.uniq(4);
      }).toThrowError('array.filter is not a function');
    })
  })

  describe('intersection', function () {
    beforeEach(function () {})

    it('should be return []', function () {
      let resp = ARR.intersection();

      expect(resp).toEqual([]);
    })

    it('should be return an error', function () {
      expect(function () {
        ARR.intersection('one', 2, 3);
      }).toThrowError('arguments[i].filter is not a function');
    })
  })

  describe('difference', function () {
    beforeEach(function () {})
  })
});