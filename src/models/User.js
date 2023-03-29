module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    underscored: true,
    timestamps: false,
  });
  User.associate = ({ BlogPost }) => {
    User.hasMany(BlogPost, { foreignKey: 'userId', as: 'blog_post', })
  }
  return User;
}