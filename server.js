const express = require('express');

express().use(express.static(__dirname + '/build')).listen(5000, () => console.log('Server up on PORT 5000'));
