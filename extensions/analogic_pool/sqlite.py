import sqlite3
import logging
import os


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


class SqlitePoolUserManager:

    def __init__(self, users, site_root, instance='default'):
        self.table_name = instance + '_user_pool_session'
        self.users = users
        self.site_root = site_root

    def getConnection(self):
        return sqlite3.connect(os.path.join(self.site_root, 'pool.db'))

    def createDatabase(self):
        con = self.getConnection()
        if self.isTableExists(con) is False:
            self.createTable(con)
            self.createUsers(con)
        con.close()

    def getUser(self):
        con = self.getConnection()
        con.row_factory = dict_factory
        c = con.cursor()
        c.execute('SELECT * FROM ' + self.table_name + ' ORDER BY session_count')
        pool_user = c.fetchone()
        c.execute('UPDATE ' + self.table_name + ' SET session_count = session_count + 1 WHERE id = :id', {'id': pool_user['id']})
        con.commit()
        con.close()
        return pool_user

    def isTableExists(self, con):
        c = con.cursor()

        c.execute('SELECT count(name) FROM sqlite_master WHERE type=:type AND name=:name',
                  {'type': 'table', 'name': self.table_name})

        return c.fetchone()[0] == 1

    def createTable(self, con):
        c = con.cursor()
        c.execute('create table if not exists ' + self.table_name +
                  '(id integer, name text, session text, session_count integer, expiration text)')
        con.commit()

    def createUsers(self, con):
        pool_users = []
        i = 1
        for user in self.users:
            pool_users.append((i, user, '', 0, ''))
            i = i + 1
        c = con.cursor()
        c.executemany('INSERT INTO ' + self.table_name + ' VALUES(?, ?, ?, ?, ?)', pool_users)
        con.commit()

    def updateUserSession(self, pool_user):
        con = self.getConnection()
        c = con.cursor()
        c.execute('UPDATE ' + self.table_name +
                  ' SET session_count = session_count - 1, session = :session, expiration = :expiration WHERE id = :id',
                  {'session': pool_user['session'], 'expiration': pool_user['expiration'], 'id': pool_user['id']})
        con.commit()
        con.close()

    def decreaseSessionCount(self, pool_user):
        con = self.getConnection()
        c = con.cursor()
        c.execute('UPDATE ' + self.table_name +
                  ' SET session_count = session_count - 1 WHERE id = :id',
                  {'id': pool_user['id']})
        con.commit()
        con.close()

    def clear(self):
        con = self.getConnection()
        c = con.cursor()
        c.execute('DROP table IF EXISTS ' + self.table_name)
        con.commit()
        con.close()

    def getLogger(self):
        return logging.getLogger(__name__)