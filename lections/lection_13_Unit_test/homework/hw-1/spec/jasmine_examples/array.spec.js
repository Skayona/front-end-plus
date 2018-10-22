describe("Some", function () {
  const arr = require('../../lib/jasmine_examples/array');

  describe("findById", function () {
    beforeEach(function () {
      id = 1;
      newArr = [{id}];
    });

    it("should be return array element with current id", function () {
      let resp = arr.findById(newArr, id);

      expect(resp).toEqual(newArr[0]);
    })

    it("should be return an empty object", function () {
      let resp = arr.findById([], id);

      expect(resp).toEqual({});
    })

    it("should be return an empty object", function () {
      let resp = arr.findById(newArr);

      expect(resp).toEqual({});
    })

    it("should be return an empty object", function () {
      let resp = arr.findById();

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
      let resp = arr.fromString(str_1, separator);

      expect(resp).toEqual(['some', 'string', ' ', 'finish']);
      expect(resp.length).toEqual(4);
    })

    it('should be return an array without commas, length 3', function () {
      let resp = arr.fromString(str_2);

      expect(resp).toEqual(['some', 'string', 'finish']);
      expect(resp.length).toEqual(3);
    })

    it('should be return an empty array', function () {
      let resp = arr.fromString();

      expect(resp).toEqual([]);
    })

    it('should be return an error', function () {
      expect(function () {
        arr.fromString(1);
      }).toThrowError('str.split is not a function');
    })
  })
});