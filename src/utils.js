function fcfs(processes) {
  sortProcesses(processes, [["aTime", 1]]);
  handleIdle(processes);

  processes = processes.map((process) => ({
    ...process,
    rTime: process.startTime - Number(process.aTime),
    wTime: process.startTime - Number(process.aTime),
    cTime: process.startTime + Number(process.bTime),
    tat: process.startTime + Number(process.bTime) - Number(process.aTime)
  }));

  // console.log(processes);
  return processes;
}

class Queue {
  constructor() {
    this.q = Array(10);
    this.size = 0;
    this.capacity = 10;
    this.front = -1;
    this.rear = 0;
  }
  enqueue(val) {
    if (this.size === this.capacity - 1) {
      this.q = [...this.q, Array(10)];
      this.capacity += 10;
    }
    this.q[this.rear] = val;
    this.rear = (this.rear + 1) % this.capacity;
    this.size++;
  }
  dequeue() {
    if (this.size !== 0) {
      this.front = (this.front + 1) % this.capacity;
      this.size--;
      return this.q[this.front];
    }
  }
  length() {
    return this.size;
  }
  isEmpty() {
    return this.size === 0;
  }
}

function rr(processes, timeSlice) {
  sortProcesses(processes, [["aTime", 1]]);
  // console.log("Sorted");
  // console.log(processes);

  let time = 0;

  processes = processes.map((process) => ({
    ...process,
    remainingTime: Number(process.bTime)
  }));

  // console.log("R Burst");
  // console.log(processes);

  let newOrder = [];
  let completed = [];
  if (Number(processes[0].aTime) > 0) {
    newOrder.push({
      pName: "Idle",
      aTime: 0,
      bTime: Number(processes[0].aTime),
      startTime: 0
    });
    time = Number(processes[0].aTime);
  }

  let len = processes.length;
  let processesCompleted = 0;
  let q = new Queue();
  let temp;
  let currBurst = 0;

  q.enqueue(processes[0]);
  processes.splice(0, 1);
  while (processesCompleted !== len) {
    // console.log("Inside While, processes Completed = " + processesCompleted + "   len = " + len + "  completed length = " + completed.length);
    while (!q.isEmpty()) {
      temp = q.dequeue();

      if (temp.remainingTime === Number(temp.bTime))
        temp.startTime = Number(time);

      currBurst =
        temp.remainingTime >= Number(timeSlice)
          ? Number(timeSlice)
          : temp.remainingTime;
      newOrder.push({ ...temp, bTime: currBurst, startTime: time });
      time += currBurst;
      temp.remainingTime -= currBurst;

      // Insert process entering between 'time' and 'timeSlice'
      for (var p = 0; p < processes.length; p++) {
        if (
          Number(processes[p].aTime) >= time - currBurst &&
          Number(processes[p].aTime) <= time
        ) {
          q.enqueue(processes.splice(p, 1)[0]);
          p--;
        } else {
          break;
        }
      }

      // Insert temp back into queue if remaining burst
      if (temp.remainingTime > 0) q.enqueue(temp);
      else {
        completed.push({
          ...temp,
          tat: time - Number(temp.aTime),
          wTime: time - Number(temp.aTime) - Number(temp.bTime),
          rTime: temp.startTime - Number(temp.aTime),
          cTime: time
        });
        //   console.log("Increasing Process Completed");
        processesCompleted++;
      }
    }

    if (processesCompleted === len) break;
    if (newOrder[newOrder.length - 1].pName === "Idle") {
      newOrder[newOrder.length - 1].bTime += 1;
      time += 1;
    } else {
      newOrder.push({
        pName: "Idle",
        aTime: 0,
        bTime: 1,
        startTime: time
      });
      time += 1;
    }
  }

  return [newOrder, completed];
}

function priorityS(processes, option) {
  sortProcesses(processes, [
    ["aTime", 1],
    ["priority", option === "minFirst" ? 1 : -1]
  ]);
  handleIdle(processes);

  processes = processes.map((process) => ({
    ...process,
    rTime: process.startTime - Number(process.aTime),
    wTime: process.startTime - Number(process.aTime),
    cTime: process.startTime + Number(process.bTime),
    tat: process.startTime + Number(process.bTime) - Number(process.aTime)
  }));

  // console.log(processes);
  return processes;
}

function sjf(processes) {
  sortProcesses(processes, [
    ["aTime", 1],
    ["bTime", 1]
  ]);
  handleIdle(processes);

  processes = processes.map((process) => ({
    ...process,
    rTime: process.startTime - Number(process.aTime),
    wTime: process.startTime - Number(process.aTime),
    cTime: process.startTime + Number(process.bTime),
    tat: process.startTime + Number(process.bTime) - Number(process.aTime)
  }));

  // console.log(processes);
  return processes;
}

function srjf(processes) {
  sortProcesses(processes, [
    ["aTime", 1],
    ["bTime", 1]
  ]);

  processes = processes.map((p) => ({ ...p, remainingTime: Number(p.bTime) }));

  let newOrder = [];
  let completed = [];

  let len = processes.length;

  let time = 0;

  while (completed.length !== len) {
    if (Number(time) < Number(processes[0].aTime)) {
      newOrder.push({
        pName: "Idle",
        aTime: Number(time),
        bTime: Number(processes[0].aTime),
        startTime: Number(time)
      });

      time = Number(processes[0].aTime);
    }

    if (
      newOrder.length === 0 ||
      newOrder[newOrder.length - 1].pName !== processes[0].pName
    ) {
      newOrder.push({
        ...processes[0],
        startTime: Number(time),
        bTime: 1
      });

      if (processes[0].remainingTime === Number(processes[0].bTime))
        processes[0].startTime = Number(time);
      console.log(processes[0]);
    } else {
      newOrder[newOrder.length - 1].bTime += 1;
    }

    time += 1;
    processes[0].remainingTime -= 1;

    if (processes[0].remainingTime === 0) {
      let proc = processes.splice(0, 1)[0];
      console.log(proc);
      completed.push({
        ...proc,
        cTime: time,
        wTime: Number(time) - Number(proc.aTime) - Number(proc.bTime),
        tat: Number(time) - Number(proc.aTime),
        rTime: Number(proc.startTime) - Number(proc.aTime)
      });
    }

    if (processes.length === 0) break;

    let r1_b = Number(processes[0].remainingTime);
    for (let i = 1; i < processes.length; i++) {
      if (Number(processes[i].aTime) <= Number(time)) {
        if (Number(processes[i].remainingTime) < r1_b) {
          let temp = processes[0];
          processes[0] = processes[i];
          processes[i] = temp;
          break;
        }
      } else {
        break;
      }
    }
  }

  console.log("Final");
  console.log(newOrder);
  console.log(completed);
  return [newOrder, completed];
}

function handleIdle(processes) {
  if (Number(processes[0].aTime) > 0) {
    processes.splice(0, 0, {
      pName: "Idle",
      aTime: 0,
      bTime: processes[0].aTime,
      startTime: 0
    });
  } else {
    processes[0].startTime = 0;
  }

  let len = processes.length;
  let a = 0,
    b = 0,
    c = 0;
  for (var p = 1; p < len; p++) {
    a = Number(processes[p].aTime);
    b = Number(processes[p - 1].startTime);
    c = Number(processes[p - 1].bTime);
    if (a > b + c) {
      processes.splice(p, 0, {
        pName: "Idle",
        aTime: b + c,
        bTime: a - (b + c),
        startTime: b + c
      });
      len += 1;
    } else {
      processes[p].startTime = b + c;
    }
  }

  return processes;
}

function sortProcesses(processes, listOfKeys) {
  /*
    processes :   Array of objects to be sorted
    listOfKeys:   2-D Array of Keys according to which processes needs to be sorted
                  [["key1", 1], ["key2", -1]]
                  Sort according to 'key1' in 'ascending'(denoted by '1') order
                  Sort according to 'key2' in 'decending'(denoted by '-1') order
  */

  processes.sort((a, b) => {
    for (var p = 0; p < listOfKeys.length; p++) {
      if (Number(listOfKeys[p][1]) === 1) {
        if (Number(a[listOfKeys[p][0]]) < Number(b[listOfKeys[p][0]])) {
          return -1;
        } else if (Number(a[listOfKeys[p][0]]) > Number(b[listOfKeys[p][0]])) {
          return 1;
        }
      } else {
        if (Number(a[listOfKeys[p][0]]) < Number(b[listOfKeys[p][0]])) {
          return 1;
        } else if (Number(a[listOfKeys[p][0]]) > Number(b[listOfKeys[p][0]])) {
          return -1;
        }
      }
    }
    return 0;
  });

  return processes;
}

export default fcfs;
export { rr, priorityS, sjf, srjf };
