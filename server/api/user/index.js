'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

//Artist Routes (SignupArtistController)
router.put('/:id/updateArtistBasics', auth.isAuthenticated(), controller.updateArtistBasics);
router.put('/:id/updateArtistArt', auth.isAuthenticated(), controller.updateArtistArt);
router.put('/:id/updateArtistProperties', auth.isAuthenticated(), controller.updateArtistProperties);
router.put('/:id/updateArtistStory', auth.isAuthenticated(), controller.updateArtistStory);
router.put('/:id/launchArtistProfile', auth.isAuthenticated(), controller.launchArtistProfile);

//Discovery Routes (DiscoveryCtrl)
router.get('/discovery/:medium/:submedium', controller.showResults);

module.exports = router;
