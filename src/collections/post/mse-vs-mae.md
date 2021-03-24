---
title: 'MSE vs MAE'
slug: mse-vs-mae
date: 2019-07-18
tags: 
  - math
authors:
  - huangyuzhang
image: https://i.loli.net/2020/11/20/8gpUCVLtmuzJrMx.jpg
description: "**MSE** stands for **mean squared error**, **MAE** stands for **mean absolute error**. These are commonly used measurement in modelling."
---
**MSE** stands for **mean squared error**, **MAE** stands for **mean absolute error**. These are commonly used measurement in modelling.

<!-- more -->

$$\mathrm{MSE}=\frac{1}{n} \sum_{i=1}^{n}\left(y_{i}-\hat{y}_{i}\right)^{2}$$

$$\mathrm{MAE}=\frac{1}{n} \sum_{i=1}^{n} \left| y_{i}-\hat{y}_{i} \right| $$

MSE has several advantages over MAE, but also some disadvantages.

Just list some of them, include but not limited to:

**Decomposition of MSE into Variance and Bias square is one of the most famous advantages.** This property helps us to understand the logic behind error, especially MSE, while MAE has no such mathematical meaning.

$$\operatorname{MSE}(\hat{\theta})=\operatorname{Var}(\hat{\theta})+(\operatorname{Bias}(\hat{\theta}, \theta))^{2}$$

**MAE with absolute value calculation is not differentiable globally, while MSE can.** This make it convenient to act as loss function and help algorithm to find the gradient method for optimization.

**MSE weights a lot for the outliers than MAE and sensitive to outlier.** Model by minimizing MSE may be affected by outlier substantially.