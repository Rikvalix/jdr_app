export default defineEventHandler((event) => {
  console.log(`Requête:${new Date()} : ${getRequestURL(event)}`)
})