module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
    {
      postId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      }
    },
    {
      underscored: true,
      tableName: 'posts_categories',
      timestamps: false,
    },
  );
  PostCategory.associate = ({ BlogPost, Category }) => {
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      foreignKey: 'postId',
      through: PostCategory,
      otherKey: 'categoryId',
    });
    Category.belongsToMany(BlogPost,{
      as: 'blogPosts',
      foreignKey: 'categoryId',
      through: PostCategory,
      otherKey: 'postId',
    });
  };
  return PostCategory;
}