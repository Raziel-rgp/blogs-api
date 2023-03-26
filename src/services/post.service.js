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

const findById = async (id) => {
  const result = BlogPost.findOne({ 
    where: { id },
    include: [
      {
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
  return result;
};

module.exports = {
  findAll,
  findById,
};
