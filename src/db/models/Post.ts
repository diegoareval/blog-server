
import { DataTypes, Model, Optional } from 'sequelize'
import User from './User'
import sequelizeConnection from '../config'
import {SavedList} from ".";

interface PostAttributes {
    id: number;
    title: string;
    slug: string;
    summary: string;
    enabled: boolean;
    content: string;
    published: boolean;
    metaTitle: string;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface PostInput extends Optional<PostAttributes, 'id' | 'metaTitle'> {}

export interface PostOuput extends Required<PostAttributes> {}

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
    public id!: number
    public metaTitle!: string
    public published!: boolean
    public enabled!: boolean
    public content!: string
    public summary!: string
    public slug!: string
    public title!: string
    public userId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    metaTitle: {
        type: DataTypes.STRING,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    sequelize: sequelizeConnection,
    paranoid: true
})

Post.hasMany(SavedList)

export default Post;
