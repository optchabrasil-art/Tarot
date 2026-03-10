export interface TarotCardData {
  id: string;
  name: string;
  arcana: 'Major' | 'Minor';
  meaningUpright: string;
  meaningReversed: string;
  image: string;
}

export const TAROT_CARDS: TarotCardData[] = [
  {
    id: '0',
    name: 'O Louco',
    arcana: 'Major',
    meaningUpright: 'Novos começos, otimismo, confiança no universo.',
    meaningReversed: 'Imprudência, risco desnecessário, ingenuidade.',
    image: 'https://picsum.photos/seed/tarot-fool/300/500'
  },
  {
    id: '1',
    name: 'O Mago',
    arcana: 'Major',
    meaningUpright: 'Manifestação, poder pessoal, habilidade, ação.',
    meaningReversed: 'Manipulação, talentos não utilizados, má intenção.',
    image: 'https://picsum.photos/seed/tarot-magician/300/500'
  },
  {
    id: '2',
    name: 'A Sacerdotisa',
    arcana: 'Major',
    meaningUpright: 'Intuição, mistério, subconsciente, sabedoria interior.',
    meaningReversed: 'Segredos revelados, falta de intuição, superficialidade.',
    image: 'https://picsum.photos/seed/tarot-priestess/300/500'
  },
  {
    id: '3',
    name: 'A Imperatriz',
    arcana: 'Major',
    meaningUpright: 'Feminilidade, beleza, natureza, abundância, fertilidade.',
    meaningReversed: 'Bloqueio criativo, dependência, falta de crescimento.',
    image: 'https://picsum.photos/seed/tarot-empress/300/500'
  },
  {
    id: '4',
    name: 'O Imperador',
    arcana: 'Major',
    meaningUpright: 'Autoridade, estrutura, controle, paternidade.',
    meaningReversed: 'Tirania, rigidez, falta de disciplina.',
    image: 'https://picsum.photos/seed/tarot-emperor/300/500'
  },
  {
    id: '5',
    name: 'O Hierofante',
    arcana: 'Major',
    meaningUpright: 'Tradição, conformidade, crenças religiosas, educação.',
    meaningReversed: 'Rebelião, novos métodos, quebra de tradição.',
    image: 'https://picsum.photos/seed/tarot-hierophant/300/500'
  },
  {
    id: '6',
    name: 'Os Amantes',
    arcana: 'Major',
    meaningUpright: 'Amor, harmonia, relacionamentos, escolhas de valores.',
    meaningReversed: 'Desarmonia, desequilíbrio, escolhas erradas.',
    image: 'https://picsum.photos/seed/tarot-lovers/300/500'
  },
  {
    id: '7',
    name: 'O Carro',
    arcana: 'Major',
    meaningUpright: 'Controle, vontade, vitória, determinação.',
    meaningReversed: 'Falta de controle, agressividade, falta de direção.',
    image: 'https://picsum.photos/seed/tarot-chariot/300/500'
  },
  {
    id: '8',
    name: 'A Força',
    arcana: 'Major',
    meaningUpright: 'Coragem, persuasão, influência, compaixão.',
    meaningReversed: 'Fraqueza, insegurança, falta de autocontrole.',
    image: 'https://picsum.photos/seed/tarot-strength/300/500'
  },
  {
    id: '9',
    name: 'O Eremita',
    arcana: 'Major',
    meaningUpright: 'Introspecção, busca da verdade, solidão, orientação.',
    meaningReversed: 'Isolamento, solidão excessiva, retirada do mundo.',
    image: 'https://picsum.photos/seed/tarot-hermit/300/500'
  },
  {
    id: '10',
    name: 'A Roda da Fortuna',
    arcana: 'Major',
    meaningUpright: 'Sorte, carma, ciclos de vida, destino.',
    meaningReversed: 'Má sorte, resistência à mudança, ciclos negativos.',
    image: 'https://picsum.photos/seed/tarot-wheel/300/500'
  },
  {
    id: '11',
    name: 'A Justiça',
    arcana: 'Major',
    meaningUpright: 'Justiça, verdade, causa e efeito, lei.',
    meaningReversed: 'Injustiça, falta de responsabilidade, desonestidade.',
    image: 'https://picsum.photos/seed/tarot-justice/300/500'
  },
  {
    id: '12',
    name: 'O Pendurado',
    arcana: 'Major',
    meaningUpright: 'Pausa, rendição, nova perspectiva, sacrifício.',
    meaningReversed: 'Atraso, resistência, hesitação.',
    image: 'https://picsum.photos/seed/tarot-hanged/300/500'
  },
  {
    id: '13',
    name: 'A Morte',
    arcana: 'Major',
    meaningUpright: 'Fim, transição, mudança, regeneração.',
    meaningReversed: 'Resistência à mudança, medo de novos começos.',
    image: 'https://picsum.photos/seed/tarot-death/300/500'
  },
  {
    id: '14',
    name: 'A Temperança',
    arcana: 'Major',
    meaningUpright: 'Equilíbrio, moderação, paciência, propósito.',
    meaningReversed: 'Desequilíbrio, excesso, falta de visão a longo prazo.',
    image: 'https://picsum.photos/seed/tarot-temperance/300/500'
  },
  {
    id: '15',
    name: 'O Diabo',
    arcana: 'Major',
    meaningUpright: 'Sombra, vício, restrição, desapego.',
    meaningReversed: 'Libertação, quebra de correntes, autoconhecimento.',
    image: 'https://picsum.photos/seed/tarot-devil/300/500'
  },
  {
    id: '16',
    name: 'A Torre',
    arcana: 'Major',
    meaningUpright: 'Mudança repentina, revelação, caos, despertar.',
    meaningReversed: 'Evitar o desastre, medo da mudança, atraso no inevitável.',
    image: 'https://picsum.photos/seed/tarot-tower/300/500'
  },
  {
    id: '17',
    name: 'A Estrela',
    arcana: 'Major',
    meaningUpright: 'Esperança, fé, renovação, espiritualidade.',
    meaningReversed: 'Falta de fé, desespero, desconexão.',
    image: 'https://picsum.photos/seed/tarot-star/300/500'
  },
  {
    id: '18',
    name: 'A Lua',
    arcana: 'Major',
    meaningUpright: 'Ilusão, medo, ansiedade, subconsciente.',
    meaningReversed: 'Clareza, superação do medo, revelação de mentiras.',
    image: 'https://picsum.photos/seed/tarot-moon/300/500'
  },
  {
    id: '19',
    name: 'O Sol',
    arcana: 'Major',
    meaningUpright: 'Positividade, diversão, calor, sucesso, vitalidade.',
    meaningReversed: 'Falta de entusiasmo, pessimismo, tristeza temporária.',
    image: 'https://picsum.photos/seed/tarot-sun/300/500'
  },
  {
    id: '20',
    name: 'O Julgamento',
    arcana: 'Major',
    meaningUpright: 'Julgamento, renascimento, chamado interior, perdão.',
    meaningReversed: 'Dúvida, falta de autoconhecimento, recusa do chamado.',
    image: 'https://picsum.photos/seed/tarot-judgement/300/500'
  },
  {
    id: '21',
    name: 'O Mundo',
    arcana: 'Major',
    meaningUpright: 'Conclusão, integração, realização, viagem.',
    meaningReversed: 'Incompletude, falta de encerramento, atraso.',
    image: 'https://picsum.photos/seed/tarot-world/300/500'
  }
];
