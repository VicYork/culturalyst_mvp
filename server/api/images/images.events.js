/**
 * Images model events
 */

'use strict';

import {EventEmitter} from "events";
var Images = require('../../sqldb').Images;
var ImagesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ImagesEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Images.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function (doc, options, done) {
    ImagesEvents.emit(event + ':' + doc._id, doc);
    ImagesEvents.emit(event, doc);
    done(null);
  }
}

export default ImagesEvents;
