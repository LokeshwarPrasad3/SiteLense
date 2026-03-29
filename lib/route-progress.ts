type RouteProgressState = {
  isVisible: boolean;
  progress: number;
};

const START_DELAY_MS = 120;
const TRICKLE_INTERVAL_MS = 160;
const MIN_VISIBLE_MS = 220;

let state: RouteProgressState = {
  isVisible: false,
  progress: 0,
};

let isNavigating = false;
let visibleAt = 0;
let startDelayTimer: ReturnType<typeof setTimeout> | null = null;
let trickleTimer: ReturnType<typeof setInterval> | null = null;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function setState(nextState: Partial<RouteProgressState>) {
  state = { ...state, ...nextState };
  emit();
}

function clearStartDelay() {
  if (startDelayTimer) {
    clearTimeout(startDelayTimer);
    startDelayTimer = null;
  }
}

function clearHideTimer() {
  if (hideTimer) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
}

function clearTrickle() {
  if (trickleTimer) {
    clearInterval(trickleTimer);
    trickleTimer = null;
  }
}

function startTrickling() {
  clearTrickle();
  trickleTimer = setInterval(() => {
    setState({
      progress: state.progress + (95 - state.progress) * (state.progress < 60 ? 0.18 : 0.08),
    });
  }, TRICKLE_INTERVAL_MS);
}

function reveal() {
  if (!isNavigating || state.isVisible) {
    return;
  }

  visibleAt = Date.now();
  setState({
    isVisible: true,
    progress: 12,
  });
  startTrickling();
}

function hide() {
  clearHideTimer();
  clearTrickle();
  setState({
    isVisible: false,
    progress: 0,
  });
}

export function startRouteProgress() {
  isNavigating = true;
  clearHideTimer();

  if (state.isVisible) {
    setState({ progress: Math.max(state.progress, 18) });
    return;
  }

  clearStartDelay();
  startDelayTimer = setTimeout(() => {
    startDelayTimer = null;
    reveal();
  }, START_DELAY_MS);
}

export function doneRouteProgress() {
  isNavigating = false;
  clearStartDelay();

  if (!state.isVisible) {
    return;
  }

  clearTrickle();
  setState({ progress: 100 });

  const remainingVisibleTime = Math.max(0, MIN_VISIBLE_MS - (Date.now() - visibleAt));
  hideTimer = setTimeout(hide, remainingVisibleTime + 120);
}

export function subscribeRouteProgress(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getRouteProgressState() {
  return state;
}
