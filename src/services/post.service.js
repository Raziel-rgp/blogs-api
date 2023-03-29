const { User, Category, BlogPost, PostCategory } = require('../models');

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

const findByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const findCategoriesById = async (categoryId) => {
  const result = await Category.findAll({ where: { id: categoryId } });
  return result;
};

const updateById = async (id, { title, content }) => {
  await BlogPost.update({ title, content }, { where: { id } });
  return findById(id);
};

const deleteById = async (id) => {
  const deleted = await BlogPost.destroy({ where: { id } });
  return deleted;
};

const createPost = async (ids, { title, content, categoryIds }) => {
  const post = await BlogPost.create({ title, content, user: ids });
  const mapCategory = categoryIds.map((catId) => ({ categoryId: catId, postId: post.id }));
  await PostCategory.bulkCreate(mapCategory);
  const newPost = {
    id: post.id,
    title: post.title,
    content: post.content,
    userId: ids,
    updated: post.updated,
    published: post.published,
  };
  return newPost;
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  findCategoriesById,
  updateById,
  deleteById,
  createPost,
};
