const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,  
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction',
        }
    ]
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionCount` that gets the amount of reactions per thought.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

// Create a virtual property 'formattedCreatedAt' that formats timestamp on query.
thoughtSchema.virtual('formattedCreatedAt').get(function () {
    return this.createdAt.toLocaleString(); 
  });


// Initialize the Comment model
const Thought = model('thought', thoughtSchema);  

module.exports = Thought;