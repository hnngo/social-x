module.exports = (content) => {
  const now = new Date();
  console.log(`[${now.toLocaleDateString()} ${now.toLocaleTimeString()}] ${content}`);
}
