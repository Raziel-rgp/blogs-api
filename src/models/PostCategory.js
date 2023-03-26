module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
    {
      postId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        field: 'post_id'
      },
      categoryId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        field: 'category_id'
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
      foreignKey: 'post_id',
      through: PostCategory,
      otherKey: 'category_id',
    });
    Category.belongsToMany(BlogPost,{
      as: 'blog_Posts',
      foreignKey: 'category_id',
      through: PostCategory,
      otherKey: 'post_id',
    });
  };
  return PostCategory;
}