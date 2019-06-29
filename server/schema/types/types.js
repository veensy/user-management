const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = graphql;
const Users = require("../../models/user");
const Organizations = require("../../models/organization");
const Teams = require("../../models/team");

const Team = new GraphQLObjectType({
  name: "Team",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    users: {
      type: new GraphQLList(User),
      resolve(parentValue, args) {
        return Users.find({ teamId: parentValue.id });
      }
    }
  })
});

const Organization = new GraphQLObjectType({
  name: "Organization",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    users: {
      type: new GraphQLList(User),
      resolve(parentValue, args) {
        return Users.find({ organizationId: parentValue.id });
      }
    }
  })
});

const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    organization: {
      type: Organization,
      resolve(parentValue, args) {
        return Organizations.findById(parentValue.organizationId);
      }
    },
    team: {
      type: Team,
      resolve(parentValue, args) {
        return Teams.findById(parentValue.teamId);
      }
    }
  })
});

module.exports = { User, Organization, Team };
