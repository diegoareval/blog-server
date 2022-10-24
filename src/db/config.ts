import {SequelizeHooks} from "sequelize/types/hooks";

require('dotenv').config()
import diff from 'microdiff'
import {  Model, Sequelize } from 'sequelize'

import localCache from '../utils/cache/local-cache'
import {dbName, dbUser, dbHost, dbDriver, dbPassword} from "../config/env.config";

const hooks: Partial<SequelizeHooks<Model<any, any>, any, any>> = {
    afterUpdate: (instance: Model<any, any>) => {
        const cacheKey = `${instance.constructor.name.toLowerCase()}s`

        const currentData = instance.get({ plain: true })

        if (!localCache.hasKey(cacheKey)) {
            return
        }

        const listingData = localCache.get<any>(cacheKey) as any[]
        const itemIndex = listingData.findIndex((it) => it.id === instance.getDataValue('id'))
        const oldItemData = ~itemIndex ? listingData[itemIndex] : {}

        const instanceDiff = diff(oldItemData, currentData)

        if (instanceDiff.length > 0) {
            listingData[itemIndex] = currentData
            localCache.set(cacheKey, listingData)
        }
    },
    afterCreate: (instance: Model<any, any>) => {
        const cacheKey = `${instance.constructor.name.toLowerCase()}s`
        const currentData = instance.get({ plain: true })

        if (!localCache.hasKey(cacheKey)) {
            return
        }

        const listingData = localCache.get<any>(cacheKey) as any[]
        listingData.push(currentData)

        localCache.set(cacheKey, listingData)
    },
}

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    logging: false,
    define: {hooks}
})

export default sequelizeConnection
