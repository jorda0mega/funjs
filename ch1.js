function existy(x){
  return x!=null;
}

function isIndexed(data) {
  return _.isArray(data) || _.isString(data);
}

function cat(){
  var head = _.first(arguments);
  if(existy(head)){
    return head.concat.apply(head, _.rest(arguments));
  }
  else
    return [];
}

function construct(head, tail){
  return cat([head], _.toArray(tail));
}

function nth(a, index) {
  if (!_.isNumber(index)) fail("Expected a number as the index");
  if (!isIndexed(a)) fail("Not supported on non-indexed type");
  if ((index < 0) || (index > a.length - 1)) fail("Index value is out of bounds");

  return a[index];
}

function second(a){
  return nth(a,1);
}
