---
title: HiveSQL Tricks for A Better Life
slug: hivesql-tricks
date: 2020-04-02
authors:
  - huangyuzhang
tags:
  - sql
  - data
image: null
description: This post is mainly a notebook I use to record some practical
  HiveSQL tricks during daily work. Hopefully it will also make your life
  easier.
---
This post is mainly a notebook I use to record some practical HiveSQL tricks during daily work. Hopefully it will also make your life easier. 

<!-- more -->

## Concatenate strings from several rows by SQL

We use the same logic as we did in Pandas to perform the task.

```SQL
SELECT  t.user_id
        ,concat_ws(',',collect_set(tag)) AS tags
        ,concat_ws(',',collect_set(product)) AS products
FROM    table_name
GROUP BY user_id
```

<center>all tags and products will grouped by each user name, seperated by comma</center>

## Remove duplicates in a more efficient way

We use `ROW_NUMBER()` function to identify the replicated rows and then simply select the rows we need.

```SQL
SELECT	user_id
        ,product_id
        ,order_time
FROM (
        SELECT	user_id
                ,product_id
                ,order_time
                ,ROW_NUMBER() OVER (PARTITION BY user_id, product_id ORDER BY order_time ASC) AS rn
        FROM    orders
) t
WHERE t.rn = 1
```

<center>We select the first record for any products purchased by all users</center>

First we select all rows like we'd normally do, then we add a new column `ROW_NUMBER()` with partition by `user_id` and `product_id`. This is similar to `.groupby(['user_id','product_id'])` in `pandas`. Then the ordering is by `order_time` ascendingly, meaning the earliest order will be numbered as 1.

Due to the `ROW_NUMBER()` cannot in `WHERE` clause, we need to embed the query to select the rows we need. For dropping duplicates, `WHERE t.rn = 1` will do the trick. We can also keep the earliest 5 orders for all users:

```SQL
SELECT	user_id
        ,product_id
        ,order_time
FROM (
        SELECT	user_id
                ,product_id
                ,order_time
                ,ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_time ASC) AS rn
        FROM    orders
) t
WHERE t.rn <= 5
```

here only partition by user_id, and rn <= 5

## Fill string with certain characters to a fixed length

`LPAD( string str, int len, string pad)` and `RPAD( string str, int len, string pad)`

For example, `lpad('9:00:00',8,'0')` can be used to add a "0"  in front of "9:00:00"  so it becomes "09:00:00", but it won't add 0 to "13:00:00" since "13:00:00" has 8 characters.

## Get Object from JSON Embedded Rows

```SQL
SPLIT_PART(get_json_object(sentence,'$.redirect_url'),'-',2,2)
```

## Concat Distinct Values by Columns

```SQL
SELECT  user_id
        ,CONCAT_WS(',',COLLECT_SET(type)) AS types
        ,CONCAT_WS(',',COLLECT_SET(product_name)) AS product_names
FROM    user_purchase 
WHERE   ds = '${bizdate}'
GROUP BY user_id
```

## Get Percentile

```SQL
WITH score AS (
        SELECT  month
                ,user_id
                ,score
        FROM    user_score
)
SELECT  month
        ,percentile_approx(score,0)     AS score_0    -- min
        ,percentile_approx(score,0.05)  AS score_5    -- 5%
        ,percentile_approx(score,0.25)  AS score_25   -- 1st quarter
        ,percentile_approx(score,0.5)   AS score_50   -- median
        ,percentile_approx(score,0.75)  AS score_75   -- 3rd quarter
        ,percentile_approx(score,0.95)  AS score_95   -- 95%
        ,percentile_approx(score,1)     AS score_100  -- max
FROM    score
WHERE   month >= '2020-09' 
GROUP BY month
ORDER BY month DESC
;
```

## Alter Table: add columns

```SQL
 ALTER TABLE `user_info` ADD COLUMNS (
     `user_age`         BIGINT COMMENT 'User Age'
    ,`user_location`    STRING COMMENT 'User Location'
);
```

## Calculate between Rows

```SQL
# get the previous row's create_time
LAG(create_time,1) OVER (PARTITION BY user_id ORDER BY create_time)

# calculate the time difference between current row's create_time and previous
# one, group by user_id
DATEDIFF(create_time,LAG(create_time,1) OVER (PARTITION BY user_id ORDER BY create_time),'SS' ) AS time_span
```

id
DATEDIFF(create_time,LAG(create_time,1) OVER (PARTITION BY user_id ORDER BY create_time),'SS' ) AS time_span
```
Similarly, `LEAD()` is doing the opposite of `LAG()`, it will get the value of next n row(s).