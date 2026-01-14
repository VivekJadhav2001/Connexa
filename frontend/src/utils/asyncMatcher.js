export const isPending =
  (...thunks) =>
  (action) =>
    thunks.some((thunk) => thunk.pending.match(action));

export const isFulfilled =
  (...thunks) =>
  (action) =>
    thunks.some((thunk) => thunk.fulfilled.match(action));

export const isRejected =
  (...thunks) =>
  (action) =>
    thunks.some((thunk) => thunk.rejected.match(action));
