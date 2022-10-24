import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

import { Post, Category } from '.'

interface PostCategoryAttributes {
    id: number;
    postId: number;
    categoryId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface PostCategoryInput extends Optional<PostCategoryAttributes, 'id'> {}
export interface PostCategoryOutput extends PostCategoryAttributes {}

class PostCategory extends Model<PostCategoryAttributes, PostCategoryInput> implements PostCategoryAttributes {
    public id!: number;
    public postId!: number;
    public categoryId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

PostCategory.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    postId: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: 'id'
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        }
    }
}, {
    sequelize: sequelizeConnection
})

Post.belongsToMany(Category, {
    through: PostCategory
})
Category.belongsToMany(Post, {
    through: PostCategory
})

export default PostCategory
