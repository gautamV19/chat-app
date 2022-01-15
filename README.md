
# Chat server using TypeGraphql

A brief description of what this project does and who it's for

# Description

Entities:
1. User: 
    auto generated id(cuid npm package is preferred), user name, list of group, list of messages
2. Group: 
    group name, auto generated id, list of User in group(use typeorm relations), list of message for this group(use typeorm relations)
3. Messages: 
    auto generated id, message, group id, created by, created on(use @Createdatecolumn decorator)
4. Mapping:
    Group id in message entity and list of message in group entity
    Group id in message entity and list of User in group entity
    Created by in message entity and list of messages in User entity

Resolvers:
Create a user - Take user name as input
Group:
    Create a group - Take group name, list of members as input
Add more members - 
    Take list of members and group id as input
    Get the list of groups
    Get the group details by id - Return group id, group name, list of members and take group id as input to return the details
    Add message - Take group id, user id, message as input
    Get the list of message for a group id - Take group id as input

## Tech Stack

**Client:** Your wish

**Server:** Node, Express, TypeGraphQL

**Database:** PostgraphQL

**ORM:** TypeORM


## Installation

Install my-project with npm

Please start your database connection.

Then...
```bash
  yarn
  yarn run dev
```
    
## Support

For support, email ee20b144@smail.iitm.ac.in.
