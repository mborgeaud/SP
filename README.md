# SP.js: SharePoint REST Api Class

SP is a small jQuery plugin to help you use work with SharePoint List Items.

## Getting started
1. Download the latest version of SP.js *(4 kilobytes)*
2. jQuery (https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js) 1.7+ is required

Put **jQuery** and **SP.js** just before the closing `</body>` tag in your html

```html
<html>
  <head>
    <title>Your Website</title>
    <link rel="stylesheet" href="your/styles.css">
  </head>
  <body>
    <!-- your website here -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type="text/javascript" src="path/to/SP.js"></script>
  </body>
</html>
```

## Testing SP

* To create a new List Item, use:

SP.createListItem('http://my-site.org','Employee',{Name:'John', LastName:'Doe', Age:33} );


* To get all List Items, use:

SP.getListItems('http://my-site.org','Employee','',function(employees) {console.log(employees);} );

* To get List Item ID #2, use:

SP.getListItem('http://my-site.org','Employee',2,function(employee) {console.log(employee);} );


* To update List Items ID #2:



SP.updateListItem('http://my-site.org','Employee',{ID:2, Age:34},function() {console.log("done!");} );


* To delete List Items ID #2:

SP.deleteListItem('http://my-site.org','Employee',2,function() {console.log("done!");} );

## Copyright and license

Copyright 2016 Matias Borgeaud [1]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0][2]

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

  [1]: http://www.matiasborgeaud.com.ar/
  [2]: http://www.apache.org/licenses/LICENSE-2.0
