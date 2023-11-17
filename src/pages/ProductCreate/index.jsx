import React, { useContext, useState } from "react";
import { AppContext } from "../../context";
import "../../styles/css/pages/ProductCreate/index.css";

function ProductCreate() {
  const [hasClicked, setHasCliked] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    ingredient: "",
    quantity: "",
    energetic: "",
    protein: "",
    carb: "",
    fat: "",
    sodium: "",
    cod_barras: "",
  });

  const {
    setPage,
    searchProductInfo,
    setSearchProductInfo,
    setSearchProduct,
    setCreateProduct,
  } = useContext(AppContext);

  console.log("searchProductInfo", searchProductInfo);

  const handleSearch = (e) => {
    e.preventDefault();

    const searchValue = e.target.searchValue.value;
    const newSearchProductInfo = searchProductInfo;
    newSearchProductInfo.cod_barras = searchValue;

    setSearchProductInfo(newSearchProductInfo);
    setSearchProduct(newSearchProductInfo);
  };

  const handleCreate = (e) => {
    e.preventDefault();

    console.log("e_target_product", e.target);

    setSearchProductInfo({
      name: e.target.nome.value,
      ingredient: e.target.ingredient.value,
      quantity: Number(e.target.quantity.value),
      energetic: Number(e.target.energetic.value),
      protein: e.target.protein.value,
      carb: e.target.carb.value,
      fat: e.target.fat.value,
      sodium: e.target.sodium.value,
      cod_barras: Number(e.target.cod_barras.value),
    });

    setCreateProduct(Math.random());
    alert("Novo produto cadastrado!");
    setInputValue({
      name: "",
      ingredient: "",
      quantity: "",
      energetic: "",
      protein: "",
      carb: "",
      fat: "",
      sodium: "",
      cod_barras: "",
    });
  };

  return (
    <section className="create_product header">
      <h1>Cadastrar Produto</h1>
      <div className="img_block">
        <img src="/photo.png" alt="" className="img_logo" />
      </div>
      <form onSubmit={(e) => handleCreate(e)} action="" method="post">
        <div className="form">
          <label htmlFor="" className="form_label">
            *Código de Barras
            <input
              required
              type="number"
              name=""
              id="cod_barras"
              value={inputValue?.cod_barras}
              onChange={(e) =>
                setInputValue({ ...inputValue, cod_barras: e.target.value })
              }
              className="input_form"
            />
          </label>
          <label htmlFor="" className="form_label">
            *Nome
            <input
              required
              type="text"
              name=""
              id="nome"
              value={inputValue?.name}
              onChange={(e) =>
                setInputValue({ ...inputValue, name: e.target.value })
              }
              className="input_form"
            />
          </label>
          <label htmlFor="" className="form_label">
            *Ingredientes
            <textarea
              required
              id="ingredient"
              value={inputValue?.ingredient}
              onChange={(e) =>
                setInputValue({ ...inputValue, ingredient: e.target.value })
              }
              name=""
            />
          </label>
          <label htmlFor="" className="form_label">
            *Quantidade
            <input
              required
              type="number"
              name=""
              id="quantity"
              value={inputValue?.quantity}
              onChange={(e) =>
                setInputValue({ ...inputValue, quantity: e.target.value })
              }
              className="input_form"
            />
          </label>
          <label htmlFor="" className="form_label">
            *Valor energético
            <input
              required
              type="number"
              name=""
              id="energetic"
              value={inputValue?.energetic}
              onChange={(e) =>
                setInputValue({ ...inputValue, energetic: e.target.value })
              }
              className="input_form"
            />
          </label>
          <label htmlFor="" className="form_label">
            *Proteína
            <input
              required
              type="text"
              name=""
              id="protein"
              value={inputValue?.protein}
              onChange={(e) =>
                setInputValue({ ...inputValue, protein: e.target.value })
              }
              className="input_form"
            />
          </label>
          <label htmlFor="" className="form_label">
            *Carboidrato
            <input
              required
              type="text"
              name=""
              id="carb"
              value={inputValue?.carb}
              onChange={(e) =>
                setInputValue({ ...inputValue, carb: e.target.value })
              }
              className="input_form"
            />
          </label>
          <label htmlFor="" className="form_label">
            *Gorduras totais
            <input
              required
              type="text"
              name=""
              id="fat"
              value={inputValue?.fat}
              onChange={(e) =>
                setInputValue({ ...inputValue, fat: e.target.value })
              }
              className="input_form"
            />
          </label>
          <label htmlFor="" className="form_label">
            *Sódio
            <input
              required
              type="text"
              name=""
              id="sodium"
              value={inputValue?.sodium}
              onChange={(e) =>
                setInputValue({ ...inputValue, sodium: e.target.value })
              }
              className="input_form"
            />
          </label>
        </div>

        <div className="button_container">
          <button className="button_default add_button">Adicionar</button>
        </div>
      </form>
      <div className="button_container">
        {!hasClicked ? (
          <button
            className="button_default cancel_button"
            onClick={() => setHasCliked(true)}
          >
            Buscar Produtos
          </button>
        ) : (
          <form
            className="container_search"
            action=""
            method="post"
            onSubmit={(e) => handleSearch(e)}
          >
            <input
              id="searchValue"
              placeholder="789100829922"
              className="input_form"
              type="cod_barras"
            />
            <button>
              <img className="search__image" src="/icons/search.png" alt="" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default ProductCreate;
