# hdb_sales

Visualisation using google app scripts and javascript inside html.

It reads bar chart data from https://flo.uri.sh/visualisation/3957251/embed 
![image](https://user-images.githubusercontent.com/32192638/148335939-8ce4f687-ce1c-4714-975c-00d7ce05b5f3.png)


With the data extracted, it generates Animated bar charts
![image](https://user-images.githubusercontent.com/32192638/148336036-93f7a250-e8af-47f2-b1bb-a4e4d77fd6e9.png)

how to create use this code ?
[1]
Creates a google app script project.

[2]
Creates Code.gs using the codes found in the github.

[3]
To make the script reads from google sheet.
- Modify line 1 to define the googlesheet url.
- Modify line 2 to set read_from_googlesheet to value true

[4]
Creates Index.html using the codes found in the github.

