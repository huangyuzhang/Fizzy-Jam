---
title: 'Fetch Data from PostgreSQL Databases in Python'
slug: fetch-data-from-postgresql-databases-in-python
date: 2020-01-03
tags: 
  - python
  - data
  - sql
  - database
authors:
  - huangyuzhang
image: https://i.loli.net/2020/11/21/A4RKJhrPcED73tY.png
description: "We use `pandas` and `psycopg2` together to connect with PostgreSQL. `psycopg2` is a package allows us to create a connection with PostgreSQL databases in Python, and we will use `sqlio` within `pandas` to interact with the database." 
---
We use `pandas` and `psycopg2` together to connect with PostgreSQL. `psycopg2` is a package allows us to create a connection with PostgreSQL databases in Python, and we will use `sqlio` within `pandas` to interact with the database. 

<!-- more -->

If you haven't install the `psycopg2` package, simply install it using `pip install psycopg2` in terminal.

## Database Connection 
First we create a connection variable `conn` so we can call it later when we need it:
```python
conn = psycopg2.connect(
            dbname="dbname", 
            user="username",
            password="password", 
            host="postgresql_host", 
            port="443"
        )
```
## Store SQL Queries 
Instead of writing SQL queries inside a function, we store them in python variables so we can call it in sql io functions:
```python
sql_query = """
            SELECT * FROM your_table_name
            WHERE ds = "${bizdate}";
            """
```
## Execute SQL Queries 
Now we can use `sqlio` from `pandas.io.sql` to execute the SQL command we wrote. It will return a pandas DataFrame so we can simply assign a variable name to it:
```python
df = sqlio.read_sql_query(sql_query.replace('${bizdate}',bizdate), conn)
```
Documentation of `read_sql_query`: [https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_sql_query.html](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_sql_query.html)

> Notice I used a `.replace()` method for the `sql_query`. Because often PostgreSQL is used in datawarehosue and the data is store with partition. With the replace of partition, we can execute the command in the correct partition. In my case, the partitions are named with a certain date format (20191225) of yesterday, to create the variable `bizdate`, use:
```python
import datetime
bizdate = (datetime.date.today() - datetime.timedelta(1)).strftime('%Y%m%d')
```

## Output DataFrame 
After some data cleaning, we can export the DataFrame `df` to other form like `.csv` files or write it to other database like `MySQL`:
```python
# export as csv files
df.to_csv('./csv/df.csv', index = False, encoding = 'utf-8')

# write to MySQL databases
from sqlalchemy import create_engine

host = 'mysql_host'
port = 3306
db = 'dbname'
user = 'username'
password = 'password'

engine = create_engine(str(r"mysql+mysqlconnector://%s:" + '%s' + "@%s/%s") % (user, password, host, db))

try:
    df.to_sql('your_target_table', con=engine, if_exists='replace', index=False)
    print('Sucess!')
except Exception as e:
    print(e)
```
## Automation 
Further, the data fetching process can be automated with `crontab`.

## Complete Code 
```python
import datetime
import time
import psycopg2
import pandas.io.sql as sqlio
import pandas as pd


def get_data():		

	bizdate = (datetime.date.today() - datetime.timedelta(1)).strftime('%Y%m%d')
    print('Define bizdate = ' + bizdate)

	print('Create Database Connection')
    conn = psycopg2.connect(
                dbname="dbname", 
                user="username",
                password="password", 
                host="postgresql_host", 
                port="443"
            )	

    print('Read SQL Queries')
    sql_query = """
            SELECT * FROM your_table_name
            WHERE ds = "${bizdate}";
            """

    print('Fetch Data')
    df = sqlio.read_sql_query(sql_query.replace('${bizdate}',bizdate), conn)

    print('Export CSV Files')
    df.to_csv('./csv/weixin_xiaoxi.csv', index=False, encoding = 'utf-8')

    print('Close Database Connection')
    conn = None

if __name__ == "__main__":
    get_data()
    print('Finish!')
    now = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
    print(now)
    print('==================================')
```