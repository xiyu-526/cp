export default defineEventHandler(async (event)=>{
  //想让接口是post 就在接口文件名加个post , get请求就加 get 如：server/api/list.get.ts  server/api/list.post.ts 

  //获取post 提交的 body体内容
  //const body = await readBody(event);

  return {
    name:'大萨达撒',
    sex:'男'
  }
})