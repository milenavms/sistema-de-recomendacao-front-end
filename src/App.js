import React, { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';
import NavBar from './components/NavBar/NavBar';

function App() {
  const [recommendations, setRecommendations ] = useState([])

  /**
   * Dadas atualizações no formulário, necessário atualizar a lista de recomendações
   */

  return (
    <div className="bg-gray-100 min-h-screen">

      <NavBar/>

      <main className="flex flex-col justify-center items-center pt-8">
         <section className="bg-white p-8 rounded-lg shadow-md w-full md:w-4/5">

          <header className="mb-4">
            <h1 className="text-lg font-bold flex justify-center items-center ">
              Bem-vindo ao Recomendador de Produtos <strong className='m-1'> RD Station</strong>
            </h1>
            <h2 className="text-lg mt-4 text-justify">
              Aqui você pode encontrar uma variedade de produtos da RD Station, cada um projetado para atender às necessidades específicas do seu negócio. De CRM a Marketing, de Conversas a Inteligência Artificial, temos uma solução para ajudar você a alcançar seus objetivos. Use o formulário abaixo para selecionar suas preferências e funcionalidades desejadas e receba recomendações personalizadas de produtos que melhor atendam às suas necessidades.
            </h2>
          </header>

          <div className="bg-white grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="p-2 rounded">
              <Form setParentRecommendations={setRecommendations}/>
            </section>

            <section className="p-2 rounded">
              <RecommendationList recommendations={recommendations} />
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
