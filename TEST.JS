function go() {
  console.log("운전한다.")
  console.log();
}

function stop() {
  console.log("멈춘다.")
  console.log();
}

function traffColor(color) {
  console.log(color)
  return color;
}

function driving(TrafficLight, callbackGo, callbackStop) {
  traffColor(TrafficLight);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      
      if (TrafficLight == "red") {
        callbackStop();
      }
      else {
        callbackGo();
      }
      resolve();
    }, 1000);
  });
}


async function drive() {
  await driving("red", go, stop);
  await driving("green", go, stop);
  await driving("red", go, stop);
  await driving("green", go, stop);
  await driving("red", go, stop);

}

drive();
