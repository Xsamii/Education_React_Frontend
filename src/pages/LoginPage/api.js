export const login =(userName,password)=>{
    if (userName === 'admin'&&password==='admin') {
        return {
            status:200,
            user:'admin',
            role:'admin'
        }
        
    }
    return 
}