describe("Some", function () {
  var some = require('../../lib/jasmine_examples/Some');

  describe("sumList", function () {
    beforeEach(function () {
      args = [3, 56, 3, 45, 1, 329, 9, 34];
      sum = args.reduce((p, c) => p + c);
    });

    it("should be return 0", function () {
      var resp = some.sumList();

      expect(resp).toEqual(0);
    });

    it("should be return sum of args", function () {
      var resp = some.sumList(...args);

      expect(resp).toEqual(sum);
    });
  });

  describe("compare", function () {
    beforeEach(function () {});
    it("should be return null", function () {
      var resp = some.compare();

      expect(resp).toEqual(null);
    })

    it("should be return undefined", function () {
      var resp = some.compare({});

      expect(resp).toEqual(undefined);
    })

    it("should be return undefined", function () {
      var resp = some.compare({x: 10}, {});

      expect(resp).toEqual(undefined);
    })

    it("should be return true", function () {
      var resp = some.compare({x: 10}, {x: 10});

      expect(resp).toEqual(true);
    })

  })
});