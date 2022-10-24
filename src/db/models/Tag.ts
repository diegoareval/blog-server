import {DataTypes, Model, Optional} from 'sequelize'
import sequelizeConnection from '../config'

interface TagAttributes {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface TagInput extends Optional<TagAttributes, 'id'> {
}

export interface TagOutput extends Required<TagAttributes> {}

class Tag extends Model<TagAttributes, TagInput> implements TagAttributes {
    public id!: number;
    public name!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Tag.init({
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

export default Tag
