module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true, field: 'user_id' },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    underscored: true,
    tableName: 'blog_posts',
    timestamps: false,
  });
  BlogPost.associate = ({ User }) => {
    BlogPost.belongsTo(User, { foreignKey: 'userId', as: 'user' }) };
  return BlogPost;
};
