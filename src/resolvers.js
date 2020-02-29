const { User, Poll } = require('../db/models');

module.exports = {
    Query: {
    getUsers: async () => await User.find({}).exec(),
    getPolls: async () => await Poll.find({}).exec(),
    // getUserPolls: async (_, { userId }) => await User.findById(userId).populate("polls").exec(),
    getUserPolls: async (_, { userId }) => {
        let response = await User.findById(userId).lean();
        let polls = response.polls.map(async poll => await Poll.findById(poll));
        return polls;
        }
    },
    Mutation: {
        createUser: async(_, { input }) => {
            try {
                let response = await User.create(input);
                return response;
            } catch(e) {
                return e.message;
            }
        },
        createPoll: async(_, { input }) => {
            try {
                return await Poll.create(input).then(poll => {
                    User.findById(input.owner)
                        .then(user => {
                            user.polls.push(poll._id);
                            return user.save();
                        });
                    return poll;
                });
            } catch(e) {
                return e.message;
            }
        }
       }
}
  