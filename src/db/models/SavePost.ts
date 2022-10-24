import { DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'

import { Post, List, User } from '.'

interface SavedListAttributes {
    id: number;
    postId: number;
    userId: number;
    listId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface SavedListInput extends Optional<SavedListAttributes, 'id'> {}
export interface SavedListOutput extends SavedListAttributes {}

class SavedList extends Model<SavedListAttributes, SavedListInput> implements SavedListAttributes {
    public id!: number;
    public postId!: number;
    public userId!: number;
    public listId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

SavedList.init({
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
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    listId: {
        type: DataTypes.INTEGER,
        references: {
            model: List,
            key: 'id'
        }
    }
}, {
    sequelize: sequelizeConnection
})

SavedList.belongsTo(List)
SavedList.belongsTo(User)
SavedList.belongsTo(Post)


export default SavedList
