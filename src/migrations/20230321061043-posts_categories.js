'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', { 
      post_id: {
        allowNull: false,
        field:'post_id',
        type: Sequelize.INTEGER,
        references: {
          model: 'blog_posts',
          key: 'id',
        }
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'blog_posts',
          key: 'id',
        }
      }
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('posts_categories');
  }
};
