---
title: 'Deploy Dash on Server by Gunicorn'
slug: deploy-dash-on-server
date: 2019-10-18
tags: 
  - data-visualization
  - python
authors:
  - huangyuzhang
image: 
description: Dash is an open-sourced Python Dashboard package from plot.ly. It's pretty easy to use and has a lot of components to build beautiful and informative graphs and charts.
---
Dash is an open-sourced Python Dashboard package from plot.ly. It's pretty easy to use and has a lot of components to build beautiful and informative graphs and charts.

<!-- more -->

## Install Packages
```bash
pip install dash==1.4.1  # The core dash backend
pip install dash-daq==0.2.1  # DAQ components (newly open-sourced!)
pip install gunicorn
```
## Demo Dash Script
Create a Python file `graph.py` with following code:
```bash
import dash
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd
import plotly.graph_objs as go
import flask

external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']

server = flask.Flask(__name__) # define flask app.server

app = dash.Dash(__name__, external_stylesheets=external_stylesheets, server=server) # call flask server

# run following in command
# gunicorn graph:app.server -b :8000


df = pd.read_csv(
    'https://gist.githubusercontent.com/chriddyp/' +
    '5d1ea79569ed194d432e56108a04d188/raw/' +
    'a9f9e8076b837d541398e999dcbac2b2826a81f8/'+
    'gdp-life-exp-2007.csv')


app.layout = html.Div([
    dcc.Graph(
        id='life-exp-vs-gdp',
        figure={
            'data': [
                go.Scatter(
                    x=df[df['continent'] == i]['gdp per capita'],
                    y=df[df['continent'] == i]['life expectancy'],
                    text=df[df['continent'] == i]['country'],
                    mode='markers',
                    opacity=0.7,
                    marker={
                        'size': 15,
                        'line': {'width': 0.5, 'color': 'white'}
                    },
                    name=i
                ) for i in df.continent.unique()
            ],
            'layout': go.Layout(
                xaxis={'type': 'log', 'title': 'GDP Per Capita'},
                yaxis={'title': 'Life Expectancy'},
                margin={'l': 40, 'b': 40, 't': 10, 'r': 10},
                legend={'x': 0, 'y': 1},
                hovermode='closest'
            )
        }
    )
])

if __name__ == '__main__':
    app.run_server(debug=True)
```

## Local Development
Run python `graph.py` to initiate local development preview on http://localhost:8050. This will enable hot reload to every changes saved will cause the page to be refreshed.

## Initiate Gunicorn
We can use Gunicorn to deploy the dashboard in production environment. Run the following command within the same folder with `graph.py`

```bash
gunicorn graph:app.server -b :8000
```

Then visit http://127.0.0.1:8000 (or server IP:8000 from remote) to view the dashboard.

## Customize CSS
It's fairly simple to cutomize Dash with other CSS frameworks or customize your own CSS.

Modify the header part of your python file as follows:
```python
import dash
import dash_core_components as dcc
import dash_html_components as html
import pandas as pd
import plotly.graph_objs as go
import flask

server = flask.Flask(__name__) # define flask app.server

app = dash.Dash(__name__, server=server) # call flask server

# run following in command
# gunicorn graph:app.server -b :8000
```
<center>Here we no longer use external CSS as before</center>

Then create a folder `assets` under the root of your dash application, put all your CSS and JavaScript files into this folder. So Dash will automatically render the page based on these files when starting the app.

> [Dash User Guide and Documentation](https://dash.plot.ly/external-resources)