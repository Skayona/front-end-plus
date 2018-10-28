describe("PAGE", function () {
  const PAGE = require('../../lib/jasmine_examples/page');

  describe('select', function () {
    beforeEach(function () {});

    it('should "__page" has class "page_select_disabled"', function () {
      PAGE.select();
      let hasClass = PAGE.classList.hasClass('page_select_disabled');

      expect(hasClass).toBe(true);
    })
  })

  // describe('scroll', function () {
  //   beforeEach(function () {});

  //   it('should be ', function () {})
  // })

  // describe('confirm', function () {
  //   beforeEach(function () {});

  //   it('should be ', function () {})
  // })
})