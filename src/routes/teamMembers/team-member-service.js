const xss = require('xss');

const teamMemberService = {
    getAllTeamMembers(knex, id) {
        return knex.select('members.username', 'members.full_name', 'members.phone', 'members.email', 'groups.group_name').from('members').join('group_members', { 'members.id': 'group_members.member_id' }).join('groups', { 'group_members.group_id': 'groups.id' }).where('group_members.group_id', id)
    }
}

module.exports = teamMemberService;