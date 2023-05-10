const DbService = require('@Service/db')
const LogService = require('@Service/log')

const create = async (userId, data) => {
  const {
    entry_date,
    health,
    work,
    romantic_relationship,
    family_relationships,
    friends,
    physical_wellness,
    entry_comment,
    health_comment,
    work_comment,
    romantic_relationship_comment,
    family_relationships_comment,
    friends_comment,
    physical_wellness_comment,
  } = data;

  const cleanedData = {
    user_id: userId,
    entry_date,
    health: health || null,
    work: work || null,
    romantic_relationship: romantic_relationship || null,
    family_relationships: family_relationships || null,
    friends: friends || null,
    physical_wellness: physical_wellness || null,
  };
  
  await DbService('mood_entries').insert({
    user_id: userId,
    entry_date,
    health,
    work,
    romantic_relationship,
    family_relationships,
    friends,
    physical_wellness,
    entry_comment,
    health_comment,
    work_comment,
    romantic_relationship_comment,
    family_relationships_comment,
    friends_comment,
    physical_wellness_comment,
    ...cleanedData
  });
}

const getUserMoods = async (user_id) => {
  return DbService('mood_entries').where({ user_id }).orderBy('entry_date', 'desc').limit(30);
}

module.exports = {
  create,
  getUserMoods,
}
