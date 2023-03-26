const { User, Category, BlogPost } = require('../models');

const findAll = async () => BlogPost.findAll({
  include: [{ 
    model: User,
    as: 'user',
    attributes: { exclude: 'password' },
  },
  {
    model: Category,
    as: 'categories',
    attributes: ['id', 'name'],
  },
  ],
});

module.exports = {
  findAll,
};
