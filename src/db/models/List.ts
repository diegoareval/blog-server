import {DataTypes, Model, Optional} from 'sequelize'
import sequelizeConnection from '../config'
import {SavedList} from '.'

interface ListAttributes {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ListInput extends Optional<ListAttributes, 'id'> {
}

export interface ListOutput extends Required<ListAttributes> {}

class List extends Model<ListAttributes, ListInput> implements ListAttributes {
    public id!: number;
    public name!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

List.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sequelizeConnection,
    paranoid: true
})

List.hasMany(SavedList)

export default List
