const { User} = require('../models');


const resolvers = { 
    Query: {
        me: async (parent, args, context) => {
        if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('books');
    
            return userData;
        }
    
        throw new AuthenticationError('Not logged in');
        },
    },


    // Set up the ability to query for all users

    Mutation: {
        // Set up the ability to query for a single user
        login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
    
        if (!user) {
            throw new AuthenticationError('Incorrect credentials');
        }
    
        const correctPw = await user.isCorrectPassword(password);
    
        if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
        }
    
        const token = signToken(user);
        return { token, user };
        },

        // Set up the ability to add a new user
        addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
    
        return { token, user };
        },

        // Set up the ability to save a book to a user's `savedBooks` array
        saveBook: async (parent, { bookData }, context) => {
        if (context.user) {
            const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: bookData } },
            { new: true }
            );
    
            return updatedUser;
        }
    
        throw new AuthenticationError('You need to be logged in!');
        },

        // Set up the ability to remove a book from a user's `savedBooks` array
        removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId } } },
            { new: true }
            );
    
            return updatedUser;
        }
    
        throw new AuthenticationError('You need to be logged in!');
        },
    },
    };

module.exports = resolvers;