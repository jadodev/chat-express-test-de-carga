'use strict';

module.exports = {
  sendMessage: function (context, events, done) {
    const message = {
      event: 'message',
      data: {
        text: `Hola desde Artillery ${Math.random().toString(36).substring(7)}`,
      },
    };
    context.ws.send(JSON.stringify(message));
    return done();
  },
};
