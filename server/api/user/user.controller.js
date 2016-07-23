'use strict';

import {User} from '../../sqldb';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.findAll({
    attributes: [
      '_id',
      'name',
      'email',
      'role',
      'provider'
    ]
  })
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  console.log('hitting user create api');
  var newUser = User.build(req.body);
  newUser.setDataValue('provider', 'local');
  newUser.setDataValue('role', 'user');
  return newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.find({
    where: {
      _id: userId
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.destroy({ _id: req.params.id })
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.find({
    where: {
      _id: userId
    }
  })
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.find({
    where: {
      _id: userId
    },
    attributes: [
      '_id',
      'name',
      'name_last',
      'email',
      'role',
      'provider',
      'neighborhood',
      'dob',
      'hometown',
      'hometown_state',
      'medium',
      'genre',
      'experience',
      'website',
      'facebook',
      'instagram',
      'twitter',
      'soundcloud',
      'behance',
      'bandcamp',
      'store',
      'spotify',
      'story'
    ]
  })
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}


/**
 * Custom Functions
 */

/**
 * Artist Signup
      Page 1
        Basics
        Art
        Places
 */

export function updateArtistBasics (req, res, next) {
  let userId = req.user._id;
  let dob = req.body.dob;
  let neighborhood = req.body.neighborhood;
  let hometown = req.body.hometown;
  let hometown_state = req.body.hometown_state; 

  return User.find({
    where: {
      _id: userId
    }
  }).then(function(user){
      user.dob = dob;
      user.neighborhood = neighborhood;
      user.hometown = hometown;
      user.hometown_state = hometown_state;
      user.save()
        .then(function(){
          res.status(204).end();
        })
        .catch(validationError(res));
  });
};

export function updateArtistArt (req, res, next) {
  let userId = req.user._id;
  let medium = req.body.medium;
  let genre = req.body.genre;
  let experience = req.body.experience;

  return User.find({
    where: {
      _id: userId
    }
  }).then(function(user){
      user.medium = medium;
      user.genre = genre;
      user.experience = experience;
      user.save()
        .then(function(){
          res.status(204).end();
        })
        .catch(validationError(res));
  });
};

export function updateArtistProperties (req, res, next) {
  let userId = req.user._id;
  let website = req.body.website;
  let instagram = req.body.instagram;
  let twitter = req.body.twitter;
  let store = req.body.store;
  let soundcloud = req.body.soundcloud;
  let behance = req.body.behance;
  let bandcamp = req.body.bandcamp;
  let spotify = req.body.spotify;


  return User.find({
    where: {
      _id: userId
    }
  }).then(function(user){
      user.website = website;
      user.instagram = instagram;
      user.twitter = twitter;
      user.store = store;
      user.soundcloud = soundcloud;
      user.behance = behance;
      user.bandcamp = bandcamp;
      user.spotify = spotify;
      user.save()
        .then(function(){
          res.status(204).end();
        })
        .catch(validationError(res));
  });
};

export function updateArtistStory (req, res, next) {
  let userId = req.user._id;
  let story = req.body.story


  return User.find({
    where: {
      _id: userId
    }
  }).then(function(user){
      user.story = story;
      user.save()
        .then(function(){
          res.status(204).end();
        })
        .catch(validationError(res));
  });
};

export function launchArtistProfile (req, res, next) {
  let userId = req.user._id;
  let profile_pic = req.body.profile_pic;
  let cover_pic = req.body.cover_pic;
  let background_pic = req.body.background_pic;


  return User.find({
    where: {
      _id: userId
    }
  }).then(function(user){
      user.profile_pic = profile_pic;
      user.cover_pic = cover_pic;
      user.background_pic = background_pic;
      user.role = "artist";
      user.save()
        .then(function(){
          res.status(204).end();
        })
        .catch(validationError(res));
  });
};


export function showResults (req, res, next) {
  console.log('inside backend');
  var query;
  if (req.params.submedium !== 'undefined' && req.params.submedium !== 'null'){
    query = {genre: req.params.submedium};
    console.log(req.params.submedium);
  } else {
    console.log(req.params.medium);
    query = {medium: req.params.medium}
  }

  User.findAll({
      where: query
    })
    .then(function(users) {
      if (!users) {
        console.log('No users');
        res.status(404).end();
      }
      var array = [];
      users.forEach(function(profile_pic){
        array.push(profile_pic);
      })
      res.json(array);

    })
    .catch(function(err) {
      next(err);
      console.log(err);
    });
};


/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
