let timerId;
let time = 0;
const stopwatch = document.getElementById("stopwatch");
let hour, min, sec;

const $stButton = document.getElementById("st");

const $waitFiveSec = document.getElementById("waitFiveSec");
const $reset = document.getElementById("resetClock");

function printTime() {
  time++;
  stopwatch.innerText = getTimeFormatString();
}

//시계 시작 - 재귀호출로 반복실행
function toggle() {
  if ($stButton.innerText == "start") {
    startClock();
    $stButton.innerText = "stop";
  } else if ($stButton.innerText == "stop") {
    stopClock();
    $stButton.innerText = "start";
  }
}
$stButton.addEventListener("click", toggle);

//시계 시작 - 재귀호출로 반복실행
function startClock() {
  printTime();
  stopClock();
  timerId = setTimeout(startClock, 1000);
}

//시계 중지
function stopClock() {
  if (timerId != null) {
    clearTimeout(timerId);
  }
}

// 시계 초기화
function resetClock() {
  stopClock();
  stopwatch.innerText = "00:00:00";
  time = 0;
  $stButton.innerText = "start";
}

function waitFiveSec() {
  return new Promise((resolve, reject) => {
    stopClock();
    timerId = setTimeout(() => {
      resolve(true);
    }, 5000);
  });
}

$waitFiveSec.addEventListener("click", async () => {
  if ($stButton.innerText == "start") return;
  try {
    await waitFiveSec();
    console.log("Finished waiting for 5 seconds");
    startClock(); // Resume the clock after waiting
  } catch (error) {
    console.log("Failed to wait for 5 seconds");
  }
});

$reset.addEventListener("click", resetClock);

// 시간(int)을 시, 분, 초 문자열로 변환
function getTimeFormatString() {
  hour = parseInt(String(time / (60 * 60)));
  min = parseInt(String((time - hour * 60 * 60) / 60));
  sec = time % 60;

  return (
    String(hour).padStart(2, "0") +
    ":" +
    String(min).padStart(2, "0") +
    ":" +
    String(sec).padStart(2, "0")
  );
}
