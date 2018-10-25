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

      expect(resp).toBeFalsy();
    })

    it('should be return false', function () {
      let resp = ARR._equals(a1, b1, simple);

      expect(resp).toBeFalsy();
    })

    it('should be return true', function () {
      let resp = ARR._equals(a2, b2, simple);

      expect(resp).toBeTruthy();
    })

    it('should be return true', function () {
      let resp = ARR._equals(a2, b1);

      expect(resp).toBeTruthy();
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
      let resp = ARR.pluck({1: 1, 2: 2});

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
  // describe('_equals', function () {
  //   beforeEach(function () {})

  //   it('should be ', function () {})
  // })
});