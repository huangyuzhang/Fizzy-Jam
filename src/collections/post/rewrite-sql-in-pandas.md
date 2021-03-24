---
title: 'Rewrite SQL Queries in Pandas'
slug: rewrite-sql-in-pandas
date: 2020-12-18
tags: 
  - python
  - pandas 
  - sql
authors:
  - huangyuzhang
image: https://tvax1.sinaimg.cn/large/005FE2Ibgy1glrva6yrerj30uf0h5ju8.jpg
description: From time to time, I have done various tasks in SQL and Python. However, Pandas’ syntax is quite different from SQL. With SQL, you declare what you want in a sentence that almost reads like English. In Pandas, you apply operations on the dataset, and chain them, in order to transform and reshape the data the way you want it.
---
From time to time, I have done various tasks in SQL and Python. However, Pandas’ syntax is quite different from SQL. With SQL, you declare what you want in a sentence that almost reads like English. In Pandas, you apply operations on the dataset, and chain them, in order to transform and reshape the data the way you want it.

<!-- more -->
Therefore, a phrasebook would be quite necessary during my everyday work. Here I will try to record the equivalents in both SQL and Pandas.

### Import Data in Pandas
```python
import pandas as pd

airports = pd.read_csv('data/airports.csv')
airport_freq = pd.read_csv('data/airport-frequencies.csv')
runways = pd.read_csv('data/runways.csv')
```
## Phrases
### SELECT, WHERE, DISTINCT, LIMIT
|                 SQL       |                 Pandas                |
|:---------------:|:-----------------------:|
| `SELECT * FROM airports `   | `airports`    |
| `SELECT * FROM airports LIMIT 3`  | `airports.head(3)`    |
| `SELECT id FROM airports WHERE ident = 'KLAX'` | `airports[airports.ident == 'KLAX'].id` |
| `SELECT DISTINCT type FROM airport`    | `airports.type.unique()`     |

### SELECT with Multiple Conditions
|      SQL  |       Pandas            |
|:-------:|:--------:|
| `SELECT * FROM airports WHERE iso_region = 'US-CA' AND type = 'seaplane_base'`       | `airports[(airports.iso_region == 'US-CA') & (airports.type == 'seaplane_base')]` |
| `SELECT ident,name, municipality FROM airports WHERE iso_region = 'US-CA' OR type = 'large_airport'` | `airports[(airports.iso_region == 'US-CA') | (airports.type == 'large_airport')][['ident', 'name', 'municipality']]` |
| `SELECT video_id, title FROM df WHERE likes >= 10000` | `df.loc[df['likes'] >= 10000, ['video_id', 'title']]` |
| `SELECT video_id, title FROM df WHERE likes >= 10000 AND dislike < 5000` | `df.loc[(df['likes'] >= 1000000) & (df['dislikes'] < 5000), ['video_id', 'title']]` |

As an example the below code returns all videos that contains the word ‘math’ in their description.

```sql
SELECT  video_id
        ,title 
FROM    df 
WHERE   description LIKE '%math%';
```

```python
df_notnull = df.loc[~pd.isnull(df['description']), :]

df_notnull.loc[like(df_notnull['description'], '.* math .*'), ['video_id', 'title']].drop_duplicates()
```

### IS (NOT) NULL
|      SQL  |       Pandas            |
|:-------:|:--------:|
| `SELECT * FROM frame WHERE col2 IS NULL` | `frame[frame['col2'].isna()]` |
| `SELECT * FROM frame WHERE col2 IS NOT NULL` | `frame[frame['col2'].notna()]` |

### ORDER BY
|       SQL           |                Pandas                  |
|:------------------:|:---------------------------------:|
| `SELECT * FROM airport_freq WHERE airport_ident = 'KLAX' ORDER BY type`    | `airport_freq[airport_freq.airport_ident == 'KLAX'].sort_values('type')`   |
| `SELECT * FROM airport_freq WHERE airport_ident = 'KLAX' ORDER BY type DESC` | `airport_freq[airport_freq.airport_ident == 'KLAX'].sort_values('type', ascending=False)` |

### IN… NOT IN
|           SQL        |                     Pandas           |
|:------------------:|:-------------:|
| `SELECT * FROM airports WHERE type IN ('heliport', 'balloonport')`     | `airports[airports.type.isin(['heliport', 'balloonport'])]`  |
| `SELECT * FROM airports WHERE type NOT IN ('heliport', 'balloonport')` | `airports[~airports.type.isin(['heliport', 'balloonport'])]` |

###  COUNT, GROUP BY, ORDER BY
|      SQL            |           Pandas               |
|:-----------:|:-----------:|
| `SELECT iso_country, type, COUNT(*) FROM airports GROUP BY iso_country, type ORDER BY iso_country, type`  | `airports.groupby(['iso_country', 'type']).size()`  |
| `SELECT iso_country, type, COUNT(*) FROM airports GROUP BY iso_country, type ORDER BY iso_country, COUNT(*) DESC` | `airports.groupby(['iso_country', 'type']).size().to_frame('size').reset_index().sort_values(['iso_country', 'size'], ascending=[True, False])` |

|      SQL        |       Pandas        |
|:----------:|:-------------:|
| `SELECT iso_country, type, COUNT(*) FROM airports GROUP BY iso_country, type ORDER BY iso_country, type`  | `airports.groupby(['iso_country', 'type']).size()`  |
| `SELECT iso_country, type, COUNT(*) FROM airports GROUP BY iso_country, type ORDER BY iso_country, COUNT(*) DESC` | `airports.groupby(['iso_country', 'type']).size().to_frame('size').reset_index().sort_values(['iso_country', 'size'], ascending=[True, False])` |

Notice that in the pandas code we used `size()` and not `count()`. This is because `count()` in pandas applies the function to each column, returning the number of **not null** records within each.

```python
In [19]: tips.groupby('sex').count()
Out[19]: 
        total_bill  tip  smoker  day  time  size
sex                                             
Female          87   87      87   87    87    87
Male           157  157     157  157   157   157
```

Alternatively, we could have applied the count() method to an individual column:

```python
In [20]: tips.groupby('sex')['total_bill'].count()
Out[20]: 
sex
Female     87
Male      157
Name: total_bill, dtype: int64
```

### HAVING
|       SQL        |      Pandas            |
|:------:|:-------------:|
| `SELECT type, COUNT(*) FROM airports WHERE iso_country = 'US' GROUP BY type HAVING COUNT(*) > 1000 ORDER BY COUNT(*) DESC` | `airports[airports.iso_country == 'US'].groupby('type').filter(lambda g: len(g) > 1000).groupby('type').size().sort_values(ascending=False)` |

### Top N rows with LIMIT OFFSET
|    SQL              |               Pandas            |
|:---------------------:|:------------:|
| `SELECT iso_country FROM by_country ORDER BY size DESC LIMIT 10`           | `by_country.nlargest(10, columns='airport_count')`          |
| `SELECT iso_country FROM by_country ORDER BY size DESC LIMIT 10 OFFSET 10` | `by_country.nlargest(20, columns='airport_count').tail(10)` |

### Top N rows per group with ROW_NUMBER()
```sql
SELECT * FROM (
  SELECT t.*
        ,ROW_NUMBER() OVER(PARTITION BY day ORDER BY total_bill DESC) AS rn
  FROM tips t
)
WHERE rn < 3
ORDER BY day, rn;
```
```python
In [36]: (tips.assign(rn=tips.sort_values(['total_bill'], ascending=False)
   ....:                     .groupby(['day'])
   ....:                     .cumcount() + 1)
   ....:      .query('rn < 3')
   ....:      .sort_values(['day', 'rn']))
   ....: 
Out[36]: 
     total_bill    tip     sex smoker   day    time  size  rn
95        40.17   4.73    Male    Yes   Fri  Dinner     4   1
90        28.97   3.00    Male    Yes   Fri  Dinner     2   2
170       50.81  10.00    Male    Yes   Sat  Dinner     3   1
212       48.33   9.00    Male     No   Sat  Dinner     4   2
156       48.17   5.00    Male     No   Sun  Dinner     6   1
182       45.35   3.50    Male    Yes   Sun  Dinner     3   2
197       43.11   5.00  Female    Yes  Thur   Lunch     4   1
142       41.19   5.00    Male     No  Thur   Lunch     5   2
```

### Aggregate functions (MIN, MAX, MEAN, SUM)

|      SQL         |           Pandas                |
|:----------------:|:-----------------:|
| `SELECT MIN(views) FROM table` | `table.loc[:, ['views']].min()` |
| `SELECT MAX(length_ft), MIN(length_ft), AVG(length_ft), MEDIAN(length_ft) FROM runways` | `runways.agg({'length_ft': ['min', 'max', 'mean', 'median']})` |
| `SELECT channel_title, SUM(views), SUM(likes), SUM(dislikes) FROM df GROUP BY channel_title` | `df.loc[:, ['channel_title', 'views', 'likes', 'dislikes'] ].groupby(['channel_title']).sum()` |

Multiple functions can also be applied at once.

|      SQL         |           Pandas                |
|:----------------:|:-----------------:|
| `SELECT day, AVG(tip), COUNT(*) FROM tips GROUP BY day` | `tips.groupby('day').agg({'tip': np.mean, 'day': np.size})` |

Grouping by more than one column is done by passing a list of columns to the `groupby()` method.

|      SQL         |           Pandas                |
|:----------------:|:-----------------:|
| `SELECT smoker, day, COUNT(*), AVG(tip) FROM tips GROUP BY smoker, day;` | `tips.groupby(['smoker', 'day']).agg({'tip': [np.size, np.mean]})` |

### JOIN
|        SQL          |         Pandas              |
|:------------:|:----------------:|
| `SELECT airport_ident, type, DESCription, frequency_mhz FROM airport_freq JOIN airports ON airport_freq.airport_ref = airports.id WHERE airports.ident = 'KLAX'` | `airport_freq.merge(airports[airports.ident == 'KLAX'][['id']], left_on='airport_ref', right_on='id', how='inner')[['airport_ident', 'type', 'DESCription', 'frequency_mhz']]` |
| `SELECT * FROM df1 LEFT JOIN df2 ON df1.key = df2.key;` | `pd.merge(df1, df2, on='key', how='left')` |
| `SELECT * FROM df1 FULL OUTER JOIN df2 ON df1.key = df2.key;` | `pd.merge(df1, df2, on='key', how='outer')` |

### UNION ALL & UNION
|     SQL             |       Pandas               |
|:----------:|:----------------:|
| `SELECT name, municipality FROM airports WHERE ident = 'KLAX' union all SELECT name, municipality FROM airports WHERE ident = 'KLGB'` | `pd.concat([airports[airports.ident == 'KLAX'][['name', 'municipality']], airports[airports.ident == 'KLGB'][['name', 'municipality']]])` |

To deduplicate things (equivalent of `UNION`), you’d also have to add `.drop_duplicates()`:

```python
pd.concat([df1, df2]).drop_duplicates()
```

### INSERT
|         SQL                  |           Pandas             |
|:---------------:|:-----------------------:|
| `create table heroes (id integer, name text);` | `df1 = pd.DataFrame({'id': [1, 2], 'name': ['Harry Potter', 'Ron Weasley']})` |
| `insert into heroes values (1, 'Harry Potter');`  | `df2 = pd.DataFrame({'id': [3], 'name': ['Hermione Granger']})` |
| `insert into heroes values (2, 'Ron Weasley');`  |                      |
| `insert into heroes values (3, 'Hermione Granger');` | `pd.concat([df1, df2]).reset_index(drop=True)`   |

```python
new_row = pd.DataFrame({'video_id': ['EkZGBdY0vlg'],
                        'channel_title': ['Professor Leonard'],
                        'title': ['Calculus 3 Lecture 13.3: Partial Derivatives']})
df = df.append(new_row, ignore_index=True)
```

### UPDTAE
|         SQL                  |           Pandas             |
|:---------------:|:-----------------------:|
| `update airports set home_link = 'http://www.lawa.org/welcomelax.aspx' WHERE ident == 'KLAX'` | `airports.loc[airports['ident'] == 'KLAX', 'home_link'] = 'http://www.lawa.org/welcomelax.aspx'` |

### ALTER
|         SQL                  |           Pandas             |
|:---------------:|:-----------------------:|
| `ALTER TABLE table ADD column` | `df['like_ratio'] = df['likes'] / (df['likes'] + df['dislikes'])` |

### DELETE
|         SQL                  |           Pandas             |
|:---------------:|:-----------------------:|
| `DELETE FROM lax_freq WHERE type = 'MISC'` | `lax_freq = lax_freq[lax_freq.type != 'MISC']`     |
|         | `lax_freq.drop(lax_freq[lax_freq.type == 'MISC'].index)` |

In pandas we can use .drop() method to remove the rows whose indices we pass in. Unlike other methods this one doesn't accept boolean arrays as input. So we must convert our condition's output to indices. We can do that with np.where() function.

In the example below we deleted all the rows where channel_title != '3Blue1Brown'.

```sql
DELETE FROM df WHERE channel_title != '3Blue1Brown';
```

```python
# only keep the opposite
df = df[df.channel_title == '3Blue1Brown']
# or drop based on the condition:
df = df.drop(np.where(df['channel_title'] != '3Blue1Brown')[0])
```

## Immutability
I need to mention one important thing — immutability. By default, most operators applied to a Pandas dataframe return a new object. Some operators accept a parameter inplace=True, so you can work with the original dataframe instead. For example, here is how you would reset an index in-place:

```python 
df.reset_index(drop=True, inplace=True)
```

However, the .loc operator in the UPDATE example above simply locates indices of records to updates, and the values are changed in-place. Also, if you updated all values in a column:

```python
df['url'] = 'http://google.com'
```

or added a new calculated column:

```python
df['total_cost'] = df['price'] * df['quantity']
```

## Pandas Export
```python
df.to_csv(...)  # csv file
df.to_hdf(...)  # HDF5 file
df.to_pickle(...)  # serialized object
df.to_sql(...)  # to SQL database
df.to_excel(...)  # to Excel sheet
df.to_json(...)  # to JSON string
df.to_html(...)  # render as HTML table
df.to_feather(...)  # binary feather-format
df.to_latex(...)  # tabular environment table
df.to_stata(...)  # Stata binary data files
df.to_msgpack(...)	# msgpack (serialize) object
df.to_gbq(...)  # to a Google BigQuery table.
df.to_string(...)  # console-friendly tabular output.
df.to_clipboard(...) # clipboard that can be pasted into Excel
```

## References
* [Pandas Doc - Comparison with SQL](https://pandas.pydata.org/docs/getting_started/comparison/comparison_with_sql.html#pandas-equivalents-for-some-sql-analytic-and-aggregate-functions)
