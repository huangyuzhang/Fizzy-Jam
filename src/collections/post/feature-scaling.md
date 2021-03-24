---
title: 'Feature Scaling in Machine Learning'
slug: feature-scaling
date: 2019-06-20
tags: 
  - machine-learning
authors:
  - huangyuzhang
image: https://i.loli.net/2020/11/20/cwbtOXBYQmC6Fn2.jpg
description: Feature scaling stands for transforming variable values into a certain standard range. Feature scaling can quite important for certain machine learning algorithms, such as gradient descent, support vector machine. This post is about introducing several feature scaling techniques.
---
Feature scaling stands for transforming variable values into a certain standard range. Feature scaling can quite important for certain machine learning algorithms, such as gradient descent, support vector machine. This post is about introducing several feature scaling techniques.

<!-- more -->

## Why Scale Features?
Machine Learning algorithms don't perform well when the input numerical attributes have different scales significantly (Ge), i.e. some features may range from 0 to 10 while another range from 1,000 to 10,000. This may cause some algorithms to assign these two variables with different importance. 

For example, in the k-nearest neighbor algorithm, the classifier mainly calculates the Euclidean distance between two points. If a feature has a larger range value than other features, the distance will be dominated by this eigenvalue. Therefore each feature should be normalized, such as processing the range of values between 0 and 1.


In addition, feature scaling would make the algorithms (gradient descent) to converge faster.

Decision tree like algorithms are usually not sensitive to feature scales.


## Methods of Feature Scaling
### 1. Rescaling/Min-Max Scaling

In this approach, the data is scaled to a fixed range - usually [0,1] or [-1,1]. The cost of having this bounded range is that we will end up with smaller standard deviations, which can suppress the effect of outliers.

$$x^{\prime}=\frac{x-\min (x)}{\max (x)-\min (x)}$$

#### Usage

```python
from sklearn.preprocessing import MinMaxScaler
```

#### Advantages
1. enhances the stability of attributes with small variance
2. keeps the 0s in a sparse matrix


### 2. Standardization
Feature standardization makes the values of each feature in the data have zero-mean (when subtracting the mean in the numerator) and unit-variance (1). 

This method is widely used in machine learning algorithms, e.g. SVM, logistic regression and neural networks.

$$x^{\prime}=\frac{x-\overline{x}}{\sigma}$$


$$\sigma=\sqrt{\frac{\sum(x-\operatorname{mean}(x))^{2}}{n}}$$

#### Usage

```python
from sklearn.preprocessing import StandardScaler
```

### 3. Mean normalisation

$$x^{\prime}=\frac{x-\operatorname{mean}(x)}{\max (x)-\min (x)}$$

### 4. Scaling to unit length
Devided by the Euclidean length of the vector, two norm.

$$x^{\prime}=\frac{x}{\|x\|}$$
