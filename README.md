### Register Format
```json
{
    "name":"Juan",
    "lastname":"Pipo",
    "password":"12345",
    "email":"juan_pipo54@hotmail.com"
}
```
### Login Format
```json
{
    "password":"12345",
    "email":"juan_pipo54@hotmail.com"
}
```
### Response Format
```js
    {
        success:Boolean,
        message:"Message",
        status:404
        error:{
            message:"Error Message",
        }
        data:{
            
        }
    }
```