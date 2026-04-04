const resetAll = (...resets: (() => void)[]) => {
  resets.forEach(reset => reset())
}

export { resetAll }
