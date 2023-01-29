import { type NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import { useState, FormEvent } from "react";
// import { Filter } from "@trpc/server";

const Home: NextPage = () => {

  //Passo 1
  const response = trpc.product.getAll.useQuery();
  const { mutate } = trpc.product.create.useMutation({
    onSuccess: (response) => alert(JSON.stringify(response)),
  });
  const { mutate: deleteProd } = trpc.product.deleteOne.useMutation({
    onSuccess: (response) => alert(JSON.stringify(response))
  });


  //Passo 2
  const [prodName, setProductName] = useState("");
  const [prodBrand, setProductBrand] = useState("");
  const [prodDesc, setProductDesc] = useState("");
  const [prodPrice, setProductPrice] = useState("");

  //Passo 3
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutate({ prodName, prodBrand, prodDesc, prodPrice: Number(prodPrice) });
  };

  //sistema de filtragem
  const [busca, setBusca] = useState("");
  console.log(busca);

  const filtrado = response.data?.filter((response) => {
    return JSON.stringify(response.name)
  });

  return (
    <>
      <Head>
        <title>Page List</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={handleSubmit}>
        <div className="text-2xl text-center text-white border-2 border-gray-400 rounded-lg bg-gray-500 ml-40 mr-40 mt-10 mb-4">
          <h1 className="m-6">Lista de compras</h1>
        </div>
        <div className="flex mr-40">
          <input type="text" value={prodName} onChange={(event) => setProductName(event.target.value)} placeholder="Nome: " className="text-lg text-gray-400 border-2 border-gray-400 rounded-lg hover:bg-gray-200 ml-40 w-80" />
          <input type="text" value={prodBrand} onChange={(event) => setProductBrand(event.target.value)} placeholder="Marca: " className="text-lg text-gray-400 border-2 border-gray-400 rounded-lg hover:bg-gray-200 ml-8 w-80" />
          <input type="text" value={prodDesc} onChange={(event) => setProductDesc(event.target.value)} placeholder="Descrição: " className="text-lg text-gray-400 border-2 border-gray-400 rounded-lg hover:bg-gray-200 ml-8 w-80" />
          <input type="text" value={prodPrice} onChange={(event) => setProductPrice(event.target.value)} placeholder="Preço: " className="text-lg text-gray-400 border-2 border-gray-400 rounded-lg hover:bg-gray-200 ml-8 w-80" />

          <button type="submit" className="text-center border-2 border-gray-400 rounded-2xl bg-blue-500 hover:bg-blue-200 w-fit ml-10">
            <h1 className="m-6">Adicionar</h1>
          </button>
          <button type="button" onClick={() => deleteProd({ prodId: "cld8u2cb300068jvt0i7we69z" })} className="text-center border-2 border-gray-400 rounded-2xl bg-red-500 hover:bg-red-200 w-fit ml-2">
            <h1 className="m-6">Deletar</h1>
          </button>
        </div>
        <br />
        <div className="itens border border-black rounded-xl mr-40 ml-40 bg-gray-500">
          <div className="m-10 text-4xl text-gray-600">
            <h1 className="text-white mb-10">Itens da lista</h1>
            <div className="flex">
            <input type="text" className="rounded mr-2 text-lg" value={busca} onChange={(event) => setBusca(event.target.value)}/>
            <button type="button" className="text-center text-lg border-gray-400 rounded bg-blue-500 hover:bg-blue-400 h-10 border">Pesquisar</button>
            </div>
          </div>
          <div className="card-item border w-5/6 rounded-lg m-10 bg-white">
            <div className="m-2">
              <h2 className="text-2xl text-bold">{prodName}</h2>
              <h3>Marca: {prodBrand}</h3>
              <h3>Descrição: {prodDesc}</h3>
              <h3>Preço: {prodPrice}</h3>
            </div>
          </div>
          <div className="border w-5/6 rounded-lg m-10 bg-gray-400">
            <div className="m-8">
            {filtrado?.map((response) => (
             <li className="m-2">{response.name}<button type="button" className="bg-gray-300 border border-black rounded-md">selecionar</button></li> 
            ))}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Home;