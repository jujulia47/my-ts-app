import React, { useContext } from "react";
import { AppContext } from "../../context";
import Header from '../../components/Header'
import Footer from '../../components/Footer'

import "../../styles/css/pages/VisuRead/index.css";

function VisuRead() {
  const { setPage } = useContext(AppContext);

  return (
    <>
      <section className="visu_read">
        <div className="img_block">
          <img src="/read.png" alt="" className="img_read" />
        </div>
        <p className="text_visuRead">Escaneie produtos para ouvir as informações</p>
        <button className="button_read">Faça sua primeira leitura</button>
      </section>
    </>
  );
}

export default VisuRead;
