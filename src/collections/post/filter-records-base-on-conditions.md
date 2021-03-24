---
title: 'Data Cleaning: Filter Records Base on Conditions'
slug: filter-records-base-on-conditions
date: 2019-07-15
tags: 
  - data
  - machine-learning
  - python
  - pandas
authors:
  - huangyuzhang
image: https://i.loli.net/2020/11/20/8cT4PslgCtyAXhU.jpg
description:
---
Take the following as an example to filter a data frame based on certain conditions:

> There are 2 users and some of their corresponding bill dates and bill amounts, we want to only keep ==one record for each user== with their ==billing's starting date== and the ==average bill amount==.

## Dataframe

```python
import pandas as pd

raw_data = {'User':[1,1,1,2,2,2,1], 
        'Time':['2014-01-01','2014-02-01','2014-03-01','2018-02-01','2018-01-01','2018-03-01','2014-04-01'],
        'Amount':[32,13,48,98,64,23,27]}
data = pd.DataFrame(raw_data)
data
```
| |User|Time|Amount|
|-|-:|-:|-:|
|0|1|2014-01-01|32|
|1|1|2014-02-01|13|
|2|1|2014-03-01|48|
|3|2|2018-02-01|98|
|4|2|2018-01-01|64|
|5|2|2018-03-01|23|
|6|1|2014-04-01|27|

## Solution 1
> Package: Pandas
> Function: dataframe.groupby()
> Docs: [pandas.DataFrame.groupby](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.groupby.html)
```python
# generate new columns for grouped results
data_amount = round(data.groupby(['User'], as_index=False)['Amount'].mean(),2)
data_time = data.groupby('User', as_index=False)['Time'].min()
```
```python
# merge columns to main dataframe
data_merge1 = pd.merge(data,data_time,on='User',how='left')
data_merge2 = pd.merge(data_merge1,data_amount,on='User',how='left')
data_merge2
```

||User | Time_x | Amount_x | Time_y | Amount_y |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 1 | 2014-01-01 | 32 | 2014-01-01 | 30.00 |
| 1 | 1 | 2014-02-01 | 13 | 2014-01-01 | 30.00 |
| 2 | 1 | 2014-03-01 | 48 | 2014-01-01 | 30.00 |
| 3 | 2 | 2018-02-01 | 98 | 2018-01-01 | 61.67 |
| 4 | 2 | 2018-01-01 | 64 | 2018-01-01 | 61.67 |
| 5 | 2 | 2018-03-01 | 23 | 2018-01-01 | 61.67 |
| 6 | 1 | 2014-04-01 | 27 | 2014-01-01 | 30.00 |

```python
# drop old columns and rename new columns
data_new = data_merge2.drop(columns=['Time_x','Amount_x'])
data_new = data_new.drop_duplicates(['User'])
data_new = data_new.rename(columns={'Amount_y': 'Amount_mean','Time_y':'Date'})
data_new
```
||User | Date | Amount_mean |
| ---: | ---: | ---: | ---: |
| 0 | 1 | 2014-01-01 | 30.00 |
| 3 | 2 | 2018-01-01 | 61.67 |

### Alternative
Alternatively, we could also drop_duplicates first then merge new columns:

```python
data2 = data.drop_duplicates(['User'])
data2_merge1 = pd.merge(data2,data_time,on='User',how='left')
data2_merge2 = pd.merge(data2_merge1,data_amount,on='User',how='left')
data2_merge2
```

|User | Time_x | Amount_x | Time_y | Amount_y |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 0 | 1 | 2014-01-01 | 32 | 2014-01-01 | 30.00 |
| 1 | 2 | 2018-02-01 | 98 | 2018-01-01 | 61.67 |

```python
data2_new = data2_merge2.drop(columns=['Time_x','Amount_x'])
data2_new = data2_new.drop_duplicates(['User'])
data2_new = data2_new.rename(columns={'Amount_y': 'Amount_mean','Time_y':'Date'})
data2_new
```
||User | Date | Amount_mean |
| ---: | ---: | ---: | ---: |
| 0 | 1 | 2014-01-01 | 30.00 |
| 1 | 2 | 2018-01-01 | 61.67 |

***
## Solution 2
Here we sort the value by User and Time ascendingly, then drop_cuplicates. We get a dataframe ordered by User then Time.

```python
data3 = data.sort_values(by=['User','Time'],ascending=True).drop_duplicates(['User'])
data3
```
||User | Time | Amount |
| ---: | ---: | ---: | ---: |
| 0 | 1 | 2014-01-01 | 32 |
| 4 | 2 | 2018-01-01 | 64 |

Now we only need to merge the Amount_mean to the dataframe:

```python
data3 = pd.merge(data3,data_amount,on='User',how='left')
data3
```

||User | Time | Amount_x | Amount_y |
| ---: | ---: | ---: | ---: | ---: |
| 0 | 1 | 2014-01-01 | 32 | 30.00 |
| 1 | 2 | 2018-01-01 | 64 | 61.67 |

Lastly, drop old column and rename new column:
```python
data3_new = data3.drop(columns=['Amount_x'])
data3_new = data3_new.rename(columns={'Amount_y': 'Amount_mean','Time':'Date'})
data3_new
```
||User | Date | Amount_mean |
| ---: | ---: | ---: | ---: |
| 0 | 1 | 2014-01-01 | 30.00 |
| 1 | 2 | 2018-01-01 | 61.67 |

[Source Code](https://github.com/huangyuzhang/cookbook/blob/master/parts/pandas_conditional_filtering.ipynb)