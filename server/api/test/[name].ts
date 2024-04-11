export default defineEventHandler((event)=>{
  //获取请求随机接口名称
  console.log(event.context.params.name);

  //获取接口后面带的参数 /api/test/aaa?a=222  { a: '222' }
  console.log(getQuery(event))
  return {
    name:'大萨达撒11111',
    sex:'男22222'
  }
})