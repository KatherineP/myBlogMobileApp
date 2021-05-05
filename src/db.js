import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('post.db')

export class DB {
    static init() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, booked INT, date TEXT)',
                    [],
                    resolve,
                    (_, error) => reject(error)
                )
            }
            )
        })
    }

    static getPosts() {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM posts',
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static createPost({ img, text, date }) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO posts (text,booked,img,date) VALUES (?,?,?,?)`,
                    [text, 0, img, date],
                    (_, result) => resolve(result.insertId),
                    (_, error) => reject(error)
                )
            })
        })
    }

    static updatePost(post) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE posts SET booked = ? WHERE ID = ?',
                    [post.booked ? 0 : 1, post.id],
                    resolve,
                    (_, error) => reject(error)
                )
            }
            )
        })
    }

    static removePost(id) {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    'DELETE FROM posts WHERE ID = ?',
                    [id],
                    resolve,
                    (_, error) => reject(error)
                )
            }
            )
        })
    }
}