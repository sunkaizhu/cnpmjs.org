/**!
 * cnpmjs.org - test/utils.js
 *
 * Copyright(c) fengmk2 and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */

'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var fs = require('fs');
var config = require('../config');

var fixtures = path.join(__dirname, 'fixtures');

var admin = exports.admin = 'cnpmjstest10';
exports.adminAuth = 'Basic ' + new Buffer(admin + ':' + admin).toString('base64');
config.admins[admin] = admin + '@cnpmjs.org';

var otherAdmin2 = exports.otherAdmin2 = 'cnpmjstestAdmin2';
exports.otherAdmin2Auth = 'Basic ' + new Buffer(otherAdmin2 + ':' + otherAdmin2).toString('base64');
config.admins[otherAdmin2] = otherAdmin2 + '@cnpmjs.org';

var otherAdmin3 = exports.otherAdmin3 = 'cnpmjstestAdmin3';
exports.otherAdmin3Auth = 'Basic ' + new Buffer(otherAdmin3 + ':' + otherAdmin3).toString('base64');
config.admins[otherAdmin3] = otherAdmin3 + '@cnpmjs.org';

var otherUser = exports.otherUser = 'cnpmjstest101';
exports.otherUserAuth = 'Basic ' + new Buffer(otherUser + ':' + otherUser).toString('base64');

var secondUser = exports.secondUser = 'cnpmjstest102';
exports.secondUserAuth = 'Basic ' + new Buffer(secondUser + ':' + secondUser).toString('base64');

var _pkg = fs.readFileSync(path.join(fixtures, 'package_and_tgz.json'));

exports.getPackage = function (name, version, user) {
  // name: mk2testmodule
  name = name || 'mk2testmodule';
  version = version || '0.0.1';
  user = user || admin;

  var pkg = JSON.parse(_pkg);
  var versions = pkg.versions;
  pkg.versions = {};
  pkg.versions[version] = versions[Object.keys(versions)[0]];
  pkg.maintainers[0].name = user;
  pkg.versions[version].maintainers[0].name = user;
  pkg.versions[version].name = name;
  pkg.versions[version].version = version;
  pkg.versions[version]._id = name + '@' + version;
  pkg.name = name;
  pkg['dist-tags'] = {latest: version};
  return pkg;
};
