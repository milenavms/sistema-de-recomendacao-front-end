import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';
import { RecommendationTypes } from '../constants/recommendationTypes';
import { render, screen } from '@testing-library/react';
import RecommendationList from '../components/RecommendationList/RecommendationList';
import { RecommendationType } from '../components/Form/Fields';
import Form from '../components/Form/Form';
import userEvent from '@testing-library/user-event';

//Mock do hook useProducts para fornecer dados de produtos, preferências e features vazios
jest.mock('../hooks/useProducts', () => ({
  __esModule: true,
  default: () => ({
    preferences: [],
    features: [],
    products: [],
  }),
}));

//Mock do hook useForm para fornecer estado inicial do formulário e função handleChange vazia
jest.mock('../hooks/useForm', () => ({
  __esModule: true,
  default: (initial) => ({
    formData: initial,
    handleChange: jest.fn(),
  }),
}));

//Mock do hook useRecommendations para fornecer a função getRecommendations
jest.mock('../hooks/useRecommendations', () => ({
  __esModule: true,
  default: () => ({
    recommendations: [],
    getRecommendations: jest.fn(),
  }),
}));

describe('recommendationService', () => {
  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: [RecommendationTypes.SINGLE],
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: RecommendationTypes.MULTIPLE,
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: RecommendationTypes.SINGLE,
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Retorna o último match em caso de empate para SingleProduct', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing', 'Integração com chatbots'],
      selectedRecommendationType: RecommendationTypes.SINGLE,
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna todas as recomendações corretas quando selectedRecommendationType não é informado', () => {
  const formData = {
    selectedPreferences: ['Integração com chatbots', 'Automação de marketing'],
    selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
    // selectedRecommendationType não está definido
  };

  const recommendations = recommendationService.getRecommendations(
    formData,
    mockProducts
  );

  expect(recommendations.length).toBeGreaterThan(1);
  expect(recommendations.map(p => p.name)).toEqual([
    'RD Station Marketing',
    'RD Conversas'
  ]);
  });

  test('Retorna [] quando nenhuma preferência ou feature é selecionada', () => {
  const formDataSingle = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: RecommendationTypes.SINGLE,
  };

  const formDataMultiple = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: RecommendationTypes.MULTIPLE,
  };

  // SingleProduct
  const singleResult = recommendationService.getRecommendations(formDataSingle, mockProducts);
  expect(singleResult).toEqual([]);

  // MultipleProducts
  const multipleResult = recommendationService.getRecommendations(formDataMultiple, mockProducts);
  expect(multipleResult).toEqual([]);
  });

  test('Deve exibir a mensagem "Nenhuma recomendação encontrada." quando não há recomendações', () => {
    render(<RecommendationList recommendations={[]} />);

    expect(screen.getByText(/Nenhuma recomendação encontrada\./i)).toBeInTheDocument();
  });

  test('Checkbox MultipleProducts deve está marcado por padrão', () => {
  render(<RecommendationType onRecommendationTypeChange={() => {}} />);

  const multipleRadio = screen.getByDisplayValue(RecommendationTypes.MULTIPLE);

  expect(multipleRadio).toBeChecked();
  });

  test('Deve desabilitar o SubmitButton se selectedPreferences e selectedFeatures estiverem vazios', () => {
    render(<Form setParentRecommendations={() => {}} />);

    const submitButton = screen.getByRole('button', { name: /obter recomendação/i });
    expect(submitButton).toBeDisabled();
  });

});
