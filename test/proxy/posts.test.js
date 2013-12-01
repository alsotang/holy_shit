/*!
 * holy_shit - test/proxy/posts.test.js
 */

'use strict';

/**
 * Module dependencies.
 */

var mm = require('mm');
var should = require('should');
var mysql = require('../../common/mysql');
var Posts = require('../../proxy/posts');

describe('proxy/posts.test.js', function () {

  describe('getPosts()', function () {
    it('should get posts order by id ok', function (done) {
      Posts.getPosts(0, 'id', function (err, data) {
        data[0].id.should.be.Number;
        data[0].title.should.be.String;
        data[0].url.should.be.String;
        data[0].gmtCreated.should.be.String;
        data[0].picUrl.should.be.String;
        data[0].goodNum.should.be.Number;
        data[0].viewNum.should.be.Number;
        done(err);
      });
    });

    describe('when mysql error occurs', function () {
      before(function () {
        mm.error(mysql, 'query', 'mock error');
      })
      after(mm.restore);
      it('should get error', function (done) {
        Posts.getPosts(0, 'id', function (err, data) {
          err.message.should.equal('mock error');
          done();
        });
      });
    })
  });

});