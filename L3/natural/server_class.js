'use strict';

var data = require('./data');

var natural = require('natural'),
  classifier = new natural.BayesClassifier(natural.PorterStemmerRu);


for (var i = 0; i < data.auto.length; i++) {
  classifier.addDocument(data.auto[i], 'auto');
  console.log('learn auto');
};

for (var i = 0; i < data.sport.length; i++) {
  classifier.addDocument(data.sport[i], 'sport');
  console.log('learn sport');
};
for (var i = 0; i < data.realty.length; i++) {
  classifier.addDocument(data.realty[i], 'realty');
  console.log('learn realty');
};
classifier.train();

console.log('= = = = = = = = = =');
console.log('START CLASSIFICATION');

console.log('Test on auto');
for (var i = 0; i < data.test_auto.length; i++) {
  console.log("> ",classifier.classify(data.test_auto[i]));
};

console.log('Test on sport');
for (var i = 0; i < data.test_sport.length; i++) {
  console.log("> ",classifier.classify(data.test_sport[i]));
};

console.log('Test on sport');
for (var i = 0; i < data.test_realty.length; i++) {
  console.log("> ",classifier.classify(data.test_realty[i]));
};