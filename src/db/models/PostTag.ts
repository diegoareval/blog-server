import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

import { Post, Tag } from '.'

interface PostTagAttributes {
    id: number;
    postId: number;
    tagId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface PostTagInput extends Optional<PostTagAttributes, 'id'> {}
export interface PostTagOutput extends PostTagAttributes {}

class PostTag extends Model<PostTagAttributes, PostTagInput> implements PostTagAttributes {
    public id!: number;
    public postId!: number;
    public tagId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

PostTag.init({
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
    tagId: {
        type: DataTypes.INTEGER,
        references: {
            model: Tag,
            key: 'id'
        }
    }
}, {
    sequelize: sequelizeConnection
})

Post.belongsToMany(Tag, {
    through: PostTag
})
Tag.belongsToMany(Post, {
    through: PostTag
})

export default PostTag
