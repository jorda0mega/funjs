function myLength(ar){
  if(_.isEmpty(ar)){
    return 0;
  }
  return 1 + myLength(_.rest(ar));
}

function cycle(ar, times){
  if(times <= 0){
    return [];
  }
  return ar.concat(cycle(ar, times-1));
}

function constructPair(pair, rests){
  return [construct(_.first(pair), _.first(rests)),
          construct(second(pair), second(rests))];
}

// when working with pairs and need to account for the odd case
// using an empty or default element helps in writing a general method
function unzip(pairs){
  if(_.isEmpty(pairs)) return [[],[]];
  return constructPair(_.first(pairs),unzip(_.rest(pairs)));
}

var influences = [
  ["Lisp","Smalltalk"],
  ["Lisp", "Scheme"],
  ["Smalltalk","Self"],
  ["Scheme","Javascript"],
  ["Scheme","Lua"],
  ["Self","Lua"],
  ["Self","Javascript"]];

function nexts(influences, target){
  var relation = _.first(influences);
  if(_.isEmpty(influences)) return [];
  if(_.first(relation) === target) return construct(second(relation),nexts(_.rest(influences), target));
  return nexts(_.rest(influences), target);
}

function depthSearch(graph, nodes, seen){
  if(_.isEmpty(nodes)) return seen;

  var parent = _.first(nodes);
  console.info(parent);
  console.info(nexts(graph, parent));
  var tail = _.rest(nodes);
  if(_.contains(seen, parent)){
    return depthSearch(graph, tail, seen);
  }
  return depthSearch(graph, cat(tail, nexts(graph, parent)), construct(parent, seen));
}


function andify(/*pred */){
  var preds = _.toArray(arguments);

  return function(/*args*/){
    var args = _.toArray(arguments);

    var everything = function(ps, truth){
      if(_.isEmpty(ps)) return truth;

      return _.every(args, _.first(ps)) && everything(_.rest(ps), truth);
    };
    return everything(preds, true);
  };
}

function orify(/*preds */){
  var preds = _.toArray(arguments);

  return function(/*args*/){
    var something = function(ps, truth){
      if(_.isEmpty(ps)) return truth;

      return _.some(args, _.first(ps)) || something(_.rest(ps), truth);
    };

    return something(preds, false);
  };
}
