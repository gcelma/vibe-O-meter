const { User } = require('../db/models');

module.exports = {
    Query: {
    //   user() {
    //     return { name: "manuel" };
    //   }
    getUsers: async () => await User.find({}).exec()
    },
    Mutation: {
        // createUser(_, { input }) {
        //     console.log(input);
        //   return input;
        // }
        createUser: async(_, { input }) => {
            try {
                let response = await User.create(input);
                return response;
            } catch(e) {
                return e.message;
            }
        }
       }
}
  