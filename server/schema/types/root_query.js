const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const { User, Organization, Team } = require("./types");
const Users = require("../../models/user");
const Organizations = require("../../models/organization");
const Teams = require("../../models/team");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: () => ({
    users: {
      type: new GraphQLList(User),
      resolve() {
        return Users.find();
      }
    },
    user: {
      type: User,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Users.findById(id);
      }
    },
    organizations: {
      type: new GraphQLList(Organization),
      resolve() {
        return Organizations.find();
      }
    },
    organization: {
      type: Organization,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Organizations.findById(id);
      }
    },
    teams: {
      type: new GraphQLList(Team),
      resolve() {
        return Teams.find({});
      }
    },
    team: {
      type: Team,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Teams.findById(id);
      }
    }
  })
});
module.exports = RootQuery;
