---
title: 'Hessian Matrix'
slug: hessian-matrix
date: 2019-05-25
tags: 
  - math
  - Machine-learning
authors:
  - huangyuzhang
image: 
description: In mathematics, the Hessian matrix or Hessian is a square matrix of second-order partial derivatives of a scalar-valued function, or scalar field. It describes the local curvature of a function of many variables. Hessian Matrices are often used in optimization problems within Newton-Raphson's method.
---
In mathematics, the **Hessian matrix** or **Hessian** is a square matrix of <u>second-order partial derivatives</u> of a scalar-valued function, or scalar field. It describes the local curvature of a function of many variables. Hessian Matrices are often used in optimization problems within Newton-Raphson's method.

<!-- more -->

$$
\mathbf{H} f=\left[ \begin{array}{cccc}{\frac{\partial^{2} f}{\partial x^{2}}} & {\frac{\partial^{2} f}{\partial x \partial y}} & {\frac{\partial^{2} f}{\partial x \partial z}} & {\cdots} \\ {\frac{\partial^{2} f}{\partial y \partial x}} & {\frac{\partial^{2} f}{\partial y^{2}}} & {\frac{\partial^{2} f}{\partial y \partial z}} & {\cdots} \\ {\frac{\partial^{2} f}{\partial z \partial x}} & {\frac{\partial^{2} f}{\partial z \partial y}} & {\frac{\partial^{2} f}{\partial z^{2}}} & {\cdots} \\ {\vdots} & {\vdots} & {\vdots} & {\ddots}\end{array}\right]
$$

## Example 1: Computing a Hessian

**Problem**: Compute the Hessian of $f(x, y)=x^{3}-2 x y-y^{6}$.

**Solution**: 

First compute both partial derivatives:

$$f_{x}(x, y)=\frac{\partial}{\partial x}\left(x^{3}-2 x y-y^{6}\right)=3 x^{2}-2 y$$

$$f_{y}(x, y)=\frac{\partial}{\partial y}\left(x^{3}-2 x y-y^{6}\right)=-2 x-6 y^{5}$$

With these, we compute all four second partial derivatives:

$$f_{x x}(x, y)=\frac{\partial}{\partial x}\left(3 x^{2}-2 y\right)=6 x$$ 

$${f_{x y}(x, y)=\frac{\partial}{\partial y}\left(3 x^{2}-2 y\right)=-2}$$ 

$${f_{y x}(x, y)=\frac{\partial}{\partial x}\left(-2 x-6 y^{5}\right)=-2}$$ 

$$f_{y y}(x, y)=\frac{\partial}{\partial y}\left(-2 x-6 y^{5}\right)=-30 y^{4}$$

The Hessian matrix in this case is a $ 2\times 2$ matrix with these functions as entries:

$$\mathbf{H} f(x, y)=\left[ \begin{array}{cc}{f_{x x}(x, y)} & {f_{x y}(x, y)} \\ {f_{y x}(x, y)} & {f_{y y}(x, y)}\end{array}\right]=\left[ \begin{array}{cc}{6 x} & {-2} \\ {-2} & {-30 y^{4}}\end{array}\right]$$

## Example 2

**Problem**: the function $f(x)=x^{\top} A x+b^{\top} x+c$, where $A$ is a $n \times n$ matrix, $b$ is a vector of length $n$ and $c$ is a constant.
1. Determine the gradient of $f$: $\nabla f(x)$.
2. Determine the Hessian of $f$: $H_{f}(x)$.

**Solution**:

1. compute the gradient $\nabla f(x)$:
$$
\begin{aligned}
\nabla f(x)&=\underbrace{\frac{\partial x^{T}}{\partial x}\cdot (Ax)+x^{T}\cdot \frac{\partial (Ax)}{\partial x}}_{product-rule}+\frac{\partial b^Tx}{\partial x}+\frac{\partial c}{\partial x}\\
&= Ax + x^{T}\cdot A+b \\
&= Ax + x\cdot A^{T} + b \\
&= (A+A^{T})x + b
\end{aligned}
$$

2. compute the Hessian $H_{f}(x)$:
$$
H_{f}(x) = \frac{\partial \nabla f(x)}{\partial x} = A + A^{T}
$$