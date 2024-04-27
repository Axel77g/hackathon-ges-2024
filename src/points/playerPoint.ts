let points = document.getElementById("point");

WA.onInit()
  .then(() => {
    WA.event.on("point-update").subscribe((event) => {
        const updatedPointValue = event.data;
        points.innerHTML = updatedPointValue;
    });
  }).catch((e) => console.error(e));