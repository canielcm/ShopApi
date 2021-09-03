# ShopApi
This is an API for a Shop

  # costumer routes
get('/costumers')
get('/costumers/:id')
```post('/costumers') -> body: {"emailcostumer", "namecostumer", "phonenumbercostumer", "passwordcostumer"}```
put('/costumers/:id') -> body: {"namecostumer", "phonenumbercostumer"}
delete('/costumers/:id')

  # product routes
get('/products')
get('/products/:id')
post('/products') -> body: {"descriptionproduct", "nameproduct", "amountproduct", "idcategory", "idprovider", "price", "urlimg"}
put('/products/:id') -> body: {"descriptionproduct", "nameproduct", "amountproduct", "idcategory", "idprovider", "price", "urlimg"}
delete('/products/:id')
    # productData (additional queries)
  get('/productsdata') // obtener más atributos de la lista de todos los productos
  get('/productsdata/:category') //filtrar por categoría

  # cart routes
get('/cart/:idcostumer')
post('/cart') -> body: {"idcostumer", "idproduct", "amount"} // si producto no existe, crea; si existe, suma amount (o resta si amount es negativo)
put('/cart') -> body: {"idcostumer", "idproduct", "amount"} // solo actualiza amount; idcostumer y idproduct son para hallar el carrito
delete('/cart/:idcostumer/:idproduct')
delete('/cart/:idcostumer)

  # purchase routes
get('/purchase')
get('/purchase/:id')
get('/purchase/costumer/:idcostumer') // todas las compras de un mismo cliente
post('/purchase') -> body : {"idcostumer", "idhome"} // realiza la compra según lo que halla en el carrito (realiza la transacción completa)
put('/purchase/:id') _> body : {"processed"} // solo se actualiza el estado de procesado, atributo boolean.

  # home routes
get('/home/:id')
get('/home/:city/:homeaddress')
post('/home') -> body: {"homeaddress", "city", "descriptionhome" } // si ciudad y dirección existen retorna el objecto, sino lo crea.
//una dirección no se puede actualizar o eliminar en el modelo de negocios planteado.

  # provider routes
get('/provider')
get('/provider/:id')
post('/provider') -> body: {"nameprovider", "emailprovider", "phonenumber"}
put('/provider/:id') -> body: {"nameprovider", "emailprovider", "phonenumber"}
// un proveedor no puede eliminarse en el modelo de negocios planteado.

  # category routes
get('/category')
get('/category/:id')
get('/category/name/:name')
post('/category') -> body: {"namecategory", "descriptioncategory"}
put('/category/:id') -> body: {"namecategory", "descriptioncategory"}
delete('/category/:id')