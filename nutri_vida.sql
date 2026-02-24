-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19/11/2025 às 14:31
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `nutri_vida`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `agendamentos`
--

CREATE TABLE `agendamentos` (
  `id` int(11) NOT NULL,
  `consultorio_id` int(11) DEFAULT NULL,
  `servico_id` int(11) DEFAULT NULL,
  `data` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `preco` decimal(10,2) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `agendamentos`
--

INSERT INTO `agendamentos` (`id`, `consultorio_id`, `servico_id`, `data`, `hora`, `preco`, `criado_em`, `usuario_id`) VALUES
(1, 1, 1, '2025-06-26', '13:45:00', 150.00, '2025-06-26 05:09:15', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `cardapio`
--

CREATE TABLE `cardapio` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `respostas_id` int(11) DEFAULT NULL,
  `hash_respostas` varchar(64) NOT NULL,
  `cardapio_texto` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`cardapio_texto`)),
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cardapio`
--

INSERT INTO `cardapio` (`id`, `usuario_id`, `respostas_id`, `hash_respostas`, `cardapio_texto`, `criado_em`) VALUES
(4, 1, NULL, 'aana1111bbbb2222cccc3333dddd4444', '{\"refeicoes\":[{\"horario\":\"08:00\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"1 fatia de pao integral\",\"1 ovo cozido\",\"1 banana\",\"200ml de leite desnatado\"]},{\"horario\":\"10:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"1 iogurte desnatado\",\"1 maça\"]},{\"horario\":\"12:00\",\"nome\":\"Almoco\",\"alimentos\":[\"100g de carne grelhada (frango ou peixe)\",\"1 concha de arroz integral\",\"Salada de folhas verdes com tomate e cenoura\",\"1 colher de sopa de azeite de oliva\"]},{\"horario\":\"15:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 iogurte grego\",\"1 punhado de castanhas\"]},{\"horario\":\"19:00\",\"nome\":\"Jantar\",\"alimentos\":[\"150g de carne magra grelhada ou peixe\",\"1 xícara de brócolis cozido\",\"1 batata doce cozida\"]},{\"horario\":\"21:00\",\"nome\":\"Lanche da Noite\",\"alimentos\":[\"1 xícara de chá de camomila\"]}],\"suplementos\":[\"Proteína do soro do leite\",\"Ômega 3\"]}', '2025-11-18 21:49:08'),
(5, 5, NULL, 'cda8ae53371c117d06abbe625fae785dde3d85b88767d0c8e09a2aee3fc1b5d3', '{\"name\":\"bhghjb\",\"gender\":\"feminino\",\"age\":19,\"height\":1.6,\"weight\":79,\"objective\":\"Perder peso\",\"imc\":22.2,\"alergia\":\"Nenhuma\",\"trabalho\":\"professora\",\"esporte\":\"Nenhum\",\"rotina\":\"acordo as 9\",\"dietaAtual\":\"sem seguir nenhuma dieta especifica\",\"tempoPreparo\":\"pouco\",\"alimentosFavoritos\":[\"cerveja\"],\"refeicoes\":[{\"nome\":\"Segunda\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da manha\",\"alimentos\":[\"2 ovos mexidos\",\"1 fatia (50g) de pao integral\",\"1/2 unidade de abacate (80g)\",\"tempero: pimenta do reino e cheiro verde\"],\"calorias\":350},{\"horario\":\"12:00\",\"nome\":\"Lanche da manha\",\"alimentos\":[\"1 pote (170g) de iogurte natural desnatado\",\"1 unidade de banana pequena\",\"tempero: canela em po\"],\"calorias\":180},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"100g de frango grelhado em cubos\",\"80g de batata doce cozida\",\"1 prato (150g) de salada de alface, tomate e cenoura ralada\",\"1 colher de sopa (10ml) de azeite extra virgem\",\"tempero: alho, cebola, oregano e pimenta do reino\"],\"calorias\":450},{\"horario\":\"17:30\",\"nome\":\"Lanche da tarde\",\"alimentos\":[\"1 lata (350ml) de cerveja\",\"30g de castanhas de caju\",\"tempero: N/A\"],\"calorias\":330},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"150ml de sopa de abobora com gengibre\",\"80g de file de peixe cozido (tilapia)\",\"1 prato (100g) de couve flor e brocolis no vapor\",\"tempero: gengibre ralado, salsinha e um fio de azeite\"],\"calorias\":320},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de camomila sem acucar\",\"30g de queijo minas frescal light\",\"tempero: N/A\"],\"calorias\":80}]},{\"nome\":\"Terca\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da manha\",\"alimentos\":[\"1 pote (170g) de iogurte grego natural light\",\"50g de granola sem acucar\",\"1/2 xicara (80g) de frutas vermelhas (morango, mirtilo)\",\"tempero: sementes de chia\"],\"calorias\":300},{\"horario\":\"12:00\",\"nome\":\"Lanche da manha\",\"alimentos\":[\"1 maca pequena\",\"10 unidades de amendoim (substituido por 20g de sementes de girassol)\",\"tempero: N/A\"],\"calorias\":160},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de carne moida magra refogada\",\"80g de arroz integral cozido\",\"1 prato (150g) de salada de rucula, beterraba ralada e pepino\",\"1 colher de sopa (10ml) de azeite extra virgem\",\"tempero: cominho, pimenta do reino e salsa\"],\"calorias\":480},{\"horario\":\"17:30\",\"nome\":\"Lanche da tarde\",\"alimentos\":[\"1 fatia (50g) de pao integral\",\"2 fatias (40g) de peito de peru light\",\"tempero: oregano\"],\"calorias\":170},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"120g de omelete com queijo cottage\",\"1 prato (150g) de aspargos e brocolis cozidos no vapor\",\"tempero: cebolinha, alho e pimenta branca\"],\"calorias\":380},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de leite desnatado morno\",\"tempero: noz moscada ralada\"],\"calorias\":80}]},{\"nome\":\"Quarta\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da manha\",\"alimentos\":[\"1 tapioca (50g de massa) com 2 fatias (60g) de queijo minas frescal light\",\"1 copo (200ml) de suco verde (couve, maca e gengibre)\",\"tempero: gengibre ralado no suco\"],\"calorias\":320},{\"horario\":\"12:00\",\"nome\":\"Lanche da manha\",\"alimentos\":[\"1 pera\",\"20g de amendoas\",\"tempero: N/A\"],\"calorias\":190},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de salmao assado\",\"80g de quinoa cozida\",\"1 prato (150g) de salada de agriao, milho e tomate cereja\",\"1 colher de sopa (10ml) de azeite extra virgem\",\"tempero: limao, dill e pimenta rosa\"],\"calorias\":520},{\"horario\":\"17:30\",\"nome\":\"Lanche da tarde\",\"alimentos\":[\"1 copo (200ml) de vitamina de leite desnatado com 1/2 banana\",\"tempero: canela em po\"],\"calorias\":150},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"1 lata (350ml) de cerveja\",\"1 prato (200g) de wrap de alface com atum light (em agua) e cenoura ralada\",\"tempero: azeite, limao e cebolinha\"],\"calorias\":300},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de erva doce\",\"tempero: N/A\"],\"calorias\":0}]},{\"nome\":\"Quinta\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da manha\",\"alimentos\":[\"1 xicara (200ml) de cafe com leite desnatado sem acucar\",\"2 torradas integrais\",\"2 colheres de sopa (40g) de pasta de amendoim integral\",\"tempero: N/A\"],\"calorias\":380},{\"horario\":\"12:00\",\"nome\":\"Lanche da manha\",\"alimentos\":[\"1 tangerina\",\"30g de nozes\",\"tempero: N/A\"],\"calorias\":220},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de peito de frango desfiado com molho de tomate caseiro\",\"100g de pure de couve flor\",\"1 prato (150g) de salada de repolho roxo, tomate e pimentao\",\"1 colher de sopa (10ml) de azeite extra virgem\",\"tempero: curcuma, louro e cheiro verde\"],\"calorias\":420},{\"horario\":\"17:30\",\"nome\":\"Lanche da tarde\",\"alimentos\":[\"1 unidade de fruta (abacaxi em rodelas)\",\"tempero: folhas de hortela\"],\"calorias\":80},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"120g de ovos mexidos com espinafre\",\"1 prato (150g) de tabule de quinoa (com pepino, tomate e hortela)\",\"tempero: limao, hortela e pimenta do reino\"],\"calorias\":390},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de melissa\",\"tempero: N/A\"],\"calorias\":0}]},{\"nome\":\"Sexta\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da manha\",\"alimentos\":[\"2 panquecas de aveia (com 2 colheres de sopa de aveia)\",\"2 colheres de sopa (40g) de queijo cottage\",\"1/2 unidade de papaia pequena\",\"tempero: canela em po\"],\"calorias\":340},{\"horario\":\"12:00\",\"nome\":\"Lanche da manha\",\"alimentos\":[\"1 copo (200ml) de agua de coco\",\"1 barra de cereais caseira (sem acucar adicionado)\",\"tempero: N/A\"],\"calorias\":180},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de coxa/sobrecoxa de frango assada sem pele\",\"80g de lentilha cozida\",\"1 prato (150g) de salada de folhas mistas (alface roxa, americana), tomate e rabanete\",\"1 colher de sopa (10ml) de azeite extra virgem\",\"tempero: colorau, alho e pimenta calabresa\"],\"calorias\":490},{\"horario\":\"17:30\",\"nome\":\"Lanche da tarde\",\"alimentos\":[\"1 unidade de iogurte natural desnatado\",\"tempero: N/A\"],\"calorias\":100},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"150ml de sopa de legumes variados (cenoura, abobrinha, chuchu)\",\"80g de tofu grelhado em cubos\",\"tempero: gengibre, salsa e cominho\"],\"calorias\":280},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 lata (350ml) de cerveja\",\"tempero: N/A\"],\"calorias\":150}]},{\"nome\":\"Sabado\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da manha\",\"alimentos\":[\"1 xicara (200ml) de cafe preto sem acucar\",\"2 unidades de waffle integral com 2 colheres de sopa (30g) de geleia de frutas sem acucar\",\"tempero: N/A\"],\"calorias\":280},{\"horario\":\"12:00\",\"nome\":\"Lanche da manha\",\"alimentos\":[\"1 copo (200ml) de suco de laranja natural (sem coar e sem acucar)\",\"tempero: N/A\"],\"calorias\":100},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"150g de salada de grao de bico com pepino, tomate e cebola roxa\",\"100g de atum em agua\",\"1 colher de sopa (10ml) de azeite extra virgem\",\"tempero: limao, azeite, hortela e pimenta do reino\"],\"calorias\":480},{\"horario\":\"17:30\",\"nome\":\"Lanche da tarde\",\"alimentos\":[\"1 unidade de fruta (kiwi)\",\"20g de sementes de abobora\",\"tempero: N/A\"],\"calorias\":180},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"120g de espetinho de camarao e vegetais (pimentao, cebola)\",\"80g de batata baroa cozida\",\"tempero: alho, limao e coentro\"],\"calorias\":420},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de passiflora\",\"tempero: N/A\"],\"calorias\":0}]},{\"nome\":\"Domingo\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da manha\",\"alimentos\":[\"1 vitamina de 1 copo (200ml) de leite desnatado com 1/2 banana e 1 colher de sopa de aveia\",\"1 fatia (50g) de bolo integral caseiro (sem acucar)\",\"tempero: canela em po\"],\"calorias\":300},{\"horario\":\"12:00\",\"nome\":\"Lanche da manha\",\"alimentos\":[\"1 fatia (100g) de melao\",\"tempero: N/A\"],\"calorias\":60},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de peito de frango assado com ervas\",\"100g de pure de mandioquinha (batata baroa)\",\"1 prato (150g) de salada de couve refogada e tomate\",\"1 colher de sopa (10ml) de azeite extra virgem\",\"tempero: alecrim, tomilho e alho\"],\"calorias\":480},{\"horario\":\"17:30\",\"nome\":\"Lanche da tarde\",\"alimentos\":[\"1 unidade de tapioca (50g de massa) com 2 colheres de sopa de pasta de amendoim integral\",\"tempero: N/A\"],\"calorias\":280},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"150g de hamburguer caseiro de carne magra (sem pao)\",\"1 prato (150g) de legumes grelhados (abobrinha, berinjela, cebola)\",\"tempero: mostarda dijon (sem acucar), pimenta do reino e salsinha\"],\"calorias\":390},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de hortela\",\"tempero: N/A\"],\"calorias\":0}]}],\"suplementos\":{\"suplementos_antes_treino_esporte\":[],\"suplementos_antes_treino_academia\":[],\"suplementos_gerais\":[\"Multivitaminico: 1 capsula pela manha com uma refeicao\",\"Vitamina D3: 2000 UI por dia, preferencialmente com a refeicao principal\",\"Omega 3: 1000mg por dia, preferencialmente com uma refeicao\"]},\"grafico\":[{\"dia\":\"Segunda\",\"caloriasTotais\":1710},{\"dia\":\"Terca\",\"caloriasTotais\":1570},{\"dia\":\"Quarta\",\"caloriasTotais\":1480},{\"dia\":\"Quinta\",\"caloriasTotais\":1490},{\"dia\":\"Sexta\",\"caloriasTotais\":1540},{\"dia\":\"Sabado\",\"caloriasTotais\":1460},{\"dia\":\"Domingo\",\"caloriasTotais\":1510}]}', '2025-11-18 22:16:02'),
(6, 5, NULL, '079c1a495f5b84a057a613be3a7ce2cc0a07a73364ef810354c4606fe3266ad1', '{\"name\":\"elo\",\"gender\":\"feminino\",\"age\":19,\"height\":1.6,\"weight\":99,\"objective\":\"Perder peso\",\"imc\":22.2,\"alergia\":\"Nenhuma\",\"trabalho\":\"professora\",\"esporte\":\"Nenhum\",\"rotina\":\"acordo as 9 academia as 10\",\"dietaAtual\":\"sem seguir nenhuma dieta especifica\",\"tempoPreparo\":\"pouco\",\"alimentosFavoritos\":[\"refrigerante\"],\"refeicoes\":[{\"nome\":\"Segunda\",\"refeicoes\":[{\"horario\":\"09:15\",\"nome\":\"Pre-treino\",\"alimentos\":[\"1 unidade de banana prata\",\"tempero: canela em po\"],\"calorias\":105},{\"horario\":\"12:00\",\"nome\":\"Cafe da Manha / Pos-treino\",\"alimentos\":[\"2 unidades de ovos mexidos\",\"2 fatias de pao integral (50g)\",\"1 colher de cha (5ml) de azeite de oliva extra virgem\",\"1 copo (200ml) de cafe preto sem acucar\",\"1 xicara (80g) de morangos picados\",\"tempero: pimenta do reino e salsinha\"],\"calorias\":380},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de peito de frango grelhado\",\"100g de arroz integral cozido\",\"60g de feijao carioca cozido\",\"1 prato de sobremesa de salada de alface, tomate e pepino (150g)\",\"1 colher de sopa (10ml) de azeite de oliva extra virgem\",\"1 copo (200ml) de refrigerante\",\"tempero: alho, cebola, limao e ervas finas\"],\"calorias\":600},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 pote (170g) de iogurte natural desnatado\",\"1 colher de sopa (15g) de chia\",\"tempero: sem tempero\"],\"calorias\":180},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"100g de salmao assado\",\"150g de legumes variados cozidos no vapor (brocolis, cenoura, abobrinha)\",\"1 colher de cha (5ml) de azeite de oliva extra virgem\",\"tempero: alecrim, limao e alho\"],\"calorias\":370},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"100g de queijo cottage light\",\"tempero: oregano\"],\"calorias\":100}]},{\"nome\":\"Terca\",\"refeicoes\":[{\"horario\":\"09:15\",\"nome\":\"Pre-treino\",\"alimentos\":[\"1 copo (200ml) de agua de coco\",\"tempero: sem tempero\"],\"calorias\":50},{\"horario\":\"12:00\",\"nome\":\"Cafe da Manha / Pos-treino\",\"alimentos\":[\"150g de crepioca (1 ovo + 2 colheres de sopa de tapioca)\",\"50g de queijo minas frescal light\",\"1 unidade de pera\",\"tempero: pimenta do reino (na crepioca)\"],\"calorias\":350},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de carne moida magra (patinho)\",\"100g de batata doce assada\",\"1 prato de sobremesa de salada colorida (couve, beterraba ralada, tomate cereja) (150g)\",\"1 colher de sopa (10ml) de azeite de oliva extra virgem\",\"tempero: cominho, colorau, salsinha e cebolinha\"],\"calorias\":500},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 punhado (30g) de castanhas de caju\",\"1 unidade de maca\",\"tempero: sem tempero\"],\"calorias\":250},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"100g de omelete de 2 ovos com espinafre e cogumelos\",\"1 prato de sobremesa de salada de rucula e tomate seco (sem oleo) (100g)\",\"1 colher de cha (5ml) de azeite de oliva extra virgem\",\"tempero: alho, oregano e pimenta do reino\"],\"calorias\":320},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 copo (200ml) de leite desnatado com 1 colher de sopa de cacau em po (sem acucar)\",\"tempero: sem tempero\"],\"calorias\":120}]},{\"nome\":\"Quarta\",\"refeicoes\":[{\"horario\":\"09:15\",\"nome\":\"Pre-treino\",\"alimentos\":[\"1 unidade de kiwi\",\"tempero: sem tempero\"],\"calorias\":60},{\"horario\":\"12:00\",\"nome\":\"Cafe da Manha / Pos-treino\",\"alimentos\":[\"1 copo (250ml) de vitamina de abacate com leite desnatado (1/2 abacate pequeno)\",\"1 fatia de pao integral (25g)\",\"tempero: sem tempero\"],\"calorias\":360},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de file de peixe branco (tilapia) grelhado\",\"100g de quinoa cozida\",\"1 prato de sobremesa de salada de lentilha com pepino e cenoura ralada (180g)\",\"1 colher de sopa (10ml) de azeite de oliva extra virgem\",\"tempero: pimenta do reino, limao, gengibre ralado\"],\"calorias\":520},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 unidade de iogurte natural desnatado (170g)\",\"1 copo (200ml) de refrigerante\",\"tempero: sem tempero\"],\"calorias\":250},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"150g de sopa de legumes com frango desfiado (abobora, espinafre, batata)\",\"1 colher de cha (5ml) de azeite de oliva extra virgem\",\"tempero: alho, cebola, cheiro verde\"],\"calorias\":300},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 unidade pequena (100g) de pure de abobora com canela\",\"tempero: canela em po\"],\"calorias\":90}]},{\"nome\":\"Quinta\",\"refeicoes\":[{\"horario\":\"09:15\",\"nome\":\"Pre-treino\",\"alimentos\":[\"1 copo (200ml) de cha verde\",\"tempero: sem tempero\"],\"calorias\":0},{\"horario\":\"12:00\",\"nome\":\"Cafe da Manha / Pos-treino\",\"alimentos\":[\"2 fatias de pao integral (50g) com 2 colheres de sopa de pasta de amendoim integral\",\"1 unidade de maca\",\"tempero: sem tempero\"],\"calorias\":400},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de coxa e sobrecoxa de frango assada (sem pele)\",\"100g de batata doce cozida\",\"1 prato de sobremesa de salada de couve-flor, brocolis e cenoura cozidos no vapor (180g)\",\"1 colher de sopa (10ml) de azeite de oliva extra virgem\",\"tempero: alecrim, paprika e alho\"],\"calorias\":550},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 copo (200ml) de suco verde (couve, maca, gengibre)\",\"1 punhado (30g) de amendoim torrado (sem sal)\",\"tempero: gengibre ralado\"],\"calorias\":220},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"100g de atum em lata (conservado em agua)\",\"150g de salada de grao de bico com pimentao colorido e cebola roxa\",\"1 colher de cha (5ml) de azeite de oliva extra virgem\",\"tempero: limao, salsinha e coentro\"],\"calorias\":380},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 copo (200ml) de iogurte natural desnatado\",\"tempero: sem tempero\"],\"calorias\":100}]},{\"nome\":\"Sexta\",\"refeicoes\":[{\"horario\":\"09:15\",\"nome\":\"Pre-treino\",\"alimentos\":[\"1 unidade de fruta da epoca (ex: ameixa)\",\"tempero: sem tempero\"],\"calorias\":40},{\"horario\":\"12:00\",\"nome\":\"Cafe da Manha / Pos-treino\",\"alimentos\":[\"30g de aveia em flocos com 150ml de leite desnatado\",\"1 colher de sopa (15g) de sementes de girassol\",\"1 unidade de laranja\",\"tempero: canela em po\"],\"calorias\":300},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de bife bovino grelhado (file mignon)\",\"100g de pure de batata (sem manteiga, com leite desnatado)\",\"1 prato de sobremesa de salada de agriao e rabanete (150g)\",\"1 colher de sopa (10ml) de azeite de oliva extra virgem\",\"tempero: alho, pimenta do reino e chimichurri\"],\"calorias\":580},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 unidade de banana\",\"1 colher de sopa (15g) de pasta de amendoim integral\",\"tempero: sem tempero\"],\"calorias\":250},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"100g de frango desfiado com legumes salteados (pimentao, cebola, ervilha) (150g)\",\"1 copo (200ml) de refrigerante\",\"1 colher de cha (5ml) de azeite de oliva extra virgem\",\"tempero: curry, alho e cebolinha\"],\"calorias\":450},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de camomila\",\"tempero: sem tempero\"],\"calorias\":0}]},{\"nome\":\"Sabado\",\"refeicoes\":[{\"horario\":\"09:15\",\"nome\":\"Pre-treino\",\"alimentos\":[\"1 barra de cereais light (30g)\",\"tempero: sem tempero\"],\"calorias\":120},{\"horario\":\"12:00\",\"nome\":\"Cafe da Manha / Pos-treino\",\"alimentos\":[\"2 ovos cozidos\",\"2 fatias de pao integral (50g)\",\"1/2 unidade de abacate pequeno (80g)\",\"tempero: sal, pimenta do reino\"],\"calorias\":420},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de salmao grelhado\",\"100g de pure de couve-flor\",\"1 prato de sobremesa de salada mista (folhas verdes, tomate, cebola roxa) (150g)\",\"1 colher de sopa (10ml) de azeite de oliva extra virgem\",\"tempero: limao, endro e alho\"],\"calorias\":580},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 pote (170g) de iogurte natural desnatado com 10g de linhaça moída\",\"tempero: sem tempero\"],\"calorias\":190},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"150g de espetinho de frango e vegetais (pimentao, cebola, abobrinha)\",\"tempero: acafrao, alho e cheiro verde\"],\"calorias\":330},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 unidade de fruta da epoca (ex: uvas, 100g)\",\"tempero: sem tempero\"],\"calorias\":70}]},{\"nome\":\"Domingo\",\"refeicoes\":[{\"horario\":\"09:15\",\"nome\":\"Pre-treino\",\"alimentos\":[\"1 copo (200ml) de agua com limao\",\"tempero: sem tempero\"],\"calorias\":5},{\"horario\":\"12:00\",\"nome\":\"Cafe da Manha / Pos-treino\",\"alimentos\":[\"1 panqueca pequena (50g) de aveia com 2 ovos e 50g de queijo cottage\",\"1 xicara (80g) de frutas vermelhas\",\"tempero: canela em po\"],\"calorias\":390},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"150g de carne assada magra (lagarto)\",\"100g de batata baroa cozida\",\"1 prato de sobremesa de salada de acelga, tomate e milho (180g)\",\"1 colher de sopa (10ml) de azeite de oliva extra virgem\",\"tempero: mostarda dijon (sem acucar), alho e louro\"],\"calorias\":590},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 punhado (30g) de nozes\",\"1 unidade de iogurte natural desnatado (170g)\",\"tempero: sem tempero\"],\"calorias\":280},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"120g de file de frango recheado com espinafre e ricota\",\"150g de legumes grelhados (berinjela, abobrinha, pimentao)\",\"1 colher de cha (5ml) de azeite de oliva extra virgem\",\"tempero: manjericao, alho e pimenta do reino\"],\"calorias\":400},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 copo (200ml) de leite desnatado morno\",\"tempero: sem tempero\"],\"calorias\":70}]}],\"suplementos\":{\"suplementos_antes_treino_esporte\":[],\"suplementos_antes_treino_academia\":[\"Whey Protein (pos-treino): 1 dose (30g) com agua ou leite desnatado logo apos a academia para auxiliar na recuperacao muscular e promover saciedade.\",\"Cafeina (pre-treino): 1 capsula (100-200mg) 30 minutos antes do treino para aumentar energia e foco, se nao houver sensibilidade ou contraindicacao. Iniciar com dose menor para avaliar tolerancia.\"],\"suplementos_gerais\":[\"Multivitaminico: 1 capsula ao dia, preferencialmente com uma refeicao principal, para garantir a ingestao adequada de vitaminas e minerais durante o periodo de restricao calorica.\",\"Omega 3: 1 capsula ao dia (com almoço ou jantar) por suas propriedades anti-inflamatorias e beneficios para a saude cardiovascular.\",\"Vitamina D: Dosagem a ser determinada por profissional de saude apos exame de sangue, pois a deficiencia e comum e importante para diversos processos metabolicos.\"]},\"grafico\":[{\"dia\":\"Segunda\",\"caloriasTotais\":1735},{\"dia\":\"Terca\",\"caloriasTotais\":1590},{\"dia\":\"Quarta\",\"caloriasTotais\":1580},{\"dia\":\"Quinta\",\"caloriasTotais\":1650},{\"dia\":\"Sexta\",\"caloriasTotais\":1620},{\"dia\":\"Sabado\",\"caloriasTotais\":1710},{\"dia\":\"Domingo\",\"caloriasTotais\":1735}]}', '2025-11-18 22:58:46'),
(7, 5, NULL, '0af59709bb4c1b8105e7bc94950c5bb1372e94a44305925b49fe93780d20e200', '{\"name\":\"elo\",\"gender\":\"feminino\",\"age\":19,\"height\":1.6,\"weight\":77,\"objective\":\"Perder peso\",\"imc\":22.2,\"alergia\":\"Nenhuma\",\"trabalho\":\"professora\",\"esporte\":\"Nenhum\",\"rotina\":\"acorda as 12\",\"dietaAtual\":\"sem seguir nenhuma dieta especifica\",\"tempoPreparo\":\"pouco\",\"alimentosFavoritos\":[\"refrigerante\"],\"refeicoes\":[{\"nome\":\"Segunda\",\"refeicoes\":[{\"horario\":\"12:30\",\"nome\":\"Cafe da manha\",\"alimentos\":[\"2 unidades de ovo cozido\",\"1 fatia de pao integral (40g)\",\"1/2 unidade de abacate (60g)\",\"tempero: pimenta do reino e cheiro verde\"],\"calorias\":300},{\"horario\":\"15:30\",\"nome\":\"Lanche da tarde 1\",\"alimentos\":[\"1 unidade de maca (150g)\",\"20g de castanhas de caju\",\"tempero: canela em po\"],\"calorias\":190},{\"horario\":\"18:00\",\"nome\":\"Almoco\",\"alimentos\":[\"100g de peito de frango grelhado\",\"100g de batata doce cozida\",\"1 prato de salada de folhas verdes (alface, rucula) (80g)\",\"50g de tomate picado\",\"tempero: azeite de oliva extra virgem (1 colher de sopa), limao e oregano\",\"1 copo (200ml) de refrigerante\"],\"calorias\":450},{\"horario\":\"20:30\",\"nome\":\"Lanche da tarde 2\",\"alimentos\":[\"1 copo (170ml) de iogurte natural desnatado\",\"1 colher de sopa de sementes de chia (10g)\",\"tempero: adoçante natural (stevia) a gosto\"],\"calorias\":130},{\"horario\":\"22:30\",\"nome\":\"Jantar\",\"alimentos\":[\"120g de salmao assado\",\"100g de brocolis no vapor\",\"50g de cenoura cozida\",\"tempero: azeite de oliva extra virgem (1 colher de cha), alho e alecrim\"],\"calorias\":360},{\"horario\":\"00:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de camomila sem acucar\",\"tempero: sem tempero\"],\"calorias\":5}]},{\"nome\":\"Terca\",\"refeicoes\":[{\"horario\":\"12:30\",\"nome\":\"Cafe da manha\",\"alimentos\":[\"1 copo (200ml) de vitamina de banana com leite desnatado\",\"1 colher de sopa de aveia (15g)\",\"tempero: canela em po\"],\"calorias\":220},{\"horario\":\"15:30\",\"nome\":\"Lanche da tarde 1\",\"alimentos\":[\"200g de melancia picada\",\"30g de nozes\",\"tempero: hortela fresca\"],\"calorias\":200},{\"horario\":\"18:00\",\"nome\":\"Almoco\",\"alimentos\":[\"100g de carne magra (patinho) moida\",\"80g de pure de abobora\",\"1 prato de salada de couve-flor e vagem (100g)\",\"tempero: azeite de oliva extra virgem (1 colher de sopa), alho e pimenta do reino\"],\"calorias\":380},{\"horario\":\"20:30\",\"nome\":\"Lanche da tarde 2\",\"alimentos\":[\"1 unidade de pera (170g)\",\"tempero: sem tempero\"],\"calorias\":100},{\"horario\":\"22:30\",\"nome\":\"Jantar\",\"alimentos\":[\"120g de filé de tilapia assado\",\"80g de arroz integral\",\"100g de escarola refogada com alho\",\"tempero: azeite de oliva extra virgem (1 colher de cha), alho e salsinha\"],\"calorias\":350},{\"horario\":\"00:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 pote (100g) de gelatina diet\",\"tempero: sem tempero\"],\"calorias\":20}]},{\"nome\":\"Quarta\",\"refeicoes\":[{\"horario\":\"12:30\",\"nome\":\"Cafe da manha\",\"alimentos\":[\"1 fatia de pao integral (40g) com 2 colheres de sopa de pasta de amendoim natural (30g)\",\"1 unidade de banana (100g)\",\"tempero: canela em po\"],\"calorias\":350},{\"horario\":\"15:30\",\"nome\":\"Lanche da tarde 1\",\"alimentos\":[\"1 copo (200ml) de suco verde (couve, maca, gengibre) sem acucar\",\"tempero: gengibre ralado\"],\"calorias\":80},{\"horario\":\"18:00\",\"nome\":\"Almoco\",\"alimentos\":[\"100g de sobrecoxa de frango assada (sem pele)\",\"100g de pure de batata baroa\",\"1 prato de salada de pepino e beterraba ralada (100g)\",\"tempero: azeite de oliva extra virgem (1 colher de sopa), vinagre de maca e cebolinha\"],\"calorias\":420},{\"horario\":\"20:30\",\"nome\":\"Lanche da tarde 2\",\"alimentos\":[\"1 copo (200ml) de refrigerante\",\"tempero: sem tempero\"],\"calorias\":80},{\"horario\":\"22:30\",\"nome\":\"Jantar\",\"alimentos\":[\"120g de lentilha cozida\",\"50g de abobrinha refogada\",\"50g de berinjela grelhada\",\"tempero: azeite de oliva extra virgem (1 colher de cha), cominho e pimenta calabresa\"],\"calorias\":300},{\"horario\":\"00:00\",\"nome\":\"Ceia\",\"alimentos\":[\"30g de queijo minas frescal light\",\"tempero: sem tempero\"],\"calorias\":60}]},{\"nome\":\"Quinta\",\"refeicoes\":[{\"horario\":\"12:30\",\"nome\":\"Cafe da manha\",\"alimentos\":[\"1 crepioca (1 ovo + 2 colheres de sopa de tapioca - 30g)\",\"50g de queijo cottage\",\"tempero: oregano e pimenta do reino\"],\"calorias\":200},{\"horario\":\"15:30\",\"nome\":\"Lanche da tarde 1\",\"alimentos\":[\"1 unidade de laranja (180g)\",\"30g de amendoim torrado (sem sal)\",\"tempero: sem tempero\"],\"calorias\":240},{\"horario\":\"18:00\",\"nome\":\"Almoco\",\"alimentos\":[\"100g de carne bovina magra (alcatra) grelhada\",\"80g de quinoa cozida\",\"1 prato de salada de rucula e palmito (100g)\",\"tempero: azeite de oliva extra virgem (1 colher de sopa), mostarda dijon e cheiro verde\"],\"calorias\":400},{\"horario\":\"20:30\",\"nome\":\"Lanche da tarde 2\",\"alimentos\":[\"1 copo (200ml) de leite desnatado\",\"tempero: canela em po\"],\"calorias\":70},{\"horario\":\"22:30\",\"nome\":\"Jantar\",\"alimentos\":[\"120g de sopa de legumes com frango desfiado (abobora, cenoura, couve-flor)\",\"tempero: azeite de oliva extra virgem (1 colher de cha), salsinha e cebolinha\"],\"calorias\":280},{\"horario\":\"00:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de cidreira sem acucar\",\"tempero: sem tempero\"],\"calorias\":5}]},{\"nome\":\"Sexta\",\"refeicoes\":[{\"horario\":\"12:30\",\"nome\":\"Cafe da manha\",\"alimentos\":[\"1 tigela (150g) de iogurte natural desnatado com 100g de morangos picados\",\"20g de granola light sem acucar\",\"tempero: baunilha e canela em po\"],\"calorias\":250},{\"horario\":\"15:30\",\"nome\":\"Lanche da tarde 1\",\"alimentos\":[\"1 unidade de kiwi (70g)\",\"20g de amendoas\",\"tempero: sem tempero\"],\"calorias\":140},{\"horario\":\"18:00\",\"nome\":\"Almoco\",\"alimentos\":[\"100g de ovos mexidos (2 ovos)\",\"80g de batata doce assada em rodelas\",\"1 prato de salada de folhas mistas (agriao, alface) e pimentao (100g)\",\"tempero: azeite de oliva extra virgem (1 colher de sopa), curcuma e pimenta do reino\"],\"calorias\":380},{\"horario\":\"20:30\",\"nome\":\"Lanche da tarde 2\",\"alimentos\":[\"1 copo (200ml) de suco de maracuja natural sem acucar\",\"tempero: sem tempero\"],\"calorias\":60},{\"horario\":\"22:30\",\"nome\":\"Jantar\",\"alimentos\":[\"120g de atum em agua (escorrido)\",\"100g de pure de couve-flor\",\"50g de ervilha fresca\",\"tempero: azeite de oliva extra virgem (1 colher de cha), limao e pimenta do reino\"],\"calorias\":320},{\"horario\":\"00:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de hortela sem acucar\",\"tempero: sem tempero\"],\"calorias\":5}]},{\"nome\":\"Sabado\",\"refeicoes\":[{\"horario\":\"12:30\",\"nome\":\"Cafe da manha\",\"alimentos\":[\"2 unidades de ovos mexidos com espinafre (100g)\",\"1 fatia de pao integral (40g)\",\"tempero: noz-moscada e alho em po\"],\"calorias\":280},{\"horario\":\"15:30\",\"nome\":\"Lanche da tarde 1\",\"alimentos\":[\"1 unidade de banana (100g)\",\"20g de pasta de amendoim natural\",\"tempero: canela em po\"],\"calorias\":200},{\"horario\":\"18:00\",\"nome\":\"Almoco\",\"alimentos\":[\"100g de frango desfiado com legumes (abobrinha, cenoura, vagem)\",\"80g de arroz integral\",\"tempero: azeite de oliva extra virgem (1 colher de sopa), pimentao e cheiro verde\"],\"calorias\":390},{\"horario\":\"20:30\",\"nome\":\"Lanche da tarde 2\",\"alimentos\":[\"1 copo (170ml) de iogurte natural desnatado\",\"1 colher de sopa de semente de girassol (10g)\",\"tempero: sem tempero\"],\"calorias\":140},{\"horario\":\"22:30\",\"nome\":\"Jantar\",\"alimentos\":[\"120g de salmao grelhado\",\"100g de aspargos no vapor\",\"50g de tomate cereja assado\",\"tempero: azeite de oliva extra virgem (1 colher de cha), dill e pimenta do reino\",\"1 copo (200ml) de refrigerante\"],\"calorias\":480},{\"horario\":\"00:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de erva-doce sem acucar\",\"tempero: sem tempero\"],\"calorias\":5}]},{\"nome\":\"Domingo\",\"refeicoes\":[{\"horario\":\"12:30\",\"nome\":\"Cafe da manha\",\"alimentos\":[\"1 omelete (2 ovos) com queijo minas frescal light (30g) e espinafre (50g)\",\"1/2 unidade de papaia (150g)\",\"tempero: curcuma e pimenta do reino\"],\"calorias\":290},{\"horario\":\"15:30\",\"nome\":\"Lanche da tarde 1\",\"alimentos\":[\"1 unidade de pera (170g)\",\"30g de castanhas do para\",\"tempero: sem tempero\"],\"calorias\":240},{\"horario\":\"18:00\",\"nome\":\"Almoco\",\"alimentos\":[\"100g de feijao cozido\",\"80g de arroz integral\",\"100g de couve refogada\",\"100g de carne magra assada (lagarto) fatiada\",\"tempero: azeite de oliva extra virgem (1 colher de sopa), louro e alho\"],\"calorias\":450},{\"horario\":\"20:30\",\"nome\":\"Lanche da tarde 2\",\"alimentos\":[\"1 copo (200ml) de cha gelado de hibisco sem acucar\",\"tempero: sem tempero\"],\"calorias\":5},{\"horario\":\"22:30\",\"nome\":\"Jantar\",\"alimentos\":[\"120g de tofu grelhado\",\"100g de mix de vegetais (brocolis, cenoura, ervilha)\",\"tempero: azeite de oliva extra virgem (1 colher de cha), shoyu light e gengibre\"],\"calorias\":300},{\"horario\":\"00:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de capim-limao sem acucar\",\"tempero: sem tempero\"],\"calorias\":5}]}],\"suplementos\":{\"suplementos_antes_treino_esporte\":[],\"suplementos_antes_treino_academia\":[],\"suplementos_gerais\":[\"Multivitaminico: 1 capsula por dia, apos o cafe da manha.\",\"Omega 3: 1000mg por dia, com uma das principais refeicoes.\",\"Vitamina D: 2000 UI por dia, apos o cafe da manha (se houver deficiencia, conforme orientacao medica).\"]},\"grafico\":[{\"dia\":\"Segunda\",\"caloriasTotais\":1435},{\"dia\":\"Terca\",\"caloriasTotais\":1270},{\"dia\":\"Quarta\",\"caloriasTotais\":1290},{\"dia\":\"Quinta\",\"caloriasTotais\":1195},{\"dia\":\"Sexta\",\"caloriasTotais\":1155},{\"dia\":\"Sabado\",\"caloriasTotais\":1495},{\"dia\":\"Domingo\",\"caloriasTotais\":1290}]}', '2025-11-18 23:38:47'),
(8, 5, NULL, 'cd7c1ee539bb3e8b754b3a4f462fbc5d8add60d52b04a9c41cd5a6c87a4d84f3', '{\"name\":\"elo\",\"gender\":\"feminino\",\"age\":19,\"height\":1.6,\"weight\":90,\"objective\":\"Perder peso\",\"imc\":22.2,\"alergia\":\"Nenhuma\",\"trabalho\":\"professora\",\"esporte\":\"Nenhum\",\"rotina\":\"acordo as 9\",\"dietaAtual\":\"sem seguir nenhuma dieta especifica\",\"tempoPreparo\":\"pouco\",\"alimentosFavoritos\":[\"refrigerante\"],\"refeicoes\":[{\"nome\":\"Segunda-feira\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"2 unidades de ovos mexidos\",\"1 fatia de pao integral\",\"1/2 unidade de abacate (60g)\",\"tempero: azeite extra virgem (5ml), sal e pimenta do reino\"],\"calorias\":320},{\"horario\":\"12:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"1 pote (170g) de iogurte natural desnatado\",\"20g de castanhas de caju\",\"tempero: canela em po\"],\"calorias\":220},{\"horario\":\"14:00\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de frango grelhado\",\"80g de arroz integral cozido\",\"80g de salada de folhas verdes (alface, rucula)\",\"60g de tomate picado\",\"60g de pepino em rodelas\",\"tempero: azeite extra virgem (5ml), vinagre de maca, sal e oregano\"],\"calorias\":450},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 lata (350ml) de refrigerante\",\"1 sanduiche natural (2 fatias de pao integral, 50g de peito de peru light, 30g de alface, 30g de tomate)\",\"tempero: mostarda dijon (quantidade minima), sal\"],\"calorias\":400},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"1 prato (300ml) de sopa de legumes (80g de abobrinha, 80g de cenoura, 80g de chuchu) com 80g de carne bovina magra desfiada (patinho)\",\"tempero: alho, cebola, salsinha, sal e pimenta do reino\"],\"calorias\":300},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 porcao (100g) de gelatina diet\",\"tempero: Nao aplicavel\"],\"calorias\":10}]},{\"nome\":\"Terca-feira\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"1 copo (300ml) de smoothie (1 unidade de banana, 100g de frutas vermelhas congeladas, 10g de aveia, 10g de chia, 200ml de leite desnatado)\",\"tempero: Nao aplicavel\"],\"calorias\":280},{\"horario\":\"12:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"1 unidade de maca\",\"100g de queijo cottage\",\"tempero: Nao aplicavel\"],\"calorias\":180},{\"horario\":\"14:00\",\"nome\":\"Almoco\",\"alimentos\":[\"150g de file de peixe (tilapia) assado\",\"100g de batata doce cozida\",\"80g de brocolis cozido no vapor\",\"80g de cenoura cozida no vapor\",\"tempero: suco de limao, azeite extra virgem (5ml), alho, salsinha e pimenta do reino\"],\"calorias\":480},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"2 unidades de ovos cozidos\",\"100g de tomate cereja\",\"tempero: sal e oregano\"],\"calorias\":190},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"1 lata (170g) de atum em agua\",\"100g de alface crespa\",\"60g de pepino picado\",\"60g de pimentao colorido picado\",\"1/2 unidade de cebola roxa fatiada\",\"tempero: azeite extra virgem (5ml), vinagre balsamico, sal e ervas finas\"],\"calorias\":320},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de camomila\",\"tempero: Nao aplicavel\"],\"calorias\":0}]},{\"nome\":\"Quarta-feira\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"1 unidade de tapioca (30g de massa seca)\",\"2 unidades de ovos mexidos\",\"30g de queijo minas frescal\",\"tempero: azeite extra virgem (5ml), sal e pimenta do reino\"],\"calorias\":300},{\"horario\":\"12:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"1 unidade de pera\",\"10g de sementes de girassol\",\"tempero: Nao aplicavel\"],\"calorias\":130},{\"horario\":\"14:00\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de carne moida magra refogada (patinho)\",\"80g de arroz integral cozido\",\"60g de couve refogada\",\"60g de abobrinha refogada\",\"60g de milho verde cozido\",\"1 lata (350ml) de refrigerante\",\"tempero: alho, cebola, cheiro verde, sal e colorau\"],\"calorias\":650},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 pote (170g) de iogurte natural desnatado\",\"30g de granola light\",\"tempero: Nao aplicavel\"],\"calorias\":200},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"1 omelete (2 unidades de ovos)\",\"50g de espinafre picado\",\"50g de tomate picado\",\"30g de queijo cottage\",\"tempero: azeite extra virgem (5ml), sal, pimenta do reino e oregano\"],\"calorias\":280},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 unidade de banana\",\"tempero: Nao aplicavel\"],\"calorias\":90}]},{\"nome\":\"Quinta-feira\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"1 copo (300ml) de vitamina (200ml de leite desnatado, 1 unidade de banana, 20g de aveia)\",\"tempero: Nao aplicavel\"],\"calorias\":250},{\"horario\":\"12:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"2 fatias de pao de forma integral\",\"50g de pate de atum (atum em agua, creme de ricota light)\",\"tempero: sal e salsinha\"],\"calorias\":240},{\"horario\":\"14:00\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de file de frango grelhado\",\"150g de pure de abobora\",\"80g de couve refogada\",\"tempero: alho, cebola, noz moscada (no pure), sal e pimenta do reino\"],\"calorias\":420},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"50g de queijo minas frescal\",\"30g de goiabada light\",\"tempero: Nao aplicavel\"],\"calorias\":180},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"2 fatias de pao de forma integral\",\"80g de peito de peru light\",\"folhas de alface (50g)\",\"rodelas de tomate (50g)\",\"50g de cenoura ralada\",\"tempero: azeite extra virgem (5ml), sal e oregano\"],\"calorias\":300},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"10g de castanhas do para\",\"tempero: Nao aplicavel\"],\"calorias\":70}]},{\"nome\":\"Sexta-feira\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"1 porcao (200ml) de overnight oats (50g de aveia, 150ml de leite desnatado, 10g de chia, 50g de frutas vermelhas)\",\"tempero: canela em po\"],\"calorias\":280},{\"horario\":\"12:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"100g de cenouras baby\",\"100g de pepino em palitos\",\"50g de homus\",\"tempero: Nao aplicavel\"],\"calorias\":150},{\"horario\":\"14:00\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de salmao assado\",\"80g de quinoa cozida\",\"80g de aspargos cozidos no vapor\",\"60g de tomate cereja\",\"tempero: azeite extra virgem (5ml), suco de limao, sal e pimenta do reino\"],\"calorias\":550},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 pote (170g) de iogurte natural desnatado\",\"1 unidade de kiwi\",\"tempero: Nao aplicavel\"],\"calorias\":150},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"2 folhas grandes de alface americana (para wrap)\",\"100g de carne desfiada (patinho)\",\"50g de repolho roxo ralado\",\"50g de pimentao em tiras\",\"1 lata (350ml) de refrigerante\",\"tempero: azeite extra virgem (5ml), limao, sal e coentro\"],\"calorias\":500},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 copo (200ml) de leite desnatado\",\"tempero: Nao aplicavel\"],\"calorias\":70}]},{\"nome\":\"Sabado\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"2 unidades de panquecas de banana com aveia (feitas com 1 ovo, 1 banana, 30g de aveia)\",\"tempero: canela em po\"],\"calorias\":280},{\"horario\":\"12:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"100g de mix de frutas (morango, melao, uva)\",\"tempero: Nao aplicavel\"],\"calorias\":80},{\"horario\":\"14:00\",\"nome\":\"Almoco\",\"alimentos\":[\"80g de feijao cozido\",\"80g de arroz integral cozido\",\"120g de carne bovina magra (alcatra) grelhada\",\"100g de salada de folhas verdes (alface, espinafre)\",\"60g de brocolis no vapor\",\"tempero: alho, cebola, louro (no feijao), azeite extra virgem (5ml), sal e pimenta do reino\"],\"calorias\":520},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"100g de chips de batata doce assados (temperados com sal e alecrim)\",\"tempero: sal e alecrim\"],\"calorias\":150},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"1 unidade de pizza de frigideira integral (base integral, 80g de frango desfiado, 30g de queijo mussarela light, molho de tomate caseiro (50g), 30g de rodelas de cebola, 30g de pimentao e 30g de champignon)\",\"tempero: oregano, alho e manjericao\"],\"calorias\":450},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 porcao (150ml) de pudim de chia (com leite desnatado e um toque de adocante natural)\",\"tempero: Nao aplicavel\"],\"calorias\":120}]},{\"nome\":\"Domingo\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"2 unidades de ovos mexidos\",\"1 fatia de torrada integral\",\"1/4 unidade de abacate (30g)\",\"tempero: azeite extra virgem (5ml), sal e pimenta do reino\"],\"calorias\":300},{\"horario\":\"12:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"2 unidades de biscoito de arroz\",\"20g de geleia de frutas sem acucar\",\"tempero: Nao aplicavel\"],\"calorias\":90},{\"horario\":\"14:00\",\"nome\":\"Almoco\",\"alimentos\":[\"1 porcao (250g) de lasanha de abobrinha (com 120g de frango desfiado, molho de tomate caseiro (80g) e 30g de queijo mussarela light)\",\"100g de salada de rucula e tomate cereja\",\"tempero: oregano, alho, manjericao (na lasanha), azeite extra virgem (5ml) (na salada)\"],\"calorias\":480},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 pote (170g) de iogurte natural desnatado\",\"1 unidade de pessego\",\"tempero: Nao aplicavel\"],\"calorias\":160},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"1 unidade de crepioca (1 ovo, 2 colheres de sopa de goma de tapioca) com 80g de ricota temperada e 50g de espinafre refogado\",\"tempero: sal, pimenta do reino, noz moscada (na ricota)\"],\"calorias\":300},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"100g de frutas vermelhas (morangos, mirtilos)\",\"tempero: Nao aplicavel\"],\"calorias\":40}]}],\"suplementos\":{\"suplementos_antes_treino_esporte\":[],\"suplementos_antes_treino_academia\":[],\"suplementos_gerais\":[{\"nome\":\"Multivitaminico\",\"dosagem\":\"1 capsula/dia\",\"horario\":\"Pos cafe da manha\",\"observacao\":\"Para garantir a ingestao adequada de vitaminas e minerais essenciais.\"},{\"nome\":\"Vitamina D\",\"dosagem\":\"2000 UI/dia\",\"horario\":\"Pos refeicao principal\",\"observacao\":\"Importante para saude ossea, imunidade e pode auxiliar no controle de peso, especialmente para quem tem pouca exposicao solar.\"},{\"nome\":\"Omega 3\",\"dosagem\":\"1000mg/dia\",\"horario\":\"Pos refeicao principal\",\"observacao\":\"Acidos graxos essenciais com acao anti-inflamatoria, beneficios cardiovasculares e para a saude cerebral.\"}]},\"grafico\":[{\"dia\":\"Segunda-feira\",\"caloriasTotais\":1700},{\"dia\":\"Terca-feira\",\"caloriasTotais\":1450},{\"dia\":\"Quarta-feira\",\"caloriasTotais\":1650},{\"dia\":\"Quinta-feira\",\"caloriasTotais\":1460},{\"dia\":\"Sexta-feira\",\"caloriasTotais\":1700},{\"dia\":\"Sabado\",\"caloriasTotais\":1600},{\"dia\":\"Domingo\",\"caloriasTotais\":1370}]}', '2025-11-19 00:13:12');
INSERT INTO `cardapio` (`id`, `usuario_id`, `respostas_id`, `hash_respostas`, `cardapio_texto`, `criado_em`) VALUES
(9, 5, 34, '3c8529860f356d4f27f1f95e880a0eb7b950a0422795868a6cb7626058b307da', '{\"name\":\"EU\",\"gender\":\"feminino\",\"age\":25,\"height\":1.77,\"weight\":90,\"objective\":\"Perder peso\",\"imc\":25.8,\"alergia\":\"Nenhuma\",\"trabalho\":\"personal trainer\",\"esporte\":\"BOXE\",\"rotina\":\"Acordo as 5h30, faco cardio em jejum, treino musculacao as 15h, trabalho como personal trainer das 7h as 12h e das 16h as 20h. Durmo as 22h.\",\"dietaAtual\":\"low carb\",\"tempoPreparo\":\"pouco\",\"alimentosFavoritos\":[\"PIZZA (substituido por pizza low-carb de couve-flor)\"],\"refeicoes\":[{\"nome\":\"Segunda\",\"refeicoes\":[{\"horario\":\"06:45\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"3 unidades de ovos grandes\",\"50g de queijo mussarela ralado\",\"50g de espinafre refogado\",\"100g de abacate fatiado\",\"tempero: pimenta do reino e oregano\",\"1 xicara (200ml) de cafe preto sem acucar\"],\"calorias\":420},{\"horario\":\"10:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"30g de castanhas de caju\",\"50g de queijo prato em cubos\"],\"calorias\":250},{\"horario\":\"12:30\",\"nome\":\"Almoco\",\"alimentos\":[\"1 fatia grande de pizza low-carb de couve-flor (com recheio de 150g de frango desfiado, 50g de queijo mussarela, 2 colheres de sopa de molho de tomate caseiro, 50g de rodelas de abobrinha e 30g de champignon)\",\"tempero: oregano e manjericao frescos\"],\"calorias\":480},{\"horario\":\"14:30\",\"nome\":\"Pre-treino\",\"alimentos\":[\"1 xicara (200ml) de cafe preto sem acucar\",\"30g de amendoas\"],\"calorias\":180},{\"horario\":\"15:45\",\"nome\":\"Pos-treino\",\"alimentos\":[\"30g de Whey Protein (suplemento)\",\"100g de morangos picados\"],\"calorias\":180},{\"horario\":\"20:30\",\"nome\":\"Jantar\",\"alimentos\":[\"180g de frango desfiado\",\"100g de alface\",\"50g de rucula\",\"50g de tomate cereja\",\"50g de pepino em rodelas\",\"1 colher de sopa (15ml) de azeite extra virgem\",\"tempero: sal marinho e limao\"],\"calorias\":450},{\"horario\":\"21:30\",\"nome\":\"Ceia\",\"alimentos\":[\"1 pote (170g) de iogurte natural integral sem acucar\",\"1 colher de sopa (10g) de sementes de chia\"],\"calorias\":180}]},{\"nome\":\"Terca\",\"refeicoes\":[{\"horario\":\"06:45\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"1 xicara (200ml) de cafe preto sem acucar\",\"3 unidades de ovos mexidos\",\"50g de queijo cottage\",\"50g de tomate picado\",\"tempero: cebolinha e pimenta do reino\"],\"calorias\":380},{\"horario\":\"10:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"100g de queijo minas frescal light\",\"30g de nozes\"],\"calorias\":280},{\"horario\":\"12:30\",\"nome\":\"Almoco\",\"alimentos\":[\"180g de carne moida (patinho) refogada\",\"50g de pimentoes coloridos (vermelho, amarelo)\",\"30g de cebola fatiada\",\"100g de alface crespa\",\"50g de rucula\",\"1 colher de sopa (15ml) de azeite extra virgem\",\"tempero: alho, cominho e sal marinho\"],\"calorias\":500},{\"horario\":\"14:30\",\"nome\":\"Pre-treino\",\"alimentos\":[\"2 unidades de ovos cozidos\",\"tempero: pitada de sal e pimenta\"],\"calorias\":160},{\"horario\":\"15:45\",\"nome\":\"Pos-treino\",\"alimentos\":[\"30g de Whey Protein (suplemento)\",\"100g de morangos\"],\"calorias\":180},{\"horario\":\"20:30\",\"nome\":\"Jantar\",\"alimentos\":[\"1 fatia media de pizza low-carb de couve-flor (com recheio de 120g de carne seca desfiada, 40g de queijo coalho, 2 colheres de sopa de molho de tomate caseiro, 30g de rodelas de tomate e 20g de cebola roxa)\",\"tempero: pimenta do reino e salsa\"],\"calorias\":450},{\"horario\":\"21:30\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de camomila sem acucar\",\"100g de abacate fatiado\"],\"calorias\":160}]},{\"nome\":\"Quarta\",\"refeicoes\":[{\"horario\":\"06:45\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"100g de abacate\",\"50g de espinafre\",\"200ml de leite de coco sem acucar\",\"1 colher de sopa (10g) de sementes de chia\",\"tempero: pitada de canela\"],\"calorias\":350},{\"horario\":\"10:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"50g de azeitonas verdes sem caroço\",\"50g de queijo provolone em cubos\"],\"calorias\":220},{\"horario\":\"12:30\",\"nome\":\"Almoco\",\"alimentos\":[\"180g de peito de frango grelhado\",\"100g de abobrinha refogada\",\"100g de berinjela assada\",\"50g de tomate cereja\",\"1 colher de sopa (15ml) de azeite extra virgem\",\"tempero: alho, alecrim e pimenta calabresa\"],\"calorias\":480},{\"horario\":\"14:30\",\"nome\":\"Pre-treino\",\"alimentos\":[\"1 fatia pequena de pizza low-carb de couve-flor (com recheio de 50g de peito de peru, 30g de queijo cottage, 1 colher de sopa de molho de tomate caseiro e 20g de folhas de rucula)\",\"tempero: alho em po e oregano\"],\"calorias\":280},{\"horario\":\"15:45\",\"nome\":\"Pos-treino\",\"alimentos\":[\"30g de Whey Protein (suplemento)\",\"80g de mirtilos\"],\"calorias\":170},{\"horario\":\"20:30\",\"nome\":\"Jantar\",\"alimentos\":[\"180g de tiras de carne bovina (patinho)\",\"100g de cogumelos salteados\",\"80g de aspargos grelhados\",\"tempero: molho shoyu light, gengibre ralado e gergelim\"],\"calorias\":520},{\"horario\":\"21:30\",\"nome\":\"Ceia\",\"alimentos\":[\"100g de gelatina zero acucar\",\"50g de creme de leite light\",\"tempero: essencia de baunilha natural\"],\"calorias\":100}]},{\"nome\":\"Quinta\",\"refeicoes\":[{\"horario\":\"06:45\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"2 unidades de panqueca low-carb (feitas com 2 ovos e 2 colheres de sopa de farinha de coco)\",\"2 colheres de sopa de geleia de frutas vermelhas sem acucar\",\"20g de lascas de coco sem acucar\",\"tempero: canela em po\"],\"calorias\":380},{\"horario\":\"10:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"5 unidades de ovos de codorna cozidos\",\"tempero: pitada de sal\"],\"calorias\":100},{\"horario\":\"12:30\",\"nome\":\"Almoco\",\"alimentos\":[\"180g de salmao assado\",\"80g de vagem no vapor\",\"80g de brocolis no vapor\",\"40g de cenoura (pequena porcao) no vapor\",\"1 colher de sopa (15ml) de azeite extra virgem\",\"tempero: limao, endro e alho\"],\"calorias\":550},{\"horario\":\"14:30\",\"nome\":\"Pre-treino\",\"alimentos\":[\"1 pote (170g) de iogurte natural integral sem acucar\",\"1 colher de sopa (10g) de sementes de abobora\"],\"calorias\":200},{\"horario\":\"15:45\",\"nome\":\"Pos-treino\",\"alimentos\":[\"30g de Whey Protein (suplemento)\",\"30g de mix de oleaginosas (amendoim, castanha do para, nozes)\"],\"calorias\":280},{\"horario\":\"20:30\",\"nome\":\"Jantar\",\"alimentos\":[\"3 unidades de ovos\",\"50g de queijo minas padrao\",\"50g de couve flor picada\",\"50g de tomate picado\",\"30g de cebola picada\",\"tempero: salsinha, cebolinha e pimenta do reino\"],\"calorias\":400},{\"horario\":\"21:30\",\"nome\":\"Ceia\",\"alimentos\":[\"1 copo (200ml) de leite de amendoas sem acucar\",\"15g de Whey Protein (suplemento)\"],\"calorias\":150}]},{\"nome\":\"Sexta\",\"refeicoes\":[{\"horario\":\"06:45\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"3 unidades de ovos\",\"50g de queijo mussarela ralado\",\"50g de espinafre refogado\",\"tempero: alho em po e noz moscada\",\"1 xicara (200ml) de cafe preto sem acucar\"],\"calorias\":420},{\"horario\":\"10:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"100g de abacate fatiado\",\"tempero: sal marinho e pimenta do reino\"],\"calorias\":160},{\"horario\":\"12:30\",\"nome\":\"Almoco\",\"alimentos\":[\"180g de frango em cubos (frango xadrez low carb)\",\"50g de pimentao verde\",\"50g de pimentao vermelho\",\"30g de cebola\",\"30g de amendoim torrado (sem sal)\",\"2 colheres de sopa de molho shoyu light\",\"100g de brocolis no vapor\",\"tempero: gengibre ralado e oleo de gergelim\"],\"calorias\":500},{\"horario\":\"14:30\",\"nome\":\"Pre-treino\",\"alimentos\":[\"1 xicara (200ml) de cafe preto sem acucar\",\"50g de queijo provolone em cubos\"],\"calorias\":200},{\"horario\":\"15:45\",\"nome\":\"Pos-treino\",\"alimentos\":[\"30g de Whey Protein (suplemento)\",\"100g de morangos\"],\"calorias\":180},{\"horario\":\"20:30\",\"nome\":\"Jantar\",\"alimentos\":[\"180g de carne assada (lagarto fatiado)\",\"150g de pure de couve-flor\",\"50g de alface\",\"50g de rucula\",\"1 colher de sopa (15ml) de azeite extra virgem\",\"tempero: louro e pimenta do reino\"],\"calorias\":520},{\"horario\":\"21:30\",\"nome\":\"Ceia\",\"alimentos\":[\"100g de queijo cottage\",\"tempero: gotas de stevia e canela em po\"],\"calorias\":120}]},{\"nome\":\"Sabado\",\"refeicoes\":[{\"horario\":\"06:45\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"3 unidades de ovos mexidos\",\"2 fatias (40g) de bacon\",\"50g de tomate cereja\",\"tempero: cebolinha e pimenta do reino\"],\"calorias\":450},{\"horario\":\"10:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"100g de pepino em rodelas\",\"50g de cream cheese light\",\"tempero: endro fresco\"],\"calorias\":150},{\"horario\":\"12:30\",\"nome\":\"Almoco\",\"alimentos\":[\"180g de peito de frango grelhado em tiras\",\"150g de alface americana\",\"30g de queijo parmesao ralado\",\"2 colheres de sopa de molho caesar caseiro (azeite, limao, mostarda dijon, alho, gema de ovo)\",\"tempero: alho, pimenta do reino e ervas finas\"],\"calorias\":500},{\"horario\":\"14:30\",\"nome\":\"Pre-treino\",\"alimentos\":[\"1 lata (120g) de sardinha em azeite\",\"2 unidades de ovos de codorna cozidos\",\"tempero: limao e salsa\"],\"calorias\":280},{\"horario\":\"15:45\",\"nome\":\"Pos-treino\",\"alimentos\":[\"30g de Whey Protein (suplemento)\",\"1 colher de sopa (10g) de mix de sementes (chia, linhaça, girassol)\"],\"calorias\":200},{\"horario\":\"20:30\",\"nome\":\"Jantar\",\"alimentos\":[\"180g de carne seca desfiada\",\"200g de pure de couve-flor (com 1 colher de sopa de creme de leite light)\",\"tempero: alho, cebola e salsinha\"],\"calorias\":550},{\"horario\":\"21:30\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de hortela sem acucar\",\"2 unidades de ovos cozidos\",\"tempero: pitada de sal\"],\"calorias\":160}]},{\"nome\":\"Domingo\",\"refeicoes\":[{\"horario\":\"06:45\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"3 unidades de ovos\",\"50g de queijo minas padrao\",\"30g de presunto magro\",\"tempero: oregano e pimenta do reino\",\"1 xicara (200ml) de cha verde sem acucar\"],\"calorias\":400},{\"horario\":\"10:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"1 pote (170g) de iogurte natural integral sem acucar\",\"80g de framboesas\"],\"calorias\":180},{\"horario\":\"12:30\",\"nome\":\"Almoco\",\"alimentos\":[\"200g de picanha fatiada grelhada\",\"100g de linguica de frango grelhada\",\"80g de coracao de frango grelhado\",\"50g de tomate picado\",\"50g de cebola roxa picada\",\"50g de pepino picado\",\"1 colher de sopa (15ml) de azeite extra virgem\",\"tempero: sal grosso (para a carne), chimichurri e vinagrete\"],\"calorias\":700},{\"horario\":\"14:30\",\"nome\":\"Pre-treino\",\"alimentos\":[\"100g de abacate amassado\",\"tempero: gotas de limao e pitada de sal\"],\"calorias\":160},{\"horario\":\"15:45\",\"nome\":\"Pos-treino\",\"alimentos\":[\"30g de Whey Protein (suplemento)\",\"30g de mix de castanhas (caju, para, amendoas)\"],\"calorias\":280},{\"horario\":\"20:30\",\"nome\":\"Jantar\",\"alimentos\":[\"200g de frango assado (coxa e sobrecoxa sem pele)\",\"80g de vagem assada\",\"80g de pimentao assado\",\"40g de cenoura (pequena porcao) assada\",\"tempero: alecrim, alho e pa de fumaca\"],\"calorias\":520},{\"horario\":\"21:30\",\"nome\":\"Ceia\",\"alimentos\":[\"100g de queijo minas frescal\",\"tempero: oregano fresco\"],\"calorias\":150}]}],\"suplementos\":{\"suplementos_antes_treino_esporte\":[{\"nome\":\"Beta-Alanina\",\"quantidade\":\"1 dose (2-5g)\",\"horario\":\"30 minutos antes do treino de musculacao\"},{\"nome\":\"Cafeina\",\"quantidade\":\"200mg\",\"horario\":\"30 minutos antes do treino de musculacao\"}],\"suplementos_antes_treino_academia\":[],\"suplementos_gerais\":[{\"nome\":\"Creatina\",\"quantidade\":\"5g\",\"horario\":\"Diariamente, a qualquer hora (ex: com cafe da manha ou pos-treino)\"},{\"nome\":\"Whey Protein\",\"quantidade\":\"30g\",\"horario\":\"Imediatamente apos o treino de musculacao\"},{\"nome\":\"Multivitaminico\",\"quantidade\":\"1 capsula\",\"horario\":\"Com uma das principais refeicoes (almoco ou jantar)\"},{\"nome\":\"Omega 3\",\"quantidade\":\"1000mg\",\"horario\":\"2 vezes ao dia, com refeicoes principais (almoco e jantar)\"},{\"nome\":\"Vitamina D\",\"quantidade\":\"Dose conforme necessidade individual\",\"horario\":\"Diariamente, com uma refeicao rica em gordura (verificar com profissional de saude)\"}]},\"grafico\":[{\"dia\":\"Segunda\",\"caloriasTotais\":2140},{\"dia\":\"Terca\",\"caloriasTotais\":2110},{\"dia\":\"Quarta\",\"caloriasTotais\":2120},{\"dia\":\"Quinta\",\"caloriasTotais\":2060},{\"dia\":\"Sexta\",\"caloriasTotais\":2100},{\"dia\":\"Sabado\",\"caloriasTotais\":2290},{\"dia\":\"Domingo\",\"caloriasTotais\":2390}]}', '2025-11-19 00:38:24'),
(10, 5, 35, 'e08d2a23c6ba4912242fc525c01789e1dfec8bb22230c0af516c0b4ac940140f', '{\"name\":\"EU\",\"gender\":\"feminino\",\"age\":33,\"height\":1.6,\"weight\":70,\"objective\":\"Perder peso\",\"imc\":22.2,\"alergia\":\"Nenhuma\",\"trabalho\":\"professora\",\"esporte\":\"Nenhum\",\"rotina\":\"ACORDO AS 9\",\"dietaAtual\":\"sem seguir nenhuma dieta especifica\",\"tempoPreparo\":\"pouco\",\"alimentosFavoritos\":[\"CERVEJA\"],\"refeicoes\":[{\"nome\":\"Segunda\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"2 unidades de ovo mexido\",\"1 fatia de torrada integral\",\"50g de tomate picado\",\"1 xicara (150ml) de cafe preto sem acucar\",\"tempero: pimenta do reino e oregano\"],\"calorias\":250},{\"horario\":\"12:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"1 pote (170g) de iogurte natural desnatado\",\"100g de morangos frescos\"],\"calorias\":120},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de peito de frango grelhado\",\"150g de salada de folhas verdes (alface, rucula, espinafre)\",\"50g de pepino em rodelas\",\"1 colher de cha de azeite de oliva extra virgem\",\"tempero: limao e ervas finas\"],\"calorias\":350},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 unidade de maca\",\"30g de castanhas de caju\"],\"calorias\":200},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"300ml de sopa de legumes (abobrinha, cenoura, chuchu)\",\"80g de frango desfiado\",\"tempero: salsa e cebolinha\"],\"calorias\":280},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara de cha de camomila sem acucar\"],\"calorias\":10}]},{\"nome\":\"Terca\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"1 copo (200ml) de vitamina de abacate (1/2 unid de abacate, leite desnatado)\",\"1 colher de sopa de linhaça\",\"tempero: canela em po\"],\"calorias\":280},{\"horario\":\"12:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"1 unidade de banana\",\"1 colher de cha de pasta de amendoim integral\"],\"calorias\":150},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de file de tilapia assado\",\"100g de brocolis cozido\",\"80g de arroz integral\",\"tempero: alho e alecrim\"],\"calorias\":380},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"30g de mix de sementes (abobora, girassol)\"],\"calorias\":160},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"Omelete (2 ovos) com 50g de espinafre\",\"50g de tomate cereja\",\"2 colheres de sopa de queijo cottage\",\"tempero: curcuma e pimenta do reino\"],\"calorias\":260},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 lata (350ml) de CERVEJA\"],\"calorias\":150}]},{\"nome\":\"Quarta\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"1 disco de tapioca com 1 ovo mexido\",\"30g de queijo minas frescal\",\"30g de tomate picado\",\"tempero: oregano\"],\"calorias\":250},{\"horario\":\"12:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"1 unidade de pera\"],\"calorias\":100},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de carne moida magra refogada\",\"150g de pure de abobora\",\"50g de salada de agriao\",\"50g de tomate cereja\",\"tempero: louro e cheiro-verde\"],\"calorias\":390},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 pote (100g) de iogurte grego light\",\"1 colher de sopa de chia\"],\"calorias\":150},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"120g de salmao assado\",\"100g de aspargos\",\"100g de batata doce cozida\",\"tempero: azeite, limao e dill\"],\"calorias\":450},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 lata (350ml) de CERVEJA\"],\"calorias\":150}]},{\"nome\":\"Quinta\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"30g de aveia cozida em agua\",\"80g de frutas vermelhas\",\"20g de nozes\",\"tempero: canela em po\"],\"calorias\":280},{\"horario\":\"12:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"100g de cenouras baby\",\"30g de hommus\"],\"calorias\":120},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"150g de lentilha cozida\",\"80g de arroz integral\",\"80g de couve refogada\",\"80g de file de frango\",\"tempero: cominho e alho\"],\"calorias\":400},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"100g de queijo cottage com tomate picado e oregano\"],\"calorias\":120},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"3 folhas grandes de alface (para wraps) com recheio de 1 lata (120g) de atum em agua\",\"100g de legumes picados (pepino, cenoura)\",\"tempero: azeite e limao\"],\"calorias\":300},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara de cha de erva-cidreira\"],\"calorias\":10}]},{\"nome\":\"Sexta\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"1 unidade de panqueca de banana (ovo, banana, aveia)\",\"1 colher de cha de mel\",\"tempero: canela em po\"],\"calorias\":220},{\"horario\":\"12:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"100g de uvas\",\"20g de amendoas\"],\"calorias\":150},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de bife grelhado (patinho ou mignon)\",\"100g de quinoa cozida\",\"150g de salada variada (alface, tomate, cebola)\",\"1 colher de cha de azeite de oliva extra virgem\",\"tempero: chimichurri e pimenta do reino\"],\"calorias\":400},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 lata (350ml) de CERVEJA\"],\"calorias\":150},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"200g de legumes assados (berinjela, pimentao, cebola)\",\"150g de tofu grelhado\",\"tempero: azeite, alecrim e tomilho\"],\"calorias\":300},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara de cha de gengibre\"],\"calorias\":10}]},{\"nome\":\"Sabado\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"2 unidades de ovos cozidos\",\"1 fatia de pao integral\",\"50g de abacate\",\"tempero: sal e pimenta do reino\"],\"calorias\":300},{\"horario\":\"12:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"1 unidade de tangerina\"],\"calorias\":70},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de peito de frango xadrez light (com 100g de pimentoes e 50g de cebola)\",\"20g de castanha de caju\",\"1 colher de sopa de molho shoyu light\",\"tempero: gengibre e alho\"],\"calorias\":400},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 pote (170g) de iogurte natural desnatado\",\"1 colher de cha de mel\"],\"calorias\":150},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"Pizza fit (base de 100g de couve-flor)\",\"50g de molho de tomate caseiro\",\"50g de queijo light\",\"50g de peito de peru\",\"tempero: oregano\"],\"calorias\":350},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara de cha de hortela\"],\"calorias\":10}]},{\"nome\":\"Domingo\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"Crepioca (1 ovo e 2 colheres de sopa de tapioca)\",\"50g de queijo cottage\",\"2 fatias de blanquet de peru\",\"tempero: salsinha\"],\"calorias\":280},{\"horario\":\"12:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"2 unidades de kiwi\"],\"calorias\":100},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"Feijoada light (150g de feijao preto, 50g de carne seca magra)\",\"80g de couve refogada\",\"1 fatia de laranja\",\"1 colher de cha de azeite de oliva extra virgem\",\"tempero: alho, louro e pimenta do reino\"],\"calorias\":450},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"200g de frutas picadas (melao, melancia)\"],\"calorias\":100},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"Salada Caesar light (150g de alface americana, 120g de peito de frango grelhado)\",\"30g de croutons integrais\",\"30ml de molho caesar light\",\"30g de tomate seco\",\"20g de azeitonas\",\"1 colher de cha de azeite de oliva extra virgem\",\"tempero: limao e mostarda\"],\"calorias\":380},{\"horario\":\"22:00\",\"nome\":\"Ceia\",\"alimentos\":[\"1 copo (150ml) de leite desnatado\"],\"calorias\":60}]}],\"suplementos\":{\"suplementos_antes_treino_esporte\":[],\"suplementos_antes_treino_academia\":[],\"suplementos_gerais\":[\"Multivitaminico (para garantir aporte de nutrientes durante a restricao calorica)\",\"Vitamina D (para saude ossea e imunidade, comum em quem trabalha em ambientes fechados)\",\"Omega 3 (para saude cardiovascular e anti-inflamatorio)\"]},\"grafico\":[{\"dia\":\"Segunda\",\"caloriasTotais\":1210},{\"dia\":\"Terca\",\"caloriasTotais\":1380},{\"dia\":\"Quarta\",\"caloriasTotais\":1490},{\"dia\":\"Quinta\",\"caloriasTotais\":1230},{\"dia\":\"Sexta\",\"caloriasTotais\":1230},{\"dia\":\"Sabado\",\"caloriasTotais\":1280},{\"dia\":\"Domingo\",\"caloriasTotais\":1370}]}', '2025-11-19 00:44:28'),
(11, 1, 44, '4d54a6dd63088f17273ee48110a932f7c5c331b5b952830ddcb2f932c57394a1', '{\"name\":\"vitor\",\"gender\":\"feminino\",\"age\":19,\"height\":1.8,\"weight\":70,\"objective\":\"Perder peso\",\"imc\":\"19.9\",\"alergia\":\"Nenhuma\",\"trabalho\":\"caixa de supermercado\",\"esporte\":\"Nenhum\",\"rotina\":\"acordo as 9\",\"dietaAtual\":\"Nenhuma\",\"tempoPreparo\":\"pouco\",\"alimentosFavoritos\":[\"cerveja\"],\"refeicoes\":[{\"nome\":\"Segunda\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"2 unidades de ovos mexidos\",\"1 fatia de pao integral\",\"1/2 unidade de mamao papaya\",\"tempero: sal e oregano\"],\"calorias\":310},{\"horario\":\"11:30\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"1 unidade de iogurte natural desnatado (170g)\"],\"calorias\":90},{\"horario\":\"14:00\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de file de frango grelhado\",\"3 colheres de sopa (90g) de arroz integral\",\"1 prato de salada de alface e rucula\",\"1 colher de sobremesa de azeite de oliva\",\"tempero: alho, limao e pimenta do reino\"],\"calorias\":400},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 unidade de maca\",\"3 unidades de castanhas-do-para\"],\"calorias\":180},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"1 prato fundo (300ml) de sopa de legumes com lentilha\",\"tempero: cebola, salsa e cebolinha\"],\"calorias\":280},{\"horario\":\"22:30\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de camomila\"],\"calorias\":5}]},{\"nome\":\"Terca\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"1 copo (250ml) de vitamina com 100g de abacate, 150ml de leite desnatado e 1 colher de sopa de aveia\"],\"calorias\":300},{\"horario\":\"11:30\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"1 unidade de banana prata\"],\"calorias\":98},{\"horario\":\"14:00\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de carne moida refogada\",\"2 colheres de sopa de pure de batata doce\",\"1 prato de salada de couve refogada com tomate\",\"tempero: alho, cebola e cominho\"],\"calorias\":420},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 unidade de pera\"],\"calorias\":85},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"Omelete com 2 ovos, espinafre e cogumelos\",\"1 prato de salada de folhas verdes\",\"tempero: sal, pimenta do reino e noz-moscada\"],\"calorias\":350},{\"horario\":\"22:30\",\"nome\":\"Ceia\",\"alimentos\":[\"3 colheres de sopa (60g) de queijo cottage\"],\"calorias\":60}]},{\"nome\":\"Quarta\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"1 prato (200g) de mingau de aveia (3 colheres de sopa) com agua e canela\",\"5 unidades de morangos picados\"],\"calorias\":250},{\"horario\":\"11:30\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"1 unidade de iogurte natural desnatado (170g)\"],\"calorias\":90},{\"horario\":\"14:00\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de file de tilapia assado\",\"100g de brocolis e cenoura cozidos no vapor\",\"1 colher de sobremesa de azeite de oliva\",\"tempero: limao, alecrim e sal\"],\"calorias\":380},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"10 unidades de amendoas\"],\"calorias\":70},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"Salada completa com 100g de frango desfiado, mix de folhas, tomate, pepino e 3 colheres de sopa de grao de bico\",\"tempero: vinagre de maca e manjericao\"],\"calorias\":360},{\"horario\":\"22:30\",\"nome\":\"Ceia\",\"alimentos\":[\"1 lata (350ml) de cerveja\"],\"calorias\":150}]},{\"nome\":\"Quinta\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"Crepioca (1 ovo e 2 colheres de sopa de goma de tapioca)\",\"1 fatia de queijo minas frescal (30g)\"],\"calorias\":280},{\"horario\":\"11:30\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"1 unidade de laranja\"],\"calorias\":62},{\"horario\":\"14:00\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de patinho moido\",\"3 colheres de sopa (90g) de arroz integral\",\"2 colheres de sopa de feijao\",\"1 prato de salada de beterraba e cenoura raladas\",\"tempero: alho, cebola e louro\"],\"calorias\":450},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 unidade de iogurte natural com 1 colher de sopa de chia\"],\"calorias\":150},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"1 prato fundo (300ml) de sopa de abobora com gengibre\",\"tempero: cebola, alho e pimenta branca\"],\"calorias\":250},{\"horario\":\"22:30\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de erva-doce\"],\"calorias\":5}]},{\"nome\":\"Sexta\",\"refeicoes\":[{\"horario\":\"09:30\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"2 fatias de pao integral com 2 colheres de sopa de pasta de amendoim\",\"1 xicara (150ml) de cafe preto sem acucar\"],\"calorias\":340},{\"horario\":\"11:30\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"1 cacho pequeno de uvas (100g)\"],\"calorias\":70},{\"horario\":\"14:00\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de bife grelhado (alcatra)\",\"100g de abobrinha e berinjela grelhadas\",\"1 prato de salada de alface e tomate\",\"tempero: sal, alho e chimichurri\"],\"calorias\":410},{\"horario\":\"17:00\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1 potinho (100g) de iogurte grego light\"],\"calorias\":80},{\"horario\":\"20:00\",\"nome\":\"Jantar\",\"alimentos\":[\"Sanduiche com 2 fatias de pao integral, 100g de frango desfiado, alface, tomate e 1 colher de sopa de requeijao light\",\"tempero: oregano e salsa\"],\"calorias\":350},{\"horario\":\"22:30\",\"nome\":\"Ceia\",\"alimentos\":[\"1 lata (350ml) de cerveja\"],\"calorias\":150}]},{\"nome\":\"Sabado\",\"refeicoes\":[{\"horario\":\"10:00\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"1 pote de iogurte natural (170g) com 2 colheres de sopa de granola sem acucar e 1/2 banana picada\"],\"calorias\":320},{\"horario\":\"12:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"1 fatia media de melao\"],\"calorias\":60},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"100g de macarrao integral com molho de tomate caseiro e 100g de carne moida\",\"1 prato de salada de rucula\",\"tempero: manjericao, alho e cebola\"],\"calorias\":480},{\"horario\":\"17:30\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"1/4 de abacate amassado com limao\"],\"calorias\":150},{\"horario\":\"20:30\",\"nome\":\"Jantar\",\"alimentos\":[\"2 pedacos de pizza de frigideira com massa de aveia, molho de tomate, queijo mussarela light e tomate em rodelas\",\"tempero: oregano\"],\"calorias\":390},{\"horario\":\"22:30\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de hortela\"],\"calorias\":5}]},{\"nome\":\"Domingo\",\"refeicoes\":[{\"horario\":\"10:00\",\"nome\":\"Cafe da Manha\",\"alimentos\":[\"2 ovos cozidos\",\"1 fatia de pao integral\",\"1 copo (200ml) de suco de laranja natural\"],\"calorias\":360},{\"horario\":\"12:00\",\"nome\":\"Lanche da Manha\",\"alimentos\":[\"1 fatia media de abacaxi\"],\"calorias\":50},{\"horario\":\"14:30\",\"nome\":\"Almoco\",\"alimentos\":[\"120g de sobrecoxa de frango assada sem pele\",\"2 batatas pequenas assadas\",\"1 prato de salada de agriao com tomate cereja\",\"1 lata (350ml) de cerveja\",\"tempero: ervas finas e alho\"],\"calorias\":550},{\"horario\":\"17:30\",\"nome\":\"Lanche da Tarde\",\"alimentos\":[\"30g de mix de castanhas e nozes\"],\"calorias\":180},{\"horario\":\"20:30\",\"nome\":\"Jantar\",\"alimentos\":[\"1 prato fundo (300ml) de caldo de feijao\",\"tempero: cheiro-verde e cominho\"],\"calorias\":250},{\"horario\":\"22:30\",\"nome\":\"Ceia\",\"alimentos\":[\"1 xicara (200ml) de cha de erva-cidreira\"],\"calorias\":5}]}],\"suplementos\":{\"suplementos_antes_treino_esporte\":[],\"suplementos_antes_treino_academia\":[],\"suplementos_gerais\":[\"Multivitaminico: 1 capsula ao dia, junto com o almoco, para garantir a ingestao adequada de micronutrientes durante a dieta de restricao calorica.\",\"Omega 3: 1 capsula (1000mg) ao dia, junto com o jantar, para auxiliar na saude cardiovascular e funcao anti-inflamatoria.\",\"Vitamina D: 1 capsula (2000 UI) ao dia, junto com o almoco, caso haja pouca exposicao solar, para saude ossea e imunologica.\"]},\"grafico\":[{\"dia\":\"Segunda\",\"caloriasTotais\":1265},{\"dia\":\"Terca\",\"caloriasTotais\":1313},{\"dia\":\"Quarta\",\"caloriasTotais\":1300},{\"dia\":\"Quinta\",\"caloriasTotais\":1197},{\"dia\":\"Sexta\",\"caloriasTotais\":1400},{\"dia\":\"Sabado\",\"caloriasTotais\":1405},{\"dia\":\"Domingo\",\"caloriasTotais\":1395}]}', '2025-11-19 13:28:58');

-- --------------------------------------------------------

--
-- Estrutura para tabela `consultorios`
--

CREATE TABLE `consultorios` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `horario` varchar(100) DEFAULT NULL,
  `dias` varchar(100) DEFAULT NULL,
  `segunda` varchar(255) DEFAULT NULL,
  `terca` varchar(255) DEFAULT NULL,
  `quarta` varchar(255) DEFAULT NULL,
  `quinta` varchar(255) DEFAULT NULL,
  `sexta` varchar(255) DEFAULT NULL,
  `sabado` varchar(255) DEFAULT NULL,
  `domingo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `consultorios`
--

INSERT INTO `consultorios` (`id`, `nome`, `endereco`, `telefone`, `horario`, `dias`, `segunda`, `terca`, `quarta`, `quinta`, `sexta`, `sabado`, `domingo`) VALUES
(1, 'Consultório Alpha', 'Praça da Sé, Sé, São Paulo - SP', '(11) 99999-1111', NULL, NULL, 'Fechado', '08:00 - 20:00', '08:00 - 20:00', '13:00 - 18:00', 'Fechado', '06:00 - 13:00', 'Fechado'),
(2, 'Consulta Nutricional Beta', 'Rua Doutor Nicolau de Sousa Queirós, Vila Mariana, São Paulo - SP', '(11) 99999-2222', NULL, NULL, 'Fechado', 'Fechado', '09:00 - 18:00', '07:00 - 17:00', 'Fechado', 'Fechado', 'Fechado'),
(3, 'Consultório Gamma', 'Rua Doutor Nicolau de Sousa Queirós, Vila Mariana, São Paulo - SP', '(11) 99999-3333', NULL, NULL, 'Fechado', 'Fechado', '10:00 - 18:00', '10:00 - 18:00', '10:00 - 18:00', '10:00 - 18:00', '10:00 - 18:00'),
(4, 'Consultório Omega', 'Rua Oscar Freire, 379, Jardim Paulista, São Paulo - SP', '(11) 90123-4567', NULL, NULL, '09:00 - 18:00', '09:00 - 18:00', '09:00 - 18:00', '09:00 - 18:00', '09:00 - 17:00', '10:00 - 14:00', 'Fechado'),
(5, 'Clínica NutriSaúde', 'Rua Vergueiro, 1000, Liberdade, São Paulo - SP', '(11) 98888-0001', NULL, NULL, '08:00 - 17:00', '08:00 - 17:00', '08:00 - 17:00', '08:00 - 17:00', '08:00 - 16:00', 'Fechado', 'Fechado'),
(6, 'Centro Equilíbrio Nutricional', 'Avenida Ipiranga, 200, República, São Paulo - SP', '(11) 98888-0002', NULL, NULL, '09:00 - 18:00', '09:00 - 18:00', '09:00 - 18:00', '09:00 - 18:00', '09:00 - 18:00', '10:00 - 14:00', 'Fechado'),
(7, 'Espaço Vida Leve', 'Rua da Consolação, 1350, Consolação, São Paulo - SP', '(11) 98888-0003', NULL, NULL, 'Fechado', '08:00 - 17:00', '08:00 - 17:00', '08:00 - 17:00', '08:00 - 17:00', '08:00 - 12:00', 'Fechado'),
(8, 'Viver Bem Nutrição', 'Rua Augusta, 2500, Jardins, São Paulo - SP', '(11) 98888-0004', NULL, NULL, '09:00 - 17:00', '09:00 - 17:00', '09:00 - 17:00', '09:00 - 17:00', 'Fechado', '09:00 - 13:00', 'Fechado'),
(9, 'NutriClinic Paulista', 'Av. Paulista, 1234, Bela Vista, São Paulo - SP', '(11) 98888-0005', NULL, NULL, '08:30 - 18:30', '08:30 - 18:30', '08:30 - 18:30', '08:30 - 18:30', '08:30 - 16:00', 'Fechado', 'Fechado'),
(10, 'Clínica Bem Estar', 'Rua Haddock Lobo, 890, Cerqueira César, São Paulo - SP', '(11) 98888-0006', NULL, NULL, '07:00 - 15:00', '07:00 - 15:00', '07:00 - 15:00', '07:00 - 15:00', '07:00 - 13:00', 'Fechado', 'Fechado'),
(11, 'Centro de Saúde Nutrir+', 'Rua Pamplona, 1022, Jardim Paulista, São Paulo - SP', '(11) 98888-0007', NULL, NULL, '10:00 - 19:00', '10:00 - 19:00', '10:00 - 19:00', '10:00 - 19:00', '10:00 - 17:00', 'Fechado', 'Fechado'),
(12, 'Nutrição Integrada', 'Rua Frei Caneca, 400, Consolação, São Paulo - SP', '(11) 98888-0008', NULL, NULL, '08:00 - 16:00', '08:00 - 16:00', '08:00 - 16:00', '08:00 - 16:00', '08:00 - 14:00', 'Fechado', 'Fechado'),
(13, 'Alimente Bem Clínica', 'Av. Rebouças, 1200, Pinheiros, São Paulo - SP', '(11) 98888-0009', NULL, NULL, '09:30 - 18:00', '09:30 - 18:00', '09:30 - 18:00', '09:30 - 18:00', '09:30 - 17:00', '09:00 - 13:00', 'Fechado'),
(14, 'Corpo & Nutri', 'Rua Teodoro Sampaio, 1500, Pinheiros, São Paulo - SP', '(11) 98888-0010', NULL, NULL, '08:00 - 19:00', '08:00 - 19:00', '08:00 - 19:00', '08:00 - 19:00', '08:00 - 17:00', 'Fechado', 'Fechado'),
(15, 'Saúde & Sabor', 'Rua Tabapuã, 100, Itaim Bibi, São Paulo - SP', '(11) 98888-0011', NULL, NULL, '07:30 - 16:30', '07:30 - 16:30', '07:30 - 16:30', '07:30 - 16:30', '07:30 - 15:00', 'Fechado', 'Fechado'),
(16, 'Consultório Exemplo', 'Rua Central, 101', '(11) 99999-9999', NULL, NULL, '08:00 - 17:00', '08:00 - 17:00', '08:00 - 17:00', '08:00 - 17:00', '08:00 - 17:00', 'Fechado', 'Fechado');

-- --------------------------------------------------------

--
-- Estrutura para tabela `consultorios_servicos`
--

CREATE TABLE `consultorios_servicos` (
  `id` int(11) NOT NULL,
  `consultorio_id` int(11) DEFAULT NULL,
  `servico_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `consultorios_servicos`
--

INSERT INTO `consultorios_servicos` (`id`, `consultorio_id`, `servico_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 2, 7),
(8, 2, 8),
(9, 2, 9),
(10, 2, 10),
(11, 2, 11),
(12, 2, 12),
(13, 3, 13),
(14, 3, 14),
(15, 3, 15),
(16, 3, 16),
(17, 3, 17),
(18, 3, 18),
(19, 16, 19),
(20, 16, 20);

-- --------------------------------------------------------

--
-- Estrutura para tabela `contatos`
--

CREATE TABLE `contatos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mensagem` text DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `telefone` varchar(20) DEFAULT NULL,
  `remetente` varchar(100) DEFAULT NULL,
  `respondido` tinyint(1) DEFAULT 0,
  `resposta` text DEFAULT NULL,
  `arquivado` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `contatos`
--

INSERT INTO `contatos` (`id`, `nome`, `email`, `mensagem`, `criado_em`, `telefone`, `remetente`, `respondido`, `resposta`, `arquivado`) VALUES
(1, 'João Atualizado', 'joao_novo@example.com', 'Mensagem editada', '2025-06-26 05:01:06', '11997777777', '1', 1, 'Olá João, entraremos em contato com mais informações.', 0),
(3, 'João', 'joao@example.com', 'Gostaria de mais informações sobre a dieta.', '2025-07-02 17:18:17', '11999999999', 'dev', 0, NULL, 0),
(4, 'Maria', 'maria@example.com', 'Gostaria de agendar uma consulta.', '2025-07-02 17:19:04', '11988888888', '1', 0, NULL, 0),
(5, 'hrdfgfdf', 'nutri7@gmail.com', 'fdhgbfdxhgbfd fsdvdfx grsdfbrsdf', '2025-10-26 19:42:41', '(77) 77777-7777', '1', 0, NULL, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `exames`
--

CREATE TABLE `exames` (
  `id` int(11) NOT NULL,
  `nome_exame` varchar(255) NOT NULL,
  `descricao` text DEFAULT NULL,
  `preco` decimal(10,2) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `nutricionistas`
--

CREATE TABLE `nutricionistas` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `crn` varchar(20) NOT NULL,
  `especialidade` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `consultorio_id` int(11) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `nutricionistas`
--

INSERT INTO `nutricionistas` (`id`, `nome`, `crn`, `especialidade`, `email`, `telefone`, `consultorio_id`, `criado_em`, `atualizado_em`, `senha`) VALUES
(1, 'Juliana Costa', '123456', 'nutrição esportiva', 'admin@gmail.com', '(11) 99123-4567', NULL, '2025-06-26 04:54:59', '2025-06-26 04:54:59', '12345678'),
(2, 'Rafael Mendes', '654321', 'Nutrição funcional', 'rafael.mendes@gmail.com', '(11) 99876-5432', NULL, '2025-06-26 04:56:41', '2025-06-26 04:56:41', '123456789'),
(3, 'Galvão', '556575', 'nutrição teste', 'aaaa@gmail.com', '(11) 11111-1111', NULL, '2025-11-05 02:42:43', '2025-11-05 02:42:43', '12345678');

-- --------------------------------------------------------

--
-- Estrutura para tabela `nutricionistas_consultorios`
--

CREATE TABLE `nutricionistas_consultorios` (
  `id` int(11) NOT NULL,
  `nutricionista_id` int(11) NOT NULL,
  `consultorio_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `nutricionistas_consultorios`
--

INSERT INTO `nutricionistas_consultorios` (`id`, `nutricionista_id`, `consultorio_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `nutricionistas_servicos`
--

CREATE TABLE `nutricionistas_servicos` (
  `id` int(11) NOT NULL,
  `nutricionista_id` int(11) NOT NULL,
  `servico_id` int(11) NOT NULL,
  `preco` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `nutricionistas_servicos`
--

INSERT INTO `nutricionistas_servicos` (`id`, `nutricionista_id`, `servico_id`, `preco`) VALUES
(1, 1, 1, 80.00),
(2, 1, 2, 80.00),
(3, 1, 5, 0.00),
(4, 1, 6, 0.00),
(5, 2, 7, 90.00),
(6, 2, 8, 90.00),
(7, 2, 9, 90.00),
(8, 3, 1, 0.00),
(9, 3, 2, 0.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `respostas_formulario`
--

CREATE TABLE `respostas_formulario` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `imc` decimal(5,2) DEFAULT NULL,
  `height` decimal(5,2) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `objective` varchar(50) DEFAULT NULL,
  `level` varchar(20) DEFAULT NULL,
  `alergia` varchar(200) DEFAULT NULL,
  `trabalho` varchar(100) DEFAULT NULL,
  `alimentosFavoritos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`alimentosFavoritos`)),
  `esporte` varchar(100) DEFAULT NULL,
  `dietaAtual` varchar(100) DEFAULT NULL,
  `rotina` text DEFAULT NULL,
  `tempoPreparo` varchar(20) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `respostas_formulario`
--

INSERT INTO `respostas_formulario` (`id`, `usuario_id`, `name`, `age`, `imc`, `height`, `weight`, `gender`, `objective`, `level`, `alergia`, `trabalho`, `alimentosFavoritos`, `esporte`, `dietaAtual`, `rotina`, `tempoPreparo`, `criado_em`) VALUES
(1, 1, 'bhghjb', 19, 22.20, 1.60, 79.00, 'masculino', 'Ganhar peso', 'leve', 'lactose', 'professora', '[\"carne\"]', 'Nenhum', 'low carb', 'acordo as 9', 'medio', '2025-11-18 18:16:12'),
(2, 5, 'bhghjb', 19, 22.20, 1.60, 75.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"cerveja\"]', 'Nenhum', 'Nenhuma', 'acordo as 9 treino as 10', 'pouco', '2025-11-18 18:59:41'),
(3, 5, 'bhghjb', 19, 22.20, 1.60, 100.00, 'masculino', 'Perder peso', 'intenso', 'Nenhuma', 'professora', '[\"cerveja\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'medio', '2025-11-18 21:56:30'),
(4, 5, 'bhghjb', 19, 22.20, 1.60, 91.00, 'masculino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"cerveja\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-18 21:59:54'),
(5, 5, 'bhghjb', 19, 22.20, 1.60, 80.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"cerveja\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-18 22:01:13'),
(6, 5, 'bhghjb', 19, 22.20, 1.60, 80.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"cerveja\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-18 22:03:24'),
(7, 5, 'bhghjb', 19, 22.20, 1.60, 80.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"cerveja\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-18 22:05:23'),
(8, 5, 'bhghjb', 19, 22.20, 1.60, 80.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"cerveja\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-18 22:10:22'),
(9, 5, 'bhghjb', 19, 22.20, 1.60, 79.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"cerveja\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-18 22:15:16'),
(10, 5, 'bhghjb', 19, 22.20, 1.60, 79.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"cerveja\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-18 22:43:57'),
(11, 5, 'bhghjb', 19, 22.20, 1.60, 79.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"cerveja\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-18 22:47:31'),
(12, 5, 'bhghjb', 19, 22.20, 1.60, 79.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"cerveja\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-18 22:55:34'),
(13, 5, 'elo', 19, 22.20, 1.60, 99.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'acordo as 9 academia as 10', 'pouco', '2025-11-18 22:57:47'),
(14, 5, 'elo', 19, 22.20, 1.60, 99.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'acordo as 9 academia as 10', 'pouco', '2025-11-18 22:59:32'),
(15, 5, 'elo', 19, 22.20, 1.60, 99.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'acordo as 9 academia as 10', 'pouco', '2025-11-18 23:16:16'),
(16, 5, 'elo', 19, 22.20, 1.60, 99.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'acordo as 9 academia as 10', 'pouco', '2025-11-18 23:17:50'),
(17, 5, 'elo', 19, 22.20, 1.60, 99.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'acordo as 9 academia as 10', 'pouco', '2025-11-18 23:23:31'),
(18, 5, 'elo', 19, 22.20, 1.60, 99.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'acordo as 9 academia as 10', 'pouco', '2025-11-18 23:26:43'),
(19, 5, 'elo', 19, 22.20, 1.60, 70.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-18 23:27:05'),
(20, 5, 'elo', 19, 22.20, 1.60, 70.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-18 23:29:56'),
(21, 5, 'elo', 19, 22.20, 1.60, 70.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-18 23:31:18'),
(22, 5, 'elo', 19, 22.20, 1.60, 100.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-18 23:33:16'),
(23, 5, 'elo', 19, 22.20, 1.60, 100.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-18 23:34:26'),
(24, 5, 'elo', 19, 22.20, 1.60, 70.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'acorod 8', 'pouco', '2025-11-18 23:34:55'),
(26, 5, 'elo', 19, 22.20, 1.60, 70.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'Acordo as 9', 'pouco', '2025-11-18 23:41:11'),
(27, 5, 'elo', 19, 22.20, 1.60, 90.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-19 00:12:09'),
(28, 5, 'elo', 19, 22.20, 1.60, 74.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'ACORDO AS 9', 'pouco', '2025-11-19 00:16:31'),
(29, 5, 'elo', 19, 22.20, 1.60, 74.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'ACORDO AS 9', 'pouco', '2025-11-19 00:18:15'),
(30, 5, 'ved', 19, 22.20, 1.60, 70.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'ACORDO AS 7', 'pouco', '2025-11-19 00:24:36'),
(31, 5, 'ved', 19, 22.20, 1.60, 70.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'ACORDO AS 7', 'pouco', '2025-11-19 00:25:38'),
(32, 5, 'EU', 33, 22.20, 1.60, 70.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'ACORDO AS 10', 'pouco', '2025-11-19 00:28:42'),
(33, 5, 'EU', 33, 22.20, 1.60, 70.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"refrigerante\"]', 'Nenhum', 'Nenhuma', 'ACORDO AS 11', 'pouco', '2025-11-19 00:32:08'),
(34, 5, 'EU', 25, 25.80, 1.77, 90.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'personal trainer', '[\"PIZZA\"]', 'BOXE', 'low carb', 'Acordo às 5h30, faço cardio em jejum, treino musculação às 15h, trabalho como personal trainer das 7h às 12h e das 16h às 20h. Durmo às 22h.', 'pouco', '2025-11-19 00:37:06'),
(35, 5, 'EU', 33, 22.20, 1.60, 70.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'professora', '[\"CERVEJA\"]', 'Nenhum', 'Nenhuma', 'ACORDO AS 9', 'pouco', '2025-11-19 00:43:41'),
(36, 1, 'vitor', 19, 19.90, 1.80, 90.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'caixa de supermercado', '[\"Doce\"]', 'Nenhum', 'Nenhuma', 'acordo a s9', 'pouco', '2025-11-19 13:03:11'),
(37, 1, 'vitor', 19, 19.90, 1.80, 90.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'caixa de supermercado', '[\"carne\"]', 'Nenhum', 'Nenhuma', 'acordo a s9', 'pouco', '2025-11-19 13:04:04'),
(38, 1, 'vitor', 19, 19.90, 1.80, 88.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'caixa de supermercado', '[\"cerveja\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-19 13:10:24'),
(39, 1, 'vitor', 19, 19.90, 1.80, 88.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'caixa de supermercado', '[\"cerveja\"]', 'Nenhum', 'Nenhuma', 'acordo as 8', 'pouco', '2025-11-19 13:15:21'),
(40, 1, 'vitor', 19, 19.90, 1.80, 70.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'caixa de supermercado', '[\"cerveja\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-19 13:18:42'),
(41, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-11-19 13:21:56'),
(42, 1, 'vitor', 19, 19.90, 1.80, 70.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'caixa de supermercado', '[\"cerveja\"]', 'Nenhum', 'Nenhuma', 'aci', 'pouco', '2025-11-19 13:22:28'),
(43, 1, 'vitor', 19, 19.90, 1.80, 70.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'caixa de supermercado', '[\"cerveja\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-19 13:27:18'),
(44, 1, 'vitor', 19, 19.90, 1.80, 70.00, 'feminino', 'Perder peso', 'sedentario', 'Nenhuma', 'caixa de supermercado', '[\"cerveja\"]', 'Nenhum', 'Nenhuma', 'acordo as 9', 'pouco', '2025-11-19 13:27:52');

-- --------------------------------------------------------

--
-- Estrutura para tabela `servicos`
--

CREATE TABLE `servicos` (
  `id` int(11) NOT NULL,
  `nome_servico` varchar(255) NOT NULL,
  `descricao` text DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `preco` decimal(10,2) DEFAULT NULL,
  `disponivel` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `servicos`
--

INSERT INTO `servicos` (`id`, `nome_servico`, `descricao`, `criado_em`, `preco`, `disponivel`) VALUES
(1, 'Consulta Nutricional Alpha', 'Avaliação nutricional completa Alpha', '2025-06-26 04:45:24', 150.00, 1),
(2, 'Avaliação Física Alpha', 'Análise corporal e exames físicos Alpha', '2025-06-26 04:45:24', 120.00, 1),
(3, 'Plano Alimentar Alpha', 'Plano alimentar detalhado Alpha', '2025-06-26 04:45:24', 200.00, 1),
(4, 'Acompanhamento Alpha', 'Revisão e ajuste do plano alimentar Alpha', '2025-06-26 04:45:24', 100.00, 1),
(5, 'Orientação Física Alpha', 'Suporte em exercícios físicos Alpha', '2025-06-26 04:45:24', 80.00, 1),
(6, 'Reeducação Alimentar Alpha', 'Educação nutricional para mudança de hábitos Alpha', '2025-06-26 04:45:24', 130.00, 1),
(7, 'Consulta Nutricional Beta', 'Avaliação nutricional completa Beta', '2025-06-26 04:49:39', 160.00, 1),
(8, 'Avaliação Física Beta', 'Análise corporal e exames físicos Beta', '2025-06-26 04:49:39', 125.00, 1),
(9, 'Plano Alimentar Beta', 'Plano alimentar detalhado Beta', '2025-06-26 04:49:39', 210.00, 1),
(10, 'Acompanhamento Beta', 'Revisão e ajuste do plano alimentar Beta', '2025-06-26 04:49:39', 110.00, 1),
(11, 'Orientação Física Beta', 'Suporte em exercícios físicos Beta', '2025-06-26 04:49:39', 85.00, 1),
(12, 'Reeducação Alimentar Beta', 'Educação nutricional para mudança de hábitos Beta', '2025-06-26 04:49:39', 135.00, 1),
(13, 'Consulta Nutricional Gamma', 'Avaliação nutricional completa Gamma', '2025-06-26 04:52:32', 155.00, 1),
(14, 'Avaliação Física Gamma', 'Análise corporal e exames físicos Gamma', '2025-06-26 04:52:32', 130.00, 1),
(15, 'Plano Alimentar Gamma', 'Plano alimentar detalhado Gamma', '2025-06-26 04:52:32', 220.00, 1),
(16, 'Acompanhamento Gamma', 'Revisão e ajuste do plano alimentar Gamma', '2025-06-26 04:52:32', 105.00, 1),
(17, 'Orientação Física Gamma', 'Suporte em exercícios físicos Gamma', '2025-06-26 04:52:32', 90.00, 1),
(18, 'Reeducação Alimentar Gamma', 'Educação nutricional para mudança de hábitos Gamma', '2025-06-26 04:52:32', 140.00, 1),
(19, 'Consulta Nutricional', 'Avaliação com nutricionista', '2025-07-02 17:14:59', 120.00, 1),
(20, 'Retorno', 'Consulta de acompanhamento', '2025-07-02 17:14:59', 80.00, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome_usuario` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `googleId` varchar(255) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expira` datetime DEFAULT NULL,
  `tipo` enum('nutricionista','admin','cliente') DEFAULT 'nutricionista',
  `crn` varchar(50) DEFAULT NULL,
  `especialidade` varchar(255) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome_usuario`, `senha`, `email`, `criado_em`, `googleId`, `reset_token`, `reset_token_expira`, `tipo`, `crn`, `especialidade`, `telefone`) VALUES
(1, 'lucas', '12345678', 'lucas@gmail.com', '2025-06-26 04:36:56', NULL, '5B4233', '2025-11-01 00:13:13', 'nutricionista', NULL, NULL, NULL),
(2, 'lucas', '$2b$10$8aCb3FFjotQVvGJBL6eKcumspND1bEkkRSNDzjn709k111Xdd6dUe', 'lucasgcrecencio@gmail.com', '2025-11-01 02:13:42', NULL, NULL, NULL, 'nutricionista', NULL, NULL, NULL),
(3, 'lucaaaas', '12345678', 'aa@gmail.com', '2025-11-02 02:44:05', NULL, NULL, NULL, 'nutricionista', NULL, NULL, NULL),
(4, 'José Carlos', '$2b$10$.wrFjGPYreny99ykgo67nObJqOS6jjEQkxkv34lXCAQWk/U4ZXS/a', 'jose@gmail.com', '2025-11-07 00:08:23', NULL, NULL, NULL, 'nutricionista', NULL, NULL, NULL),
(5, 'lucas', '$2b$10$qGu000rknFZuCJSuKK58uOcIu3brno9vRRGo0opvB1XuCXAMLFRL.', 'aa2@gmail.com', '2025-11-18 18:41:49', NULL, NULL, NULL, 'nutricionista', NULL, NULL, NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `agendamentos`
--
ALTER TABLE `agendamentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `consultorio_id` (`consultorio_id`),
  ADD KEY `servico_id` (`servico_id`);

--
-- Índices de tabela `cardapio`
--
ALTER TABLE `cardapio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cardapio_resposta` (`respostas_id`);

--
-- Índices de tabela `consultorios`
--
ALTER TABLE `consultorios`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `consultorios_servicos`
--
ALTER TABLE `consultorios_servicos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `consultorio_id` (`consultorio_id`),
  ADD KEY `servico_id` (`servico_id`);

--
-- Índices de tabela `contatos`
--
ALTER TABLE `contatos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `exames`
--
ALTER TABLE `exames`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `nutricionistas`
--
ALTER TABLE `nutricionistas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `crn` (`crn`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `consultorio_id` (`consultorio_id`);

--
-- Índices de tabela `nutricionistas_consultorios`
--
ALTER TABLE `nutricionistas_consultorios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nutricionista_id` (`nutricionista_id`),
  ADD KEY `consultorio_id` (`consultorio_id`);

--
-- Índices de tabela `nutricionistas_servicos`
--
ALTER TABLE `nutricionistas_servicos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nutricionista_id` (`nutricionista_id`),
  ADD KEY `servico_id` (`servico_id`);

--
-- Índices de tabela `respostas_formulario`
--
ALTER TABLE `respostas_formulario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_respostas_usuario` (`usuario_id`);

--
-- Índices de tabela `servicos`
--
ALTER TABLE `servicos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `googleId` (`googleId`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agendamentos`
--
ALTER TABLE `agendamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `cardapio`
--
ALTER TABLE `cardapio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `consultorios`
--
ALTER TABLE `consultorios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `consultorios_servicos`
--
ALTER TABLE `consultorios_servicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `contatos`
--
ALTER TABLE `contatos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `exames`
--
ALTER TABLE `exames`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `nutricionistas`
--
ALTER TABLE `nutricionistas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `nutricionistas_consultorios`
--
ALTER TABLE `nutricionistas_consultorios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `nutricionistas_servicos`
--
ALTER TABLE `nutricionistas_servicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `respostas_formulario`
--
ALTER TABLE `respostas_formulario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de tabela `servicos`
--
ALTER TABLE `servicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `agendamentos`
--
ALTER TABLE `agendamentos`
  ADD CONSTRAINT `agendamentos_ibfk_1` FOREIGN KEY (`consultorio_id`) REFERENCES `consultorios` (`id`),
  ADD CONSTRAINT `agendamentos_ibfk_2` FOREIGN KEY (`servico_id`) REFERENCES `servicos` (`id`);

--
-- Restrições para tabelas `cardapio`
--
ALTER TABLE `cardapio`
  ADD CONSTRAINT `fk_cardapio_resposta` FOREIGN KEY (`respostas_id`) REFERENCES `respostas_formulario` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_cardapio_respostas` FOREIGN KEY (`respostas_id`) REFERENCES `respostas_formulario` (`id`);

--
-- Restrições para tabelas `consultorios_servicos`
--
ALTER TABLE `consultorios_servicos`
  ADD CONSTRAINT `consultorios_servicos_ibfk_1` FOREIGN KEY (`consultorio_id`) REFERENCES `consultorios` (`id`),
  ADD CONSTRAINT `consultorios_servicos_ibfk_2` FOREIGN KEY (`servico_id`) REFERENCES `servicos` (`id`);

--
-- Restrições para tabelas `nutricionistas`
--
ALTER TABLE `nutricionistas`
  ADD CONSTRAINT `nutricionistas_ibfk_1` FOREIGN KEY (`consultorio_id`) REFERENCES `consultorios` (`id`);

--
-- Restrições para tabelas `nutricionistas_consultorios`
--
ALTER TABLE `nutricionistas_consultorios`
  ADD CONSTRAINT `nutricionistas_consultorios_ibfk_1` FOREIGN KEY (`nutricionista_id`) REFERENCES `nutricionistas` (`id`),
  ADD CONSTRAINT `nutricionistas_consultorios_ibfk_2` FOREIGN KEY (`consultorio_id`) REFERENCES `consultorios` (`id`);

--
-- Restrições para tabelas `nutricionistas_servicos`
--
ALTER TABLE `nutricionistas_servicos`
  ADD CONSTRAINT `nutricionistas_servicos_ibfk_1` FOREIGN KEY (`nutricionista_id`) REFERENCES `nutricionistas` (`id`),
  ADD CONSTRAINT `nutricionistas_servicos_ibfk_2` FOREIGN KEY (`servico_id`) REFERENCES `servicos` (`id`);

--
-- Restrições para tabelas `respostas_formulario`
--
ALTER TABLE `respostas_formulario`
  ADD CONSTRAINT `fk_respostas_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
