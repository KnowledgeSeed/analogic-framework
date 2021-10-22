import sqlite3
import logging
from DimensionFramework.Core.SqlitePoolUserManager import SqlitePoolUserManager


class RandomPoolUserManager(SqlitePoolUserManager):

    def __init__(self, users, instance='default'):
        super(RandomPoolUserManager, self).__init__(users, instance)

    def getUser(self):
        con = self.getConnection()
        con.row_factory = SqlitePoolUserManager.dict_factory
        c = con.cursor()
        c.execute('SELECT * FROM ' + self.table_name + ' ORDER BY random() limit 1')
        pool_user = c.fetchone()
        con.close()
        return pool_user

    def updateUserSession(self, pool_user):
        con = self.getConnection()
        c = con.cursor()
        c.execute('UPDATE ' + self.table_name +
                  ' SET  session = :session, expiration = :expiration WHERE id = :id',
                  {'session': pool_user['session'], 'expiration': pool_user['expiration'], 'id': pool_user['id']})
        con.commit()
        con.close()

    def decreaseSessionCount(self, pool_user):
        pass
