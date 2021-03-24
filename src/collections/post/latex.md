---
title: 'LaTeX Math Equations'
slug: latex
date: 2019-05-11
tags: 
  - math
authors:
  - huangyuzhang
image: 
description: Having math equations in a report can be painful. Here are some LaTeX commands often used in scientific reports. I will try to keep this post updated.
---
Having math equations in a report can be painful. Here are some LaTeX commands often used in scientific reports. I will try to keep this post updated.

<!-- more -->

The LaTeX rendering on this website is done by an open-source package **KaTeX**.

- Full list of supported symbols of Katex: [Supported Functions](https://katex.org/docs/supported.html)
- Also check [https://www.mathcha.io/editor]() for a powerful online math and diagram editor.

## Common Structures
| LaTeX Code  | Output  |
| :------------ | :------------: |
| `\frac{abc}{xyz}`  | $\frac{abc}{xyz}$ | 
| `\overline{abc}`  |  $\overline{abc}$ |  
| `\underline{abc}` |  $\underline{abc}$ |
| `\overrightarrow{abc}`| $\overrightarrow{abc}$  | 
| `\overleftarrow{abc}`| $\overleftarrow{abc}$  | 
| `\sqrt{abc}`  | $\sqrt{abc}$ |
| `\sqrt[n]{abc}`  | $\sqrt[n]{abc}$ |
| `\widehat{abc}`  | $\widehat{abc}$ |
| `\widetilde{abc}`  | $\widetilde{abc}$ |
| `𝚏''` | $f''$ |
| `\overbrace{abc}`  | $\overbrace{abc}$ |
| `\underbrace{abc}`  | $\underbrace{abc}$ |
| `\underbrace{x+\cdots+x}_{n\text{ times}}` | $\underbrace{x+\cdots+x}_{n\text{ times}}$ |
| `\frac{\partial y}{\partial x1}` | $\frac{\partial y}{\partial x1}$ |
| `\frac{\mathrm{d} Q}{\mathrm{d} t}` | $\frac{\mathrm{d} Q}{\mathrm{d} t}$ |
| `\sum^{n}_{i=1}` | $$\sum^{n}_{i=1}$$ | 
| `\prod^{n}_{i=1}` | $$\prod^{n}_{i=1}$$ |
| `\lim_{x\to\infty} f(x)` | $$\lim_{x\to\infty} f(x)$$ |
| `\int_{a}^{b} x^2 dx` | $$\int_{a}^{b} x^2 dx$$ |

## Math Operators
| Code | Output|
| ---- | :-----: |
| `\delta` | $\delta$ |
| `\Delta` | $\Delta$ |
| `\nabla` | $\nabla$ |
| `\forall` | $\forall$ |
| `\mathbb{R}` | $\mathbb{R}$ |
| `\in` | $\in$ |

## Arrows and Brackets
| Code | Output|
| ---- | :-----: |
| `\leftarrow` | $\leftarrow$ |
| `\Leftarrow` | $\Leftarrow$ |
| `\rightarrow` | $\rightarrow$ |
| `\Rightarrow` | $\Rightarrow$ |
| `\leftrightarrow` | $\leftrightarrow$ |
| `\Leftrightarrow` | $\Leftrightarrow$ |

## Greek Letters
`\alpha` α `\beta` β `\gamma` γ `\delta` δ `\epsilon` ϵ `\zeta` ζ `\eta` η `\theta` θ `\iota` ι `\kappa` κ `\lambda` λ `\mu` μ `\nu` ν `\xi` ξ `\omicron` ο `\pi` π `\rho` ρ `\sigma` σ `\tau` τ `\upsilon` υ `\phi` ϕ `\chi` χ `\psi` ψ `\omega` ω `\varepsilon` ε `\vartheta` ϑ `\varkappa` ϰ `\varpi` ϖ `\varrho` ϱ `\varsigma` ς `\varphi` φ `\digamma` ϝ

## Sample Equations
### 1. Code
`\frac{\mathrm{d}}{\mathrm{d} x}\left[|w x-y|^{2}\right]=2(w x-y) \cdot w`

### 1. Output
$$\frac{\mathrm{d}}{\mathrm{d} x}\left[|w x-y|^{2}\right]=2(w x-y) \cdot w$$

### 2. Code
`\sigma=\frac{e^z}{1+e^z}` 

`\sigma’=\frac{e^z}{(1+e^z)^2}=\frac{e^z}{1+e^z} \cdot \frac{1}{1+e^z} =\sigma(1-\sigma)`

### 2. Output
$$\sigma=\frac{e^z}{1+e^z}$$ 

$$\sigma’=\frac{e^z}{(1+e^z)^2}=\frac{e^z}{1+e^z} \cdot \frac{1}{1+e^z} =\sigma(1-\sigma)$$

### 3.Code
```latex
\left\{
             \begin{array}{lr}
             x=\dfrac{3\pi}{2}(1+2t)\cos(\dfrac{3\pi}{2}(1+2t)), &  \\
             y=s, & 0\leq s\leq L,|t|\leq1.\\
             z=\dfrac{3\pi}{2}(1+2t)\sin(\dfrac{3\pi}{2}(1+2t)), &  
             \end{array}
\right.
```
### 3.Output
$$
\left\{
             \begin{array}{lr}
             x=\dfrac{3\pi}{2}(1+2t)\cos(\dfrac{3\pi}{2}(1+2t)), &  \\
             y=s, & 0\leq s\leq L,|t|\leq1.\\
             z=\dfrac{3\pi}{2}(1+2t)\sin(\dfrac{3\pi}{2}(1+2t)), &  
             \end{array}
\right.
$$
