import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext({} as any);

export const AppProvider = ({ children }: any) => {

  //ESTADOS
  //mudar de página => valor inicial: página de bem vindo
  const [page, setPage] = useState("bemVindo");

  //usuário => admin ou não. Valor inicial: false 
  const [isAdmin, setIsAdmin] = useState(false);

  //email login
  const [email, setEmail] = useState<any>();

  // CRUD User
  const [createUser, setCreateUser] = useState(null);
  const [searchUser, setSearchUser] = useState(null);
  const [updateUser, setUpdateUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  //CRUD Product
  const [createProduct, setCreateProduct] = useState(null);
  const [searchProduct, setSearchProduct] = useState(null);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);

  //Info dos produtos 
  const [searchProductInfo, setSearchProductInfo] = useState({
    "name": "",
		"ingredient": "",
		"quantity": 1,
		"energetic": 1,
		"protein": "",
		"carb": "",
		"fat": "",
		"sodium": "",
		"cod_barras": 0,
  } as {
    "id"?: String | null,
    "name": String,
		"ingredient": String,
		"quantity": Number,
		"energetic": Number,
		"protein": String,
		"carb": String,
		"fat": String,
		"sodium": String,
		"cod_barras": Number,
  });

  //Info dos usuários
  const [searchUserInfo, setSearchUserInfo] = useState({
		"id": null,
    "name": "",
    "email": null,
    "password": "",
    "isAdmin": true,
    "created_at": ""
  } as {
		"id"?: String | null,
    "name"?: String,
    "email"?: String | null,
    "password"?: String,
    "isAdmin"?: Boolean,
    "created_at"?: String
  });

//Info do login
  const [logedUserInfo, setlogedUserInfo] = useState({
		"id": null,
    "name": "",
    "email": null,
    "password": "",
    "isAdmin": true,
    "created_at": ""
  });


  //REQUISIÇÕES USER
  //Fazer login
  useEffect(() => {
    const options = {method: 'GET'};
    console.log("searchValue__email", email);
    if(email) {
      fetch(`http://localhost:3333/user/${email}`, options)
        .then(response => response.json())
        .then(response => {
          // setSearchUserInfo(response)
          console.log("response___", response);
          setlogedUserInfo(response)
          setSearchUserInfo(response)
          setIsAdmin(response.isAdmin)
          setSearchUser(null)
        })
        .catch(err => console.error("response__err", err));
    }
  }, [email])

  //Buscar usuário
  useEffect(() => {
    const options = {method: 'GET'};
    console.log("searchValue__email", email);
    if(searchUser) {
      fetch(`http://localhost:3333/user/${searchUser}`, options)
        .then(response => response.json())
        .then(response => {
          // setSearchUserInfo(response)
          console.log("response___", response);
          setSearchUserInfo(response)
          setIsAdmin(response.isAdmin)
          setSearchUser(null)
        })
        .catch(err => console.error("response__err", err));
    }
  }, [searchUser])

  //Criar novo usuário
  useEffect(() => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8'},
      body: JSON.stringify(searchUserInfo)
    };
    console.log("options_", options);
    if(createUser && searchUserInfo.email) {
      fetch('http://localhost:3333/user', options)
        .then(response => response.json())
        .then(response => {
          console.log(response)
            setEmail(searchUserInfo?.email)
            setSearchUserInfo({
              "id": null,
              "name": "",
              "email": null,
              "password": "",
              "isAdmin": true,
              "created_at": ""
            })
            setCreateUser(null)
        })
        .catch(err => console.error(err));
    }
  }, [createUser])

  //Atualizar usuário
  useEffect(() => {
    const options = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8'},
      body: JSON.stringify(searchUserInfo)
    };
    console.log("annn_", searchUserInfo);
    if(updateUser && searchUserInfo.id) {
      fetch(`http://localhost:3333/user/id/${searchUserInfo.id}`, options)
        .then(response => response.json())
        .then(response => {
          console.log("response__put", response)
          // setSearchUserInfo({
          //   "id": null,
          //   "name": "",
          //   "email": null,
          //   "password": "",
          //   "isAdmin": true,
          //   "created_at": ""
          // })
          setUpdateUser(null)
        })
        .catch(err => console.error("response__err", err));
    }
  }, [updateUser])

  //Excluir usuário
  useEffect(() => {
    const options = {method: 'DELETE'};
    console.log('Delete', searchUserInfo);
    if(searchUserInfo?.id) {
      fetch(`http://localhost:3333/user/id/${searchUserInfo.id}`, options)
        .then(response => response.json())
        .then(response => {
          setSearchProductInfo(response)
          setSearchProduct(null)
        })
        .catch(err => console.error("response__err", err));
    }
  }, [deleteUser])


  //REQUISIÇÕES PRODUTO
  //Buscar produto
  useEffect(() => {
    const options = {method: 'GET'};
    console.log('??', searchProductInfo);
    if(searchProduct && searchProductInfo.cod_barras) {
      fetch(`http://localhost:3333/product/${searchProductInfo.cod_barras}`, options)
        .then(response => response.json())
        .then(response => {
          console.log("response___", response);
          setSearchProductInfo(response)
          setPage("productUpdate");
          setSearchProduct(null)
        })
        .catch(err => console.error("response__err", err));
    }
  }, [searchProduct])

  //Adicionar novo produto
  useEffect(() => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8'},
      body: JSON.stringify(searchProductInfo)
    };
    console.log("options_", options);
    if(createProduct && searchProductInfo.cod_barras) {
      fetch('http://localhost:3333/product', options)
        .then(response => response.json())
        .then(response => {
          console.log(response)
            setSearchProductInfo({
              "id":null,
              "name": "",
              "ingredient": "",
              "quantity": 1,
              "energetic": 1,
              "protein": "",
              "carb": "",
              "fat": "",
              "sodium": "",
              "cod_barras": 0,
            })
            setCreateProduct(null)
        })
        .catch(err => console.error(err));
    }
  }, [createProduct])

  //Atualizar produto
  useEffect(() => {
    const options = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8'},
      body: JSON.stringify(searchProductInfo) 
    };
    console.log("updateProduct", updateProduct);
    if(updateProduct) {
      fetch(`http://localhost:3333/product/id/${updateProduct}`, options)
        .then(response => response.json())
        .then(response => {
          setUpdateProduct(null)
        })
        .catch(err => console.error("response", err));
    }
  }, [updateProduct])

  //Excluir produto
  useEffect(() => {
    const options = {method: 'DELETE'};
    console.log('Delete', searchProductInfo);
    if(searchProductInfo?.id) {
      fetch(`http://localhost:3333/product/id/${searchProductInfo.id}`, options)
        .then(response => response.json())
        .then(response => {
          setSearchProductInfo(response)
          setSearchProduct(null)
        })
        .catch(err => console.error("response__err", err));
    }
  }, [deleteProduct])

  //Retorno dos estados declarados
  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        isAdmin,
        email, 
        setEmail,

        setUpdateUser,
        setCreateUser,
        setSearchUser,
        setDeleteUser,

        setUpdateProduct,
        setCreateProduct,
        setSearchProduct,
        setDeleteProduct,

        searchProductInfo,
        setSearchProductInfo,

        searchUserInfo, 
        setSearchUserInfo,

        logedUserInfo, 
        setlogedUserInfo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
