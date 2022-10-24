import {DataTypes, Model, Optional} from 'sequelize'
import sequelizeConnection from '../config'
import {SavedList} from ".";

interface UserAttributes {
    id: number;
    name: string;
    lastname: string;
    email: string
    password: string;
    address: string;
    phone: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id' | 'phone' | "address"> {
}

export interface UserOutput extends Required<UserAttributes> {
}


class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number;
    public name!: string;
    public lastname!: string;
    public email!: string;
    public password!: string;
    public address!: string;
    public phone!: string;


    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: sequelizeConnection,
    paranoid: true
})

User.hasMany(SavedList)

export default User
