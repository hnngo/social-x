// Exponential times action after failure
export const retryAsyncActionExp = async (times, action) => {
  let step = 1;

  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  } 

  const execAction = async (step) => {
    const [res] = await Promise.all([
      action()
        .then((res) => res)
        .catch(() => false),
      timeout(Math.pow(4, step >= times ? 0 : step) * 1000)
    ]);

    return res
  }

  let res;
  while (step <= times) {
    res = await execAction(step)
    if (res) {
      break;
    }

    step += 1;
  }

  return res;
};
