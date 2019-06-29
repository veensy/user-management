const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;
const { User, Organization, Team } = require("./types/types");
const Users = require("../models/user");
const Organizations = require("../models/organization");
const Teams = require("../models/team");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: User,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        organizationId: { type: GraphQLID },
        teamId: { type: GraphQLID }
      },
      resolve(parentValue, { email, name, organizationId, teamId }) {
        return new Users({ email, name, organizationId, teamId }).save();
      }
    },
    addOrganization: {
      type: Organization,
      args: { name: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, { name }) {
        return new Organizations({ name }).save();
      }
    },
    addTeam: {
      type: Team,
      args: { name: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, { name }) {
        return new Teams({ name }).save();
      }
    },
    updateUser: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        organizationId: { type: GraphQLString },
        teamId: { type: GraphQLString }
      },
      resolve(parentValue, { id, name, email, organizationId, teamId }) {
        return Users.findByIdAndUpdate(
          id,
          {
            name,
            email,
            organizationId,
            teamId
          },
          { omitUndefined: true }
        );
      }
    },
    updateOrganization: {
      type: Organization,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString }
      },
      resolve(parentValue, { id, name }) {
        return Organizations.findByIdAndUpdate(
          id,
          { name },
          { omitUndefined: true }
        );
      }
    },
    updateTeam: {
      type: Team,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString }
      },
      resolve(parentValue, { id, name }) {
        return Teams.findByIdAndUpdate(id, { name }, { omitUndefined: true });
      }
    },
    deleteUser: {
      type: User,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return Users.findByIdAndDelete(id);
      }
    },
    deleteOrganization: {
      type: Organization,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return Organizations.findByIdAndDelete(id);
      }
    },
    deleteTeam: {
      type: Team,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { id }) {
        return Teams.findByIdAndDelete(id);
      }
    }
  }
});

module.exports = mutation;
