---
title: 'Export stargazer table in .tex & .html'
slug: export-stargazer-table
date: 2019-05-07
tags: 
  - data
authors:
  - huangyuzhang
image: https://i.loli.net/2020/11/20/uC4hckjFwiEI2VS.jpg
description: "For statistical analysis, we usually use `stargazer` package in R to generate tables with regression analysis results." 
---
For statistical analysis, we usually use `stargazer` package in R to generate tables with regression analysis results. 

<!-- more -->

In order to put those tables into our report, we need to output it in `.tex` or `.html` file format. To do so, we need to specify this in the R command:
```r
# use stargazer package
library(stargazer)

# build linear models
fit1 <- lm(Y ~ x1) 
fit2 <- lm(Y ~ x1+x2+x3)

# output stargazer table
stargazer(fit1, fit2, omit=c("var"), 
          align=TRUE, type = "text", no.space = TRUE, 
          title = "Table X", out = "path/fit.tex")

# you can specify the out file extension with html or tex

```
We can also change the `type = "text"` to `type = "latex"`or remove the type property, the `tex` code will be print to the console of R. Please also see the package documentation for details: [stargazer.pdf](https://cran.r-project.org/web/packages/stargazer/stargazer.pdf).