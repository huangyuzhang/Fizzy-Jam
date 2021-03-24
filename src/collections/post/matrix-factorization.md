---
title: 'Matrix Factorization'
slug: matrix-factorization
date: 2019-05-23
tags: 
  - math
  - machine-learning
authors:
  - huangyuzhang
image: 
description: Matrix factorization is a class of algorithms used for recommendation systems in machine learning. Matrix factorization algorithms work by decomposing dimensionality. Commonly known matrix factorization algorithms are SVD and PCA.
---
Matrix factorization is a class of algorithms used for recommendation systems in machine learning. Matrix factorization algorithms work by decomposing dimensionality. Commonly known matrix factorization algorithms are SVD and PCA.

<!-- more -->

$$\begin{array}{c|cc}
 & m_1 & m_2 & m_3 & m_4 \\
\hline
u_1 &  &  w_{12}^{um} &  &\\
u_2 & w_{21}^{um} &  &  &\\
u_3 &  &  &  w_{32}^{um} &
\end{array}$$

## How do we compute matrix factorizations?

Possible approach:  

$$\min _{W, Z}\left\|W Z^{T}-X\right\|_{\mathrm{Fro}}^{2}$$

Here $||\cdot||_{Fro}$ denotes the so-called Frobenius norm, i.e.:

$$\|X\|_{\mathrm{Fro}} :=\sqrt{\sum_{i=1}^{s} \sum_{j=1}^{n}\left|x_{i j}\right|^{2}}$$

Then we can add regularization to the model for $W$ and $Z$:

$$\min _{W, Z}\left\|W Z^{T}-X\right\|_{\mathrm{Fro}}^{2}+R_{1}(W)+R_{2}(Z)$$

Here we need to choose suitable regularization functions $R_1$ and $R_2$. 

Since $W\cdot Z^{T}$ is equal to a value with more than one solution, thus this optimization problem is not a convex problem. We could use coordinate descent also called alternating minimization to solve this problem.

## Coordinate Descent / Alternating Minimization

> keep one fixed. 其基本思路是一次优化一个参数（坐标），轮流循环，将复杂优化问题分解为简单的子问题

Example:

$$W^{k+1}=\arg \min _{W}\left\|W\left(Z^{k}\right)^{T}-X\right\|^{2}$$

$$Z^{k+1}=\arg \min _{Z}\left\|W^{k+1} Z^{T}-X\right\|^{2}$$

$$\Rightarrow \left\{
             \begin{array}{lr}
             W^{k+1}=X Z^{k}\left(\left(Z^{k}\right)^{T} Z^{k}\right)^{-1} &  \\
             Z^{k+1}=\left(\left(\left(W^{k+1}\right)^{T} W^{k+1}\right)^{-1}\left(W^{k+1}\right)^{T} X\right)^{T} &  
             \end{array}
\right.$$

## Singular Value Decomposition

We can obtain other kinds of matrix factorizations. A very popular one is the singular value decomposition:

> 奇异值分解 (Singular Value Decomposition)，它能将任意矩阵分解为两个正交阵和一个对角阵，并揭示出矩阵的许多性质。

Every matrix $X \in \mathbb{R}^{s \times n}$ can be written as

$$X=U \Sigma V^{T}$$

$U \in \mathbb{R}^{s \times s}$ is unitary matrix, i.e. $U^{T} U=I$

$V \in \mathbb{R}^{n \times n}$ is unitary matrix, i.e. $V^{T} V=I$

$$
\Sigma=
\left( 
\begin{array}{lllllll}{
	\sigma_{1}} & {0} & {\ldots} & {0} & {0} & {\ldots} & {0} \\
	{0} & \sigma_{2} & {\ldots} & {0} & {0} & {\ldots} & {0} \\
	{\vdots} & {\vdots} & {\ddots} & {0} & {0} & {\ldots} & {0} \\
	{0} & {0} & {\ldots} & \sigma_{s} & {0} & {\ldots} & {0} \\
\end{array}
\right) \in \mathbb{R}^{s \times n}=\text { diagonal } \quad \text{for s less than n}$$

$\sigma_1$ is the largest, $\sigma_s$ is the smallest

$$\Sigma=
\left( 
\begin{array}{llll}{
	\sigma_{1}} & {0} & {\ldots} & {0} 
	\\ {0} & {\sigma_{2}} & {\ldots} & {0} \\ {0} & {0} & {\ddots} & {0} \\ {0} & {0} & {\ldots} & {\sigma_{n}} \\ {0} & {0} & {\ldots} & {0} \\ {\vdots} & {\vdots} & {\ddots} & {\vdots} \\ {0} & {0} & {\ldots} & {0}
\end{array}
\right) \in \mathbb{R}^{s \times n}=\text { diagonal } \quad \text{for} s>n$$

Now for unitary matrices, we have:

$$\|U x\|^{2}=\langle U x, U x\rangle=\left\langle x, {U}^{T} U x\right\rangle=\langle x, x\rangle=\|x\|^{2}$$

i.e., rotations do not affect the **Euclidean norm** (Frobenius norm)

$$\|X V w\|^{2}=\left\|U \Sigma V^{T} V w\right\|^{2}=\langle U \Sigma w, U \Sigma w\rangle==\langle\Sigma w, \Sigma w\rangle=\sum_{i=1}^{S} \sigma_{i}^{2}\left|w_{i}\right|^{2}$$

## Principal Component Analysis
Principal Component Analysis is another matrix factorization algorithm which is similar to SVD.