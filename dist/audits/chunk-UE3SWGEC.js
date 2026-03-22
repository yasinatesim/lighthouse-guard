import{createRequire as __cjsReq}from'module';const require=__cjsReq(import.meta.url);
import {
  __name
} from "./chunk-XE6XARIN.js";

// node_modules/lighthouse/core/lib/tracehouse/task-groups.js
var taskGroups = {
  parseHTML: {
    id: "parseHTML",
    label: "Parse HTML & CSS",
    traceEventNames: ["ParseHTML", "ParseAuthorStyleSheet"]
  },
  styleLayout: {
    id: "styleLayout",
    label: "Style & Layout",
    traceEventNames: [
      "ScheduleStyleRecalculation",
      "UpdateLayoutTree",
      // previously RecalculateStyles
      "InvalidateLayout",
      "Layout"
    ]
  },
  paintCompositeRender: {
    id: "paintCompositeRender",
    label: "Rendering",
    traceEventNames: [
      "Animation",
      "HitTest",
      "PaintSetup",
      "Paint",
      "PaintImage",
      "RasterTask",
      // Previously Rasterize
      "ScrollLayer",
      "UpdateLayer",
      "UpdateLayerTree",
      "CompositeLayers",
      "PrePaint"
      // New name for UpdateLayerTree: https://crrev.com/c/3519012
    ]
  },
  scriptParseCompile: {
    id: "scriptParseCompile",
    label: "Script Parsing & Compilation",
    traceEventNames: ["v8.compile", "v8.compileModule", "v8.parseOnBackground"]
  },
  scriptEvaluation: {
    id: "scriptEvaluation",
    label: "Script Evaluation",
    traceEventNames: [
      "EventDispatch",
      "EvaluateScript",
      "v8.evaluateModule",
      "FunctionCall",
      "TimerFire",
      "FireIdleCallback",
      "FireAnimationFrame",
      "RunMicrotasks",
      "V8.Execute"
    ]
  },
  garbageCollection: {
    id: "garbageCollection",
    label: "Garbage Collection",
    traceEventNames: [
      "MinorGC",
      // Previously GCEvent
      "MajorGC",
      "BlinkGC.AtomicPhase",
      // Previously ThreadState::performIdleLazySweep, ThreadState::completeSweep, BlinkGCMarking
      // Kept for compatibility on older traces
      "ThreadState::performIdleLazySweep",
      "ThreadState::completeSweep",
      "BlinkGCMarking"
    ]
  },
  other: {
    id: "other",
    label: "Other",
    traceEventNames: [
      "MessageLoop::RunTask",
      "TaskQueueManager::ProcessTaskFromWorkQueue",
      "ThreadControllerImpl::DoWork"
    ]
  }
};
var taskNameToGroup = {};
for (const group of Object.values(taskGroups)) {
  for (const traceEventName of group.traceEventNames) {
    taskNameToGroup[traceEventName] = group;
  }
}

// node_modules/lighthouse/core/lib/tracehouse/main-thread-tasks.js
var MainThreadTasks = class _MainThreadTasks {
  static {
    __name(this, "MainThreadTasks");
  }
  /**
   * @param {LH.TraceEvent} event
   * @param {LH.TraceEvent} [endEvent]
   * @return {TaskNode}
   */
  static _createNewTaskNode(event, endEvent) {
    const isCompleteEvent = event.ph === "X" && !endEvent;
    const isStartEndEventPair = event.ph === "B" && endEvent && endEvent.ph === "E";
    if (!isCompleteEvent && !isStartEndEventPair) {
      throw new Error("Invalid parameters for _createNewTaskNode");
    }
    const startTime = event.ts;
    const endTime = endEvent ? endEvent.ts : event.ts + Number(event.dur || 0);
    const newTask = {
      event,
      endEvent,
      startTime,
      endTime,
      duration: endTime - startTime,
      // These properties will be filled in later
      unbounded: false,
      parent: void 0,
      children: [],
      attributableURLs: [],
      group: taskGroups.other,
      selfTime: NaN
    };
    return newTask;
  }
  /**
   *
   * @param {TaskNode} currentTask
   * @param {number} stopTs
   * @param {PriorTaskData} priorTaskData
   * @param {Array<LH.TraceEvent>} reverseEventsQueue
   */
  static _assignAllTimersUntilTs(currentTask, stopTs, priorTaskData, reverseEventsQueue) {
    while (reverseEventsQueue.length) {
      const nextTimerInstallEvent = reverseEventsQueue.pop();
      if (!nextTimerInstallEvent) break;
      if (nextTimerInstallEvent.ts > stopTs) {
        reverseEventsQueue.push(nextTimerInstallEvent);
        break;
      }
      if (nextTimerInstallEvent.ts < currentTask.startTime) {
        continue;
      }
      const timerId = nextTimerInstallEvent.args.data.timerId;
      priorTaskData.timers.set(timerId, currentTask);
    }
  }
  /**
   * This function takes the start and end events from a thread and creates tasks from them.
   * We do this by iterating through the start and end event arrays simultaneously. For each start
   * event we attempt to find its end event.
   *
   * Because of this matching of start/end events and the need to be mutating our end events queue,
   * we reverse the array to more efficiently `.pop()` them off rather than `.shift()` them off.
   * While it's true the worst case runtime here is O(n^2), ~99.999% of the time the reverse loop is O(1)
   * because the overwhelmingly common case is that end event for a given start event is simply the very next event in our queue.
   *
   * @param {LH.TraceEvent[]} taskStartEvents
   * @param {LH.TraceEvent[]} taskEndEvents
   * @param {number} traceEndTs
   * @return {TaskNode[]}
   */
  static _createTasksFromStartAndEndEvents(taskStartEvents, taskEndEvents, traceEndTs) {
    const tasks = [];
    const taskEndEventsReverseQueue = taskEndEvents.slice().reverse();
    for (let i = 0; i < taskStartEvents.length; i++) {
      const taskStartEvent = taskStartEvents[i];
      if (taskStartEvent.ph === "X") {
        tasks.push(_MainThreadTasks._createNewTaskNode(taskStartEvent));
        continue;
      }
      let matchedEventIndex = -1;
      let matchingNestedEventCount = 0;
      let matchingNestedEventIndex = i + 1;
      for (let j = taskEndEventsReverseQueue.length - 1; j >= 0; j--) {
        const endEvent = taskEndEventsReverseQueue[j];
        for (; matchingNestedEventIndex < taskStartEvents.length; matchingNestedEventIndex++) {
          if (taskStartEvents[matchingNestedEventIndex].ts >= endEvent.ts) break;
          if (taskStartEvents[matchingNestedEventIndex].name === taskStartEvent.name) {
            matchingNestedEventCount++;
          }
        }
        if (endEvent.name !== taskStartEvent.name) continue;
        if (endEvent.ts < taskStartEvent.ts) continue;
        if (matchingNestedEventCount > 0) {
          matchingNestedEventCount--;
          continue;
        }
        matchedEventIndex = j;
        break;
      }
      let taskEndEvent;
      let unbounded = false;
      if (matchedEventIndex === -1) {
        taskEndEvent = { ...taskStartEvent, ph: "E", ts: traceEndTs };
        unbounded = true;
      } else if (matchedEventIndex === taskEndEventsReverseQueue.length - 1) {
        taskEndEvent = /** @type {LH.TraceEvent} */
        taskEndEventsReverseQueue.pop();
      } else {
        taskEndEvent = taskEndEventsReverseQueue.splice(matchedEventIndex, 1)[0];
      }
      const task = _MainThreadTasks._createNewTaskNode(taskStartEvent, taskEndEvent);
      task.unbounded = unbounded;
      tasks.push(task);
    }
    if (taskEndEventsReverseQueue.length) {
      throw new Error(
        `Fatal trace logic error - ${taskEndEventsReverseQueue.length} unmatched end events`
      );
    }
    return tasks;
  }
  /**
   * This function iterates through the tasks to set the `.parent`/`.children` properties of tasks
   * according to their implied nesting structure. If any of these relationships seem impossible based on
   * the timestamps, this method will throw.
   *
   * @param {TaskNode[]} sortedTasks
   * @param {LH.TraceEvent[]} timerInstallEvents
   * @param {PriorTaskData} priorTaskData
   */
  static _createTaskRelationships(sortedTasks, timerInstallEvents, priorTaskData) {
    let currentTask;
    const timerInstallEventsReverseQueue = timerInstallEvents.slice().reverse();
    for (let i = 0; i < sortedTasks.length; i++) {
      let nextTask = sortedTasks[i];
      if (nextTask.event.name === "XHRReadyStateChange") {
        const data = nextTask.event.args.data;
        const url = data?.url;
        if (data && url && data.readyState === 1) priorTaskData.xhrs.set(url, nextTask);
      }
      while (currentTask && Number.isFinite(currentTask.endTime) && currentTask.endTime <= nextTask.startTime) {
        _MainThreadTasks._assignAllTimersUntilTs(
          currentTask,
          currentTask.endTime,
          priorTaskData,
          timerInstallEventsReverseQueue
        );
        currentTask = currentTask.parent;
      }
      if (currentTask) {
        if (nextTask.endTime > currentTask.endTime) {
          const timeDelta = nextTask.endTime - currentTask.endTime;
          if (timeDelta < 1e3) {
            currentTask.endTime = nextTask.endTime;
            currentTask.duration += timeDelta;
            let cur = currentTask.parent;
            while (cur && cur.endTime < nextTask.endTime) {
              cur.duration += nextTask.endTime - cur.endTime;
              cur.endTime = nextTask.endTime;
              cur = cur.parent;
            }
          } else if (nextTask.unbounded) {
            nextTask.endTime = currentTask.endTime;
            nextTask.duration = nextTask.endTime - nextTask.startTime;
          } else if (nextTask.startTime - currentTask.startTime < 1e3 && !currentTask.children.length) {
            const actualParentTask = nextTask;
            const actualChildTask = currentTask;
            const grandparentTask = currentTask.parent;
            if (grandparentTask) {
              const lastGrandparentChildIndex = grandparentTask.children.length - 1;
              if (grandparentTask.children[lastGrandparentChildIndex] !== actualChildTask) {
                throw new Error("Fatal trace logic error - impossible children");
              }
              grandparentTask.children.pop();
              grandparentTask.children.push(actualParentTask);
            }
            actualParentTask.parent = grandparentTask;
            actualParentTask.startTime = actualChildTask.startTime;
            actualParentTask.duration = actualParentTask.endTime - actualParentTask.startTime;
            currentTask = actualParentTask;
            nextTask = actualChildTask;
          } else {
            const error = new Error("Fatal trace logic error - child cannot end after parent");
            error.timeDelta = timeDelta;
            error.nextTaskEvent = nextTask.event;
            error.nextTaskEndEvent = nextTask.endEvent;
            error.nextTaskEndTime = nextTask.endTime;
            error.currentTaskEvent = currentTask.event;
            error.currentTaskEndEvent = currentTask.endEvent;
            error.currentTaskEndTime = currentTask.endTime;
            throw error;
          }
        }
        nextTask.parent = currentTask;
        currentTask.children.push(nextTask);
        _MainThreadTasks._assignAllTimersUntilTs(
          currentTask,
          nextTask.startTime,
          priorTaskData,
          timerInstallEventsReverseQueue
        );
      }
      currentTask = nextTask;
    }
    if (currentTask) {
      _MainThreadTasks._assignAllTimersUntilTs(
        currentTask,
        currentTask.endTime,
        priorTaskData,
        timerInstallEventsReverseQueue
      );
    }
  }
  /**
   * This function takes the raw trace events sorted in increasing timestamp order and outputs connected task nodes.
   * To create the task heirarchy we make several passes over the events.
   *
   *    1. Create three arrays of X/B events, E events, and TimerInstall events.
   *    2. Create tasks for each X/B event, throwing if a matching E event cannot be found for a given B.
   *    3. Sort the tasks by ↑ startTime, ↓ duration.
   *    4. Match each task to its parent, throwing if there is any invalid overlap between tasks.
   *    5. Sort the tasks once more by ↑ startTime, ↓ duration in case they changed during relationship creation.
   *
   * @param {LH.TraceEvent[]} mainThreadEvents
   * @param {PriorTaskData} priorTaskData
   * @param {number} traceEndTs
   * @return {TaskNode[]}
   */
  static _createTasksFromEvents(mainThreadEvents, priorTaskData, traceEndTs) {
    const taskStartEvents = [];
    const taskEndEvents = [];
    const timerInstallEvents = [];
    for (const event of mainThreadEvents) {
      if (event.ph === "X" || event.ph === "B") taskStartEvents.push(event);
      if (event.ph === "E") taskEndEvents.push(event);
      if (event.name === "TimerInstall") timerInstallEvents.push(event);
    }
    const tasks = _MainThreadTasks._createTasksFromStartAndEndEvents(
      taskStartEvents,
      taskEndEvents,
      traceEndTs
    );
    const sortedTasks = tasks.sort(
      (taskA, taskB) => taskA.startTime - taskB.startTime || taskB.duration - taskA.duration
    );
    _MainThreadTasks._createTaskRelationships(sortedTasks, timerInstallEvents, priorTaskData);
    return sortedTasks.sort(
      (taskA, taskB) => taskA.startTime - taskB.startTime || taskB.duration - taskA.duration
    );
  }
  /**
   * @param {TaskNode} task
   * @param {TaskNode|undefined} parent
   * @return {number}
   */
  static _computeRecursiveSelfTime(task, parent) {
    if (parent && task.endTime > parent.endTime) {
      throw new Error("Fatal trace logic error - child cannot end after parent");
    }
    const childTime = task.children.map((child) => _MainThreadTasks._computeRecursiveSelfTime(child, task)).reduce((sum, child) => sum + child, 0);
    task.selfTime = task.duration - childTime;
    return task.duration;
  }
  /**
   * @param {TaskNode} task
   * @param {string[]} parentURLs
   * @param {string[]} allURLsInTree
   * @param {PriorTaskData} priorTaskData
   */
  static _computeRecursiveAttributableURLs(task, parentURLs, allURLsInTree, priorTaskData) {
    const args = task.event.args;
    const argsData = { ...args.beginData || {}, ...args.data || {} };
    const frame = argsData.frame || "";
    let frameURL = priorTaskData.frameURLsById.get(frame);
    const stackFrameURLs = (argsData.stackTrace || []).map((entry) => entry.url);
    const potentialFrameURL = stackFrameURLs[0];
    if (frame && frameURL && frameURL.startsWith("about:") && potentialFrameURL) {
      priorTaskData.frameURLsById.set(frame, potentialFrameURL);
      frameURL = potentialFrameURL;
    }
    let taskURLs = [];
    switch (task.event.name) {
      /**
       * Some trace events reference a specific script URL that triggered them.
       * Use this URL as the higher precedence attributable URL.
       * @see https://cs.chromium.org/chromium/src/third_party/blink/renderer/devtools/front_end/timeline/TimelineUIUtils.js?type=cs&q=_initEventStyles+-f:out+f:devtools&sq=package:chromium&g=0&l=678-744
       */
      case "v8.compile":
      case "EvaluateScript":
      case "FunctionCall":
        taskURLs = [argsData.url, frameURL];
        break;
      case "v8.compileModule":
        taskURLs = [task.event.args.fileName];
        break;
      case "TimerFire": {
        const timerId = task.event.args.data.timerId;
        const timerInstallerTaskNode = priorTaskData.timers.get(timerId);
        if (!timerInstallerTaskNode) break;
        taskURLs = timerInstallerTaskNode.attributableURLs;
        break;
      }
      case "ParseHTML":
        taskURLs = [argsData.url, frameURL];
        break;
      case "ParseAuthorStyleSheet":
        taskURLs = [argsData.styleSheetUrl, frameURL];
        break;
      case "UpdateLayoutTree":
      case "Layout":
      case "Paint":
        if (frameURL) {
          taskURLs = [frameURL];
          break;
        }
        if (allURLsInTree.length) break;
        taskURLs = priorTaskData.lastTaskURLs;
        break;
      case "XHRReadyStateChange":
      case "XHRLoad": {
        const xhrUrl = argsData.url;
        const readyState = argsData.readyState;
        if (!xhrUrl || typeof readyState === "number" && readyState !== 4) break;
        const xhrRequesterTaskNode = priorTaskData.xhrs.get(xhrUrl);
        if (!xhrRequesterTaskNode) break;
        taskURLs = xhrRequesterTaskNode.attributableURLs;
        break;
      }
      default:
        taskURLs = [];
        break;
    }
    const attributableURLs = Array.from(parentURLs);
    for (const url of [...taskURLs, ...stackFrameURLs]) {
      if (!url) continue;
      if (!allURLsInTree.includes(url)) allURLsInTree.push(url);
      if (attributableURLs.includes(url)) continue;
      attributableURLs.push(url);
    }
    task.attributableURLs = attributableURLs;
    task.children.forEach(
      (child) => _MainThreadTasks._computeRecursiveAttributableURLs(
        child,
        attributableURLs,
        allURLsInTree,
        priorTaskData
      )
    );
    if (!attributableURLs.length && !task.parent && allURLsInTree.length) {
      _MainThreadTasks._setRecursiveEmptyAttributableURLs(task, allURLsInTree);
    }
  }
  /**
   * @param {TaskNode} task
   * @param {Array<string>} urls
   */
  static _setRecursiveEmptyAttributableURLs(task, urls) {
    if (task.attributableURLs.length) return;
    task.attributableURLs = urls.slice();
    task.children.forEach(
      (child) => _MainThreadTasks._setRecursiveEmptyAttributableURLs(
        child,
        urls
      )
    );
  }
  /**
   * @param {TaskNode} task
   * @param {TaskGroup} [parentGroup]
   */
  static _computeRecursiveTaskGroup(task, parentGroup) {
    const group = taskNameToGroup[task.event.name];
    task.group = group || parentGroup || taskGroups.other;
    task.children.forEach((child) => _MainThreadTasks._computeRecursiveTaskGroup(child, task.group));
  }
  /**
   * @param {LH.TraceEvent[]} mainThreadEvents
   * @param {Array<{id: string, url: string}>} frames
   * @param {number} traceEndTs
   * @param {number} [traceStartTs] Optional time-0 ts for tasks. Tasks before this point will have negative start/end times. Defaults to the first task found.
   * @return {TaskNode[]}
   */
  static getMainThreadTasks(mainThreadEvents, frames, traceEndTs, traceStartTs) {
    const timers = /* @__PURE__ */ new Map();
    const xhrs = /* @__PURE__ */ new Map();
    const frameURLsById = /* @__PURE__ */ new Map();
    frames.forEach(({ id, url }) => frameURLsById.set(id, url));
    const lastTaskURLs = [];
    const priorTaskData = { timers, xhrs, frameURLsById, lastTaskURLs };
    const tasks = _MainThreadTasks._createTasksFromEvents(
      mainThreadEvents,
      priorTaskData,
      traceEndTs
    );
    for (const task of tasks) {
      if (task.parent) continue;
      _MainThreadTasks._computeRecursiveSelfTime(task, void 0);
      _MainThreadTasks._computeRecursiveAttributableURLs(task, [], [], priorTaskData);
      _MainThreadTasks._computeRecursiveTaskGroup(task);
      priorTaskData.lastTaskURLs = task.attributableURLs;
    }
    const firstTs = traceStartTs ?? tasks[0].startTime;
    for (const task of tasks) {
      task.startTime = (task.startTime - firstTs) / 1e3;
      task.endTime = (task.endTime - firstTs) / 1e3;
      task.duration /= 1e3;
      task.selfTime /= 1e3;
      if (!Number.isFinite(task.selfTime)) {
        throw new Error("Invalid task timing data");
      }
    }
    return tasks;
  }
  /**
   * Prints an artistic rendering of the task tree for easier debugability.
   *
   * @param {TaskNode[]} tasks
   * @param {{printWidth?: number, startTime?: number, endTime?: number, taskLabelFn?: (node: TaskNode) => string}} options
   * @return {string}
   */
  static printTaskTreeToDebugString(tasks, options = {}) {
    const traceEndMs = Math.max(...tasks.map((t) => t.endTime), 0);
    const {
      printWidth = 100,
      startTime = 0,
      endTime = traceEndMs,
      taskLabelFn = /* @__PURE__ */ __name((node) => node.event.name, "taskLabelFn")
    } = options;
    function computeTaskDepth(task) {
      let depth = 0;
      for (; task.parent; task = task.parent) depth++;
      return depth;
    }
    __name(computeTaskDepth, "computeTaskDepth");
    const traceRange = endTime - startTime;
    const characterInMs = traceRange / printWidth;
    const taskLegend = /* @__PURE__ */ new Map();
    const tasksByDepth = /* @__PURE__ */ new Map();
    for (const task of tasks) {
      if (task.startTime > endTime || task.endTime < startTime) continue;
      const depth = computeTaskDepth(task);
      const tasksAtDepth = tasksByDepth.get(depth) || [];
      tasksAtDepth.push(task);
      tasksByDepth.set(depth, tasksAtDepth);
      const id = String.fromCharCode(65 + taskLegend.size % 26);
      taskLegend.set(task, { id, task });
    }
    const debugStringLines = [
      `Trace Duration: ${traceEndMs.toFixed(0)}ms`,
      `Range: [${startTime}, ${endTime}]`,
      `\u2588 = ${characterInMs.toFixed(2)}ms`,
      ""
    ];
    const increasingDepth = Array.from(tasksByDepth.entries()).sort((a, b) => a[0] - b[0]);
    for (const [, tasks2] of increasingDepth) {
      const taskRow = Array.from({ length: printWidth }).map(() => " ");
      for (const task of tasks2) {
        const taskStart = Math.max(task.startTime, startTime);
        const taskEnd = Math.min(task.endTime, endTime);
        const { id } = taskLegend.get(task) || { id: "?" };
        const startIndex = Math.floor(taskStart / characterInMs);
        const endIndex = Math.floor(taskEnd / characterInMs);
        const idIndex = Math.floor((startIndex + endIndex) / 2);
        for (let i = startIndex; i <= endIndex; i++) taskRow[i] = "\u2588";
        for (let i = 0; i < id.length; i++) taskRow[idIndex] = id;
      }
      debugStringLines.push(taskRow.join(""));
    }
    debugStringLines.push("");
    for (const { id, task } of taskLegend.values()) {
      debugStringLines.push(`${id} = ${taskLabelFn(task)}`);
    }
    return debugStringLines.join("\n");
  }
};

export {
  taskGroups,
  MainThreadTasks
};
/*! Bundled license information:

lighthouse/core/lib/tracehouse/task-groups.js:
lighthouse/core/lib/tracehouse/main-thread-tasks.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
