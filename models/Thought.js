const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    username: {
      type: String,
      required: true,  
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions: [
        reactionSchema
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
      transform: function (doc, ret) {
        ret.createdAt = doc.createdAt.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
      },
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets the amount of reactions per thought.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

// Initialize the Comment model
const Thought = model('thought', thoughtSchema);  

module.exports = Thought;