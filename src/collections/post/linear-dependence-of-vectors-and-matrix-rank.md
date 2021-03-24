---
title: 'Linear Dependence of Vectors and Matrix Rank'
slug: linear-dependence-of-vectors-and-matrix-rank
date: 2019-05-25
tags: 
  - math
authors:
  - huangyuzhang
image: 
description:
---
## Linear Dependence of Vectors
A set of vectors is **linearly independent** if no vector in the set is (a) a scalar multiple of another vector in the set or (b) a linear combination of other vectors in the set; conversely, a set of vectors is **linearly dependent** if any vector in the set is (a) a scalar multiple of another vector in the set or (b) a linear combination of other vectors in the set.

Consider the row vectors below:

$$\mathbf{a}=\left[ \begin{array}{lll}{1} & {2} & {3}\end{array}\right] \quad  \mathbf{d}=\left[ \begin{array}{lll}{2} & {4} & {6}\end{array}\right]$$ 

$$\mathbf{b}=\left[\begin{array}{lll}{4} & {5} & {6}\end{array}\right] \quad \mathbf{e}=\left[ \begin{array}{lll}{0} & {1} & {0}\end{array}\right]$$ 

$$\mathbf{c}=\left[ \begin{array}{lll}{5} & {7} & {9}\end{array}\right] \quad \mathbf{f}=\left[ \begin{array}{lll}{0} & {0} & {1}\end{array}\right]$$

Note the following:

- Vectors **a** and **b** are linearly independent, because neither vector is a scalar multiple of the other.
- Vectors **a** and **d** are linearly dependent, because **d** is a scalar multiple of **a**; i.e., **d** = 2**a**.
- Vector **c** is a linear combination of vectors a and b, because **c** = **a** + **b**. Therefore, the set of vectors **a**, **b**, and **c** is linearly dependent.
- Vectors **d**, **e**, and **f** are linearly independent, since no vector in the set can be derived as a scalar multiple or a linear combination of any other vectors in the set.

## The Rank of a Matrix

You can think of an $r  \times c$ matrix as a set of **r** row vectors, each having **c** elements; or you can think of it as a set of c column vectors, each having **r** elements.

The **rank** of a matrix is defined as 
- the maximum number of linearly independent column vectors in the matrix
- the maximum number of linearly independent row vectors in the matrix. 

Both definitions are equivalent.

For a matrix $\mathbb{R}^{r \times c}$,
- If $r < c$, then the maximum rank of the matrix is **r**.
- If $r > c$, then the maximum rank of the matrix is **c**.
The rank of a matrix would be zero only if the matrix had no elements. If a matrix had even one element, its minimum rank would be one.

## Extended / Augmented Matrix
Consider the system of equations

$$\begin{aligned} x+y+2 z &=3 \\ x+y+z &=1 \\ 2 x+2 y+2 z &=2 \end{aligned}$$

The coefficient matrix is

$$A=\left[ \begin{array}{lll}{1} & {1} & {2} \\ {1} & {1} & {1} \\ {2} & {2} & {2}\end{array}\right]$$

and the augmented matrix is

$$(A | B)=\left[ \begin{array}{lll|l}{1} & {1} & {2} & {3} \\ {1} & {1} & {1} & {1} \\ {2} & {2} & {2} & {2}\end{array}\right]$$

## Practices
### Question 1
Consider the matrix X, shown below.

$$\mathbf{X}=\left[ \begin{array}{llll}{1} & {2} & {4} & {4}\\ {3} & {4} & {8} & {0}\end{array}\right]$$

What is its rank?
(A) 0 (B) 1 (C) 2 (D) 3 (E) 4

### Solution 1
The correct answer is (C). Since the matrix has more than zero elements, its rank must be greater than zero. And since it has fewer rows than columns, its maximum rank is equal to the maximum number of linearly independent rows. And because neither row is linearly dependent on the other row, the matrix has 2 linearly independent rows; so its rank is 2.

### Question 2
Consider the matrix Y, shown below.

$$\mathbf{Y}=\left[ \begin{array}{lll}{1} & {2} & {3} \\ {2} & {3} & {5} \\ {3} & {4} & {7} \\ {4} & {5} & {9}\end{array}\right]$$

What is its rank?
(A) 0 (B) 1 (C) 2 (D) 3 (E) 4

### Solution 2
The correct answer is (C). Since the matrix has more than zero elements, its rank must be greater than zero. And since it has fewer columns than rows, its maximum rank is equal to the maximum number of linearly independent columns.

Columns 1 and 2 are independent, because neither can be derived as a scalar multiple of the other. However, column 3 is linearly dependent on columns 1 and 2, because column 3 is equal to column 1 plus column 2. That leaves the matrix with a maximum of two linearly independent columns; that is., column 1 and column 2. So the matrix rank is 2.

### Question 3
How do you solve the linear system $Ax = b$? When is it not possible, and why?

### Solution 3
In order to see wether we can solve $Ax = b$ we want to look at the relative rank of A and [A|b] (the <u>extended matrix</u>). Suppose that A and b have size respectively $m \times n$ and m then [A|b] has size $m \times (n + 1)$. Then :
- A is a square matrix s.t. rank(A) = m : the system has a unique solution
- rank(A) < rank([A|b]) : the system has no solution
- rank(A) = rank([A|b]) < n : the system has inﬁnitely many solutions