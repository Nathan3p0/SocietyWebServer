const messageService = {
    findGroupByAdminId(knex, id) {
        return knex('groups')
            .where('group_admin', id)
            .first()
    }
}

module.exports = messageService;