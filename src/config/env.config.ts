require('dotenv').config();
import {Dialect} from "sequelize";
export const dbName = process.env.DB_NAME as string
export const dbUser = process.env.DB_USER as string
export const dbHost = process.env.DB_HOST
export const dbDriver = process.env.DB_DRIVER as Dialect
export const dbPassword = process.env.DB_PASSWORD
export const port = process.env.PORT || 3001
export const isDev = process.env.NODE_ENV === 'development'
export const isTest = process.env.NODE_ENV !== 'test'
