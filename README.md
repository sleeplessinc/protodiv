# PROTODIV

Simple client-side code for displaying dynamic data.


## Example

See page1.html for example usage.

See page2.html as example of how the page can be completely change without having to modify the code
or data at all.


## Why?

* Because much of the runtime work of constructing the page is shifted from the server to the client
* The HTML can easily be designed and built by non-programmers.
* The raw, dynamic data and the display of that data is almost entirely separated


## Why is that good?

Scaling and cost of development. 

Cost of development is reduced because expensive programmers aren't needed whenever
a change to the layout of the page is made.  There is a lot less interaction required
between the programmers and web designers.  Time is saved, and cost is reduced.
The code is very small and very simple.  It's not dependent on any other libraries or
modules.  The less code there is in your application, the fewer bugs you will have, and
the easier and faster it is to build things.  There is no need to find, setup, configure,
and "learn" big, complicated 3rd party packages.

With separation of the dynamic data and the static page layout, scaling becomes easier
in that the static content is increased, and the dynamic data is decreased.  Delivery of static
data is cheaper and easier to scale up.  Delivery of less dyanmic data
saves on bandwidth and reduces load on the servers that talk to the database, which
is the weak spot when scaling.  In addition, having the dynamic data servers deliver only
raw, unadorned data, you will automatically get a near complete RESTful API for so that
any client can consume the data how it pleases.

