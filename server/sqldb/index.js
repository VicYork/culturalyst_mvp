/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  //sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
  sequelize: new Sequelize('postgres://VicYork:ZZ3th341233@localhost:5432/cdt')
};

// Insert models below
db.Images = db.sequelize.import('../api/images/images.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

module.exports = db;
