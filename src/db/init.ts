import {isDev, isTest} from "../config/env.config";
import { User, Tag, List, Category, Post, PostTag, PostCategory, SavedList } from './models'

const dbInit = () => Promise.all([
    User.sync({ alter: isDev || isTest }),
    Tag.sync({ alter: isDev || isTest }),
    List.sync({ alter: isDev || isTest }),
    Category.sync({ alter: isDev || isTest }),
    Post.sync({ alter: isDev || isTest }),
    PostTag.sync({ alter: isDev || isTest }),
    PostCategory.sync({ alter: isDev || isTest }),
    SavedList.sync({ alter: isDev || isTest }),
])

export default dbInit
